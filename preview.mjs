import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("./dist/", import.meta.url));
const types = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".vcf": "text/vcard; charset=utf-8",
  ".webp": "image/webp",
  ".woff2": "font/woff2"
};
const port = Number(process.env.CARD_PREVIEW_PORT ?? 4173);
const server = createServer(async (request, response) => {
  if (request.method !== "GET" && request.method !== "HEAD") {
    response.writeHead(405, { Allow: "GET, HEAD" }).end();
    return;
  }
  try {
    const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    if (pathname === "/") {
      response.writeHead(302, { Location: "/card" }).end();
      return;
    }
    const relative = pathname === "/card" || pathname === "/card/" ? "card/index.html" : "." + pathname;
    const file = resolve(root, relative);
    if (!file.startsWith(resolve(root) + sep)) {
      response.writeHead(404).end();
      return;
    }
    const data = await readFile(file);
    const headers = { "Content-Type": types[extname(file)] ?? "application/octet-stream", "Content-Length": data.length };
    if (extname(file) === ".vcf") headers["Content-Disposition"] = 'attachment; filename="sanskar-tiwari.vcf"';
    response.writeHead(200, headers).end(request.method === "HEAD" ? undefined : data);
  } catch {
    response.writeHead(404).end("Not found");
  }
});

server.listen(port, "127.0.0.1", () => console.log("Local: http://127.0.0.1:" + port + "/card"));
