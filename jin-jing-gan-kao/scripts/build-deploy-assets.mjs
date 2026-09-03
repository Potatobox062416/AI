import fs from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";

const siteRoot = path.resolve(import.meta.dirname, "..");
const attractionRoot = path.join(siteRoot, "assets", "attractions");
const restaurantRoot = path.join(siteRoot, "assets", "restaurants");
const headers = {
  "user-agent": "JinJingTravelPlanner/1.0 (GitHub Pages asset build)",
  accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8"
};
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const attractionQueries = [
  ["palace-museum", "Forbidden City Beijing architecture"],
  ["tiananmen", "Tiananmen Square Beijing"],
  ["national-museum", "National Museum of China Beijing"],
  ["jingshan", "Jingshan Park Beijing"],
  ["temple-heaven", "Temple of Heaven Beijing"],
  ["summer-palace", "Summer Palace Beijing"],
  ["yuanmingyuan", "Old Summer Palace Beijing ruins"],
  ["beihai", "Beihai Park Beijing"],
  ["prince-gong", "Prince Gong Mansion Beijing"],
  ["lama-temple", "Yonghe Temple Beijing"],
  ["shichahai", "Shichahai Beijing hutong"],
  ["badaling", "Badaling Great Wall Beijing"],
  ["mutianyu", "Mutianyu Great Wall Beijing"],
  ["beijing-zoo", "Beijing Zoo giant panda"],
  ["art-798", "798 Art Zone Beijing"],
  ["olympic-park", "Beijing Olympic Park Bird Nest"],
  ["universal", "Universal Beijing Resort theme park"]
];

async function fetchWithRetry(url, options = {}, attempts = 5) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, { redirect: "follow", ...options });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response;
    } catch (error) {
      lastError = error;
      if (attempt < attempts) await sleep(attempt * 1200);
    }
  }
  throw lastError;
}

async function downloadImage(url, target, referer = "") {
  const response = await fetchWithRetry(url.replace(/^http:/, "https:"), {
    headers: { ...headers, ...(referer ? { referer } : {}) }
  });
  const bytes = new Uint8Array(await response.arrayBuffer());
  if (bytes.length < 5000) throw new Error(`Image too small: ${bytes.length} bytes`);
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.writeFile(target, bytes);
  return bytes.length;
}

