import fs from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";

const siteRoot = path.resolve(import.meta.dirname, "..");
const readJson = async (...segments) => JSON.parse((await fs.readFile(path.join(siteRoot, ...segments), "utf8")).replace(/^\uFEFF/, ""));
const attractionCredits = await readJson("assets", "attractions", "image-credits.json");
const attractionReplacements = await readJson("assets", "attractions", "replacement-image-credits.json");
const restaurantCredits = await readJson("assets", "restaurants", "restaurant-image-credits.json");
const restaurantReplacements = await readJson("assets", "restaurants", "restaurant-image-replacements.json");
const attractionContext = vm.createContext({ window: {} });
vm.runInContext(await fs.readFile(path.join(siteRoot, "data.js"), "utf8"), attractionContext, { filename: "data.js" });
const attractionIds = new Set(attractionContext.window.ATTRACTIONS.map((item) => item.id));
const foodContext = vm.createContext({ window: {} });
for (const file of ["food-data.js", "food-data-daxiang.js", "food-data-daba.js"]) {
  vm.runInContext(await fs.readFile(path.join(siteRoot, file), "utf8"), foodContext, { filename: file });
}
const approvedCreators = new Set(["大祥哥来了", "大霸子来了", "特厨隋卞"]);
const approvedRestaurantIds = new Set(foodContext.window.RESTAURANTS.filter((item) => approvedCreators.has(item.video?.creator)).map((item) => item.id));
const attractionImageOverrides = {
  "File:20200110 National Museum of China-1.jpg": "https://upload.wikimedia.org/wikipedia/commons/5/59/20200110_National_Museum_of_China-1.jpg",
  "File:20090530 Beijing Summer Palace 8467.jpg": "https://upload.wikimedia.org/wikipedia/commons/f/fb/20090530_Beijing_Summer_Palace_8467.jpg"
};

const attractionSources = new Map(attractionCredits.map((entry) => [entry.file, entry]));
attractionReplacements.forEach((entry) => attractionSources.set(entry.file, { ...(attractionSources.get(entry.file) || {}), ...entry }));
const attractionImages = {};
for (const entry of attractionSources.values()) {
  if (!entry.attraction || !attractionIds.has(entry.attraction)) continue;
  const fileName = entry.title?.replace(/^File:/, "");
  const commonsRedirect = fileName
    ? `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(fileName)}?width=1200`
    : null;
  const image = attractionImageOverrides[entry.title]
    || entry.image
    || commonsRedirect;
  if (!image) continue;
  (attractionImages[entry.attraction] ||= []).push({ file: entry.file, image: image.replace(/^http:/, "https:") });
}
for (const [id, entries] of Object.entries(attractionImages)) {
  attractionImages[id] = entries
    .sort((left, right) => left.file.localeCompare(right.file))
    .map((entry) => entry.image);
}

const restaurantSources = new Map(restaurantCredits.map((entry) => [entry.file, entry]));
restaurantReplacements.forEach((entry) => restaurantSources.set(entry.file, { ...(restaurantSources.get(entry.file) || {}), ...entry }));
const restaurantImages = {};
for (const entry of restaurantSources.values()) {
  if (!entry.restaurant || !entry.image || !approvedRestaurantIds.has(entry.restaurant)) continue;
  (restaurantImages[entry.restaurant] ||= []).push({ file: entry.file, image: entry.image.replace(/^http:/, "https:") });
}
for (const [id, entries] of Object.entries(restaurantImages)) {
  restaurantImages[id] = entries
    .sort((left, right) => left.file.localeCompare(right.file))
    .map((entry) => entry.image);
}

const missingAttractions = [...attractionIds].filter((id) => attractionImages[id]?.length !== 4);
const missingRestaurants = Object.entries(restaurantImages).filter(([, images]) => images.length !== 2);
if (Object.keys(attractionImages).length !== attractionIds.size || missingAttractions.length) {
  throw new Error(`Attraction image map incomplete: ${JSON.stringify(missingAttractions)}`);
}
if (Object.keys(restaurantImages).length !== approvedRestaurantIds.size || missingRestaurants.length) {
  throw new Error(`Restaurant image map incomplete: ${JSON.stringify(missingRestaurants)}`);
}

const output = `(function () {\n  const attractionImages = ${JSON.stringify(attractionImages, null, 2)};\n  window.ATTRACTIONS?.forEach((item) => {\n    if (attractionImages[item.id]) item.images = attractionImages[item.id];\n  });\n  window.RESTAURANT_IMAGE_URLS = ${JSON.stringify(restaurantImages, null, 2)};\n})();\n`;
await fs.writeFile(path.join(siteRoot, "deploy-images.js"), output, "utf8");
process.stdout.write(`deploy-images.js: ${attractionIds.size} attractions and ${approvedRestaurantIds.size} restaurants.\n`);

