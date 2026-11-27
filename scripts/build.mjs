import { cp, mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import profile from "../src/profile.mjs";
import { renderCard } from "../src/render.mjs";
import { writeIntegrations } from "../src/integrations.mjs";

const output = fileURLToPath(new URL("../dist/", import.meta.url));
const page = new URL("../dist/card/", import.meta.url);
const assets = new URL("../dist/card-assets/", import.meta.url);

await Promise.all([mkdir(page, { recursive: true }), mkdir(assets, { recursive: true })]);
await Promise.all([
  writeFile(new URL("index.html", page), renderCard(profile)),
  cp(new URL("../assets/", import.meta.url), assets, { recursive: true }),
  writeIntegrations(profile, fileURLToPath(assets))
]);
console.log("Built " + output + "card/index.html");
