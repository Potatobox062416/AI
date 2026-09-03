import fs from "node:fs/promises";

const source = await fs.readFile(new URL("../deploy-images.js", import.meta.url), "utf8");
const match = source.match(/const attractionImages = (\{[\s\S]*?\});\n  window/);
if (!match) throw new Error("Cannot read attraction image map from deploy-images.js");

const ids = new Set([
  "tiananmen-rostrum",
  "mao-memorial",
  "confucius-guozijian",
  "military-museum",
  "science-museum",
  "natural-history",
  "archaeology-museum",
  "xiangshan",
  "ming-tombs",
  "grand-canal-museum"
]);
const map = JSON.parse(match[1]);
const urls = Object.entries(map)
  .filter(([id]) => ids.has(id))
  .flatMap(([id, images]) => images.map((url) => ({ id, url })));
const failures = [];
let cursor = 0;

async function worker() {
  while (cursor < urls.length) {
    const item = urls[cursor];
    cursor += 1;
    try {
      const response = await fetch(item.url, {
        redirect: "follow",
        headers: { "user-agent": "Mozilla/5.0", range: "bytes=0-2047" },
        signal: AbortSignal.timeout(15000)
      });
      const type = response.headers.get("content-type") || "";
      await response.body?.cancel();
      if (!response.ok || !type.startsWith("image/")) failures.push({ ...item, status: response.status, type });
    } catch (error) {
      failures.push({ ...item, error: error.message });
    }
  }
}

await Promise.all(Array.from({ length: 8 }, worker));
process.stdout.write(`${JSON.stringify({ checked: urls.length, failures }, null, 2)}\n`);
if (failures.length) process.exitCode = 2;

