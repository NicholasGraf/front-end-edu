/*  ----- A Basic SPA Node Server for Local Development
    This server simulates a real web server like Apache or NGINX.
    It routes all 404 traffic to the root folder index.html page creating an SPA environment that allows us to control routing on the client side.
    Included is GZIP compression and allowance control for file types listed in the mimeType array.
*/

// Server Port
const port = 8000;

// Startup URL
const url = `http://localhost:${port}`;

// Root Directory
const appRoot = "./app/";

// Allowed MIME types
const mimeTypes = {
  ico: "image/x-icon",
  html: "text/html",
  htm: "text/html",
  js: "text/javascript",
  css: "text/css",
  json: "application/json",
  xml: "application/xml",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  gif: "image/gif",
  wav: "audio/wav",
  mp3: "audio/mp3",
  svg: "image/svg+xml",
  pdf: "application/pdf",
  doc: "application/doc",
};

// --- DO NOT EDIT BELOW THIS LINE--- //

const path = require("path");
const root = path.join(__dirname, appRoot);
const zlib = require("zlib");
const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const pathname = new URL(req.url, `http://${req.headers.host}`).pathname;
  let filename = path.join(root, pathname);

  const sendFile = (filename) => {
    let raw = fs.createReadStream(filename),
      acceptEncoding = req.headers["accept-encoding"] || "",
      ext = path.extname(filename).slice(1),
      mimeType = mimeTypes[ext] || "text/plain";

    if (acceptEncoding.match(/\bdeflate\b/)) {
      res.writeHead(200, {
        "Content-Type": mimeType,
        "Content-encoding": "deflate",
        "Cache-Control": "max-age=31536000",
      });
      raw.pipe(zlib.createDeflate()).pipe(res);
    } else if (acceptEncoding.match(/\bgzip\b/)) {
      res.writeHead(200, {
        "Content-Type": mimeType,
        "Content-encoding": "gzip",
        "Cache-Control": "max-age=31536000",
      });
      raw.pipe(zlib.createGzip()).pipe(res);
    } else {
      res.writeHead(200, {});
      raw.pipe(res);
    }
  };

  fs.stat(filename, (err, stats) => {
    if (err || stats.isDirectory() || pathname === "/") {
      filename = path.join(root, "index.html");
      sendFile(filename);
    } else {
      sendFile(filename);
    }
  });
});

server.listen(port, () => {
  let start = process.platform == "darwin" ? "open" : process.platform == "win32" ? "start" : "xdg-open";
  require("child_process").exec(`${start} ${url}`);
  console.log(`Server running at ${url}`);
});
