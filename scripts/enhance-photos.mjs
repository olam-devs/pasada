// Prepares photos for the website: resizes, adds contrast and colour, and
// lifts dark photos a little. Pale, white-walled photos get contrast rather
// than extra brightness, so they don't wash out on the white page.
//
// Usage:
//   node scripts/enhance-photos.mjs --out public/images/programmes photo1.jpg photo2.jpg
//   node scripts/enhance-photos.mjs --out public/images "https://example.org/a.jpg::new-name.jpg"
//
// Each input is a file path or an https URL. Add ::name.jpg to choose the output name.
// Options: --width 2000 (longest side, default 2000), --quality 82.
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const args = process.argv.slice(2);
const opt = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  if (i === -1) return fallback;
  const [, value] = args.splice(i, 2);
  return value;
};
const outDir = opt("out", "enhanced-photos");
const maxSide = Number(opt("width", 2000));
const quality = Number(opt("quality", 82));
if (!args.length) {
  console.error("Give at least one photo. See the comment at the top of this file.");
  process.exit(1);
}
fs.mkdirSync(outDir, { recursive: true });

async function load(source) {
  if (/^https:\/\//.test(source)) {
    const res = await fetch(source);
    if (!res.ok) throw new Error(`download failed (${res.status})`);
    return Buffer.from(await res.arrayBuffer());
  }
  return fs.promises.readFile(source);
}

/** Average lightness (0-1) and colourfulness (0-1) of a small preview. */
async function measure(buffer) {
  const { data } = await sharp(buffer)
    .rotate()
    .resize(64, 64, { fit: "fill" })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  let light = 0;
  let sat = 0;
  for (let i = 0; i < data.length; i += 3) {
    const r = data[i] / 255, g = data[i + 1] / 255, b = data[i + 2] / 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    light += (max + min) / 2;
    sat += max === 0 ? 0 : (max - min) / max;
  }
  const n = data.length / 3;
  return { light: light / n, sat: sat / n };
}

for (const input of args) {
  const [source, wanted] = input.split("::");
  const name = (wanted || path.basename(source.split("?")[0]))
    .replace(/\.(png|jpeg|webp|tiff?)$/i, ".jpg")
    .replace(/[^\w.-]+/g, "-")
    .toLowerCase();
  try {
    const buffer = await load(source);
    const { light, sat } = await measure(buffer);
    let img = sharp(buffer)
      .rotate()
      .flatten({ background: "#ffffff" })
      .resize(maxSide, maxSide, { fit: "inside", withoutEnlargement: true })
      .normalise({ lower: 1, upper: 99.5 });
    // Dark photos: lift brightness. Pale photos: deepen mid-tones instead.
    const brightness = light < 0.45 ? Math.min(1.14, 0.5 / Math.max(light, 0.3)) : 1;
    img = img.modulate({ brightness, saturation: sat < 0.2 ? 1.22 : 1.12 });
    if (light > 0.6) img = img.linear(1.08, -12);
    await img
      .sharpen({ sigma: 0.6 })
      .jpeg({ quality, mozjpeg: true, progressive: true })
      .toFile(path.join(outDir, name));
    console.log(
      `${name}: lightness ${light.toFixed(2)}, colour ${sat.toFixed(2)}` +
        (brightness > 1 ? `, brightened x${brightness.toFixed(2)}` : "") +
        (light > 0.6 ? ", contrast added" : ""),
    );
  } catch (error) {
    console.error(`${input}: ${error.message}`);
    process.exitCode = 1;
  }
}
