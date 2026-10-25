const fs = require("fs");
const htmlPath = process.argv[2];
const bundlePath = process.argv[3];
const html = fs.readFileSync(htmlPath, "utf8");
const bundle = fs.readFileSync(bundlePath, "utf8");
const open = "<script>";
const start = html.lastIndexOf(open);
const end = html.lastIndexOf("</script>");
if (start === -1 || end === -1 || end < start) {
  console.error("ERRO: tags <script> nao encontradas no index.html");
  process.exit(1);
}
const out = html.slice(0, start + open.length) + "\n" + bundle + "\n" + html.slice(end);
fs.writeFileSync(htmlPath, out);
console.log("OK Bundle injetado em " + htmlPath + " (" + out.length + " bytes)");
