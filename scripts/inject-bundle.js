const fs = require("fs");
const htmlPath = process.argv[2];
const bundlePath = process.argv[3];
let html = fs.readFileSync(htmlPath, "utf8");
const bundle = fs.readFileSync(bundlePath, "utf8");
if (/<\/script/i.test(bundle)) { console.error("ERRO: bundle contem </script>"); process.exit(1); }
const re = /<script>([\s\S]*?)<\/script>/g;
let m, best = null;
while ((m = re.exec(html)) !== null) { if (!best || m[1].length > best[1].length) best = m; }
if (!best || best[1].length < 1000) { console.error("ERRO: script principal nao encontrado"); process.exit(1); }
const cs = best.index + "<script>".length;
const ce = best.index + best[0].length - "</script>".length;
html = html.slice(0, cs) + "\n" + bundle + "\n" + html.slice(ce);
if (html.indexOf("/*ERRCATCH*/") === -1) {
  const catcher = '<script>/*ERRCATCH*/window.addEventListener("error",function(e){var p=document.createElement("pre");p.style.cssText="color:#c00;background:#fff;padding:16px;white-space:pre-wrap;font-size:12px;position:fixed;inset:0;z-index:99999;margin:0";p.textContent="ERRO JS: "+e.message+" (linha "+e.lineno+")";document.documentElement.appendChild(p);},true);setTimeout(function(){var r=document.getElementById("root");if(r&&r.children.length===0){var p=document.createElement("pre");p.style.cssText="color:#c00;background:#fff;padding:16px;white-space:pre-wrap;font-size:12px";p.textContent="ROOT VAZIO: React nao montou e nenhum erro foi capturado.";document.documentElement.appendChild(p);}},4000);</script>';
  const idx = html.indexOf("<script>");
  html = html.slice(0, idx) + catcher + html.slice(idx);
}
fs.writeFileSync(htmlPath, html);
console.log("OK injetado, tamanho " + html.length);
