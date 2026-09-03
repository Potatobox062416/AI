import fs from "node:fs/promises";
import path from "node:path";

const siteRoot = path.resolve(import.meta.dirname, "..");
const attractionCredits = JSON.parse(await fs.readFile(path.join(siteRoot, "assets", "attractions", "image-credits.json"), "utf8"));
const restaurantCredits = JSON.parse(await fs.readFile(path.join(siteRoot, "assets", "restaurants", "restaurant-image-credits.json"), "utf8"));
const restaurantReplacements = JSON.parse(await fs.readFile(path.join(siteRoot, "assets", "restaurants", "restaurant-image-replacements.json"), "utf8"));

const attractionImages = {};
for (const entry of attractionCredits) {
  const fileName = entry.title.replace(/^File:/, "");
  const image = `https://commons.wikimedia.org/wiki/Special:Redirect/file/${encodeURIComponent(fileName)}?width=1200`;
  (attractionImages[entry.attraction] ||= []).push(image);
}

const restaurantSources = new Map(restaurantCredits.map((entry) => [entry.file, entry]));
restaurantReplacements.forEach((entry) => restaurantSources.set(entry.file, { ...(restaurantSources.get(entry.file) || {}), ...entry }));
const restaurantImages = {};
for (const entry of restaurantSources.values()) {
  if (!entry.restaurant || !entry.image) continue;
  (restaurantImages[entry.restaurant] ||= []).push({ file: entry.file, image: entry.image.replace(/^http:/, "https:") });
}
for (const [id, entries] of Object.entries(restaurantImages)) {
  restaurantImages[id] = entries
    .sort((left, right) => left.file.localeCompare(right.file))
    .map((entry) => entry.image);
}

const missingAttractions = Object.entries(attractionImages).filter(([, images]) => images.length !== 4);
const missingRestaurants = Object.entries(restaurantImages).filter(([, images]) => images.length !== 2);
if (Object.keys(attractionImages).length !== 17 || missingAttractions.length) {
  throw new Error(`Attraction image map incomplete: ${JSON.stringify(missingAttractions)}`);
}
if (Object.keys(restaurantImages).length !== 39 || missingRestaurants.length) {
  throw new Error(`Restaurant image map incomplete: ${JSON.stringify(missingRestaurants)}`);
}

const output = `(function () {\n  const attractionImages = ${JSON.stringify(attractionImages, null, 2)};\n  window.ATTRACTIONS?.forEach((item) => {\n    if (attractionImages[item.id]) item.images = attractionImages[item.id];\n  });\n  window.RESTAURANT_IMAGE_URLS = ${JSON.stringify(restaurantImages, null, 2)};\n})();\n`;
await fs.writeFile(path.join(siteRoot, "deploy-images.js"), output, "utf8");
process.stdout.write("deploy-images.js: 17 attractions and 39 restaurants.\n");