async function buildAttractions() {
  const credits = [];
  for (const [slug, query] of attractionQueries) {
    const params = new URLSearchParams({
      action: "query",
      generator: "search",
      gsrsearch: `${query} filetype:bitmap`,
      gsrnamespace: "6",
      gsrlimit: "24",
      prop: "imageinfo",
      iiprop: "url|mime|extmetadata",
      iiurlwidth: "1200",
      format: "json",
      origin: "*"
    });
    const response = await fetchWithRetry(`https://commons.wikimedia.org/w/api.php?${params}`, { headers });
    const payload = await response.json();
    const candidates = Object.values(payload.query?.pages || {})
      .filter((entry) => entry.imageinfo?.[0]?.thumburl && entry.imageinfo[0].mime === "image/jpeg")
      .slice(0, 4);
    if (candidates.length < 4) throw new Error(`${slug}: Wikimedia Commons returned only ${candidates.length} JPEG images`);

    for (const [index, entry] of candidates.entries()) {
      const info = entry.imageinfo[0];
      const file = `assets/attractions/${slug}/${slug}-${index + 1}.jpg`;
      await downloadImage(info.thumburl, path.join(siteRoot, file), info.descriptionurl);
      credits.push({
        attraction: slug,
        file,
        title: entry.title,
        page: info.descriptionurl,
        image: info.thumburl,
        license: info.extmetadata?.LicenseShortName?.value || "See source",
        artist: String(info.extmetadata?.Artist?.value || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()
      });
      await sleep(120);
    }
    process.stdout.write(`Attractions: ${slug}\n`);
  }
  await fs.writeFile(path.join(attractionRoot, "deployment-image-credits.json"), JSON.stringify(credits, null, 2), "utf8");
}

function decodeEntities(value) {
  return value.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'");
}

async function pageImage(pageUrl) {
  const response = await fetchWithRetry(pageUrl, { headers: { ...headers, accept: "text/html,*/*;q=0.8" } });
  const html = await response.text();
  const matches = [
    html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)/i),
    html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i),
    html.match(/<meta[^>]+name=["']twitter:image(?::src)?["'][^>]+content=["']([^"']+)/i)
  ];
  return decodeEntities(matches.find(Boolean)?.[1] || "");
}

async function bilibiliCover(pageUrl) {
  const bvid = pageUrl.match(/BV[0-9A-Za-z]+/)?.[0];
  if (!bvid) return "";
  const response = await fetchWithRetry(`https://api.bilibili.com/x/web-interface/view?bvid=${bvid}`, {
    headers: { ...headers, referer: "https://www.bilibili.com/" }
  });
  const payload = await response.json();
  return payload.code === 0 ? String(payload.data?.pic || "").replace(/^http:/, "https:") : "";
}

async function bilibiliSearchCovers(name) {
  const keyword = name.replace(/[（(].*?[）)]/g, "").replace(/·/g, " ");
  const params = new URLSearchParams({ search_type: "video", page_size: "12", keyword: `${keyword} 北京 探店` });
  const response = await fetchWithRetry(`https://api.bilibili.com/x/web-interface/search/type?${params}`, {
    headers: { ...headers, referer: "https://www.bilibili.com/" }
  });
  const payload = await response.json();
  return (payload.data?.result || []).map((entry) => ({
    image: String(entry.pic || "").replace(/^\/\//, "https:").replace(/^http:/, "https:"),
    page: entry.bvid ? `https://www.bilibili.com/video/${entry.bvid}/` : ""
  })).filter((entry) => entry.image);
}

async function loadRestaurants() {
  const context = vm.createContext({ window: {} });
  for (const file of ["food-data.js", "food-data-daxiang.js", "food-data-daba.js"]) {
    vm.runInContext(await fs.readFile(path.join(siteRoot, file), "utf8"), context, { filename: file });
  }
  return context.window.RESTAURANTS;
}

async function buildRestaurants() {
  const [baseCredits, replacements, restaurants] = await Promise.all([
    fs.readFile(path.join(restaurantRoot, "restaurant-image-credits.json"), "utf8").then(JSON.parse),
    fs.readFile(path.join(restaurantRoot, "restaurant-image-replacements.json"), "utf8").then(JSON.parse),
    loadRestaurants()
  ]);
  const replacementFiles = new Set(replacements.map((entry) => entry.file));
  const sources = new Map(baseCredits.map((entry) => [entry.file, entry]));
  replacements.forEach((entry) => sources.set(entry.file, { ...(sources.get(entry.file) || {}), ...entry }));
  const outputCredits = [];

  for (const restaurant of restaurants) {
    const used = new Set();
    let searchFallbacks = null;
    for (const index of [1, 2]) {
      const file = `assets/restaurants/${restaurant.id}/${restaurant.id}-${index}.jpg`;
      const source = sources.get(file) || {};
      const candidates = [];
      if (source.image) candidates.push({ image: source.image, page: source.page || restaurant.video?.url || "" });
      if (replacementFiles.has(file) && source.page?.includes("bilibili.com")) {
        const cover = await bilibiliCover(source.page).catch(() => "");
        if (cover) candidates.unshift({ image: cover, page: source.page });
      } else if (replacementFiles.has(file) && source.page && !source.image) {
        const image = await pageImage(source.page).catch(() => "");
        if (image) candidates.unshift({ image, page: source.page });
      }
      if (restaurant.video?.url) {
        const image = await bilibiliCover(restaurant.video.url).catch(() => "");
        if (image) candidates.push({ image, page: restaurant.video.url });
      }
      if (!searchFallbacks) searchFallbacks = await bilibiliSearchCovers(restaurant.name).catch(() => []);
      candidates.push(...searchFallbacks);

      let saved = null;
      for (const candidate of candidates) {
        const url = candidate.image.replace(/^http:/, "https:");
        if (!url || used.has(url)) continue;
        try {
          const bytes = await downloadImage(url, path.join(siteRoot, file), candidate.page);
          saved = { restaurant: restaurant.id, file, image: url, page: candidate.page, bytes };
          used.add(url);
          break;
        } catch (error) {
          process.stderr.write(`${restaurant.name} ${index}: ${url} failed (${error.message})\n`);
        }
      }
      if (!saved) throw new Error(`${restaurant.name}: unable to build image ${index}`);
      outputCredits.push(saved);
      await sleep(160);
    }
    process.stdout.write(`Restaurants: ${restaurant.name}\n`);
  }
  await fs.writeFile(path.join(restaurantRoot, "deployment-image-credits.json"), JSON.stringify(outputCredits, null, 2), "utf8");
}

await fs.mkdir(attractionRoot, { recursive: true });
await fs.mkdir(restaurantRoot, { recursive: true });
await buildAttractions();
await buildRestaurants();
process.stdout.write("Deployment assets built successfully.\n");
