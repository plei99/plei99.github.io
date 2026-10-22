// Runs after `bun build --app` and turns dist/ into the site:
//
// - Bake's React shell owns <html> and <body>, so each page's
//   <template data-shell> carries the attributes they need (lang, the home
//   link panel.js reads, is-home), and the shell's own <title> goes.
// - Pages have no client components, so Bake ships no client runtime; the
//   inlined RSC payload and the .rsc files that only it would read go too.
// - A route like pages/en/about.html.tsx is written to en/about.html/index.html;
//   it moves to en/about.html, the URL the site has always used.
// - public/ is copied, the browser scripts in client/ are compiled into js/,
//   and themes.css and sitemap.xml are written.
import { cp, rename, rm, rmdir } from "node:fs/promises";
import path from "node:path";
import { allThemes, SITE_URL, type Theme } from "../lib/site";
import { scriptHash, securePage } from "../lib/security";

const OUT = "dist";
const rev = Date.now().toString(36);
const SITEMAP_EXCLUDE = new Set([
  "/en/",
  "/404.html",
  "/papers.html",
  "/zh/papers.html",
  "/notes.html",
  "/zh/notes.html",
]);

function finishPage(html: string) {
  const shell: Record<string, string> = {};
  html = new HTMLRewriter()
    .on("template[data-shell]", {
      element(el) {
        for (const [name, value] of el.attributes) shell[name] = value;
        el.remove();
      },
    })
    .transform(html);
  return new HTMLRewriter()
    .on("html", {
      element(el) {
        if (shell["data-lang"]) el.setAttribute("lang", shell["data-lang"]);
      },
    })
    .on("body", {
      element(el) {
        if (shell["data-home"]) {
          el.setAttribute("data-home", shell["data-home"]);
        }
        if (shell["data-home-title"]) {
          el.setAttribute("data-home-title", shell["data-home-title"]);
        }
        if (shell["data-body-class"]) {
          el.setAttribute("class", shell["data-body-class"]);
        }
      },
    })
    .transform(html)
    .replace("<title>Bun + React Server Components</title>", "")
    .replace(
      /<script>\(self\.__bun_f\|\|=\[\]\)\.push\([\s\S]*?<\/script>/g,
      "",
    )
    .replaceAll("__REV__", rev);
}

// Generated from data/themes.yaml: one block per theme, selected by data-theme
// on <html>. The defaults also apply with no data-theme: the light one always,
// the dark one when the system is set to dark.
function themesCss() {
  const [light, dark] = [
    allThemes.find((t) => !t.dark)!,
    allThemes.find((t) => t.dark)!,
  ];
  const block = (t: Theme, indent: string) =>
    [
      `color-scheme: ${t.dark ? "dark" : "light"};`,
      ...(["paper", "text", "muted", "ink", "link", "rule"] as const).map((
        role,
      ) => `--${role}: ${t[role]};`),
      `--stage: ${
        t.stage || "color-mix(in srgb, var(--paper) 92%, var(--text))"
      };`,
      `--shadow: ${t.dark ? "rgb(0 0 0 / 0.6)" : "rgb(17 17 17 / 0.35)"};`,
    ].map((line) => indent + line).join("\n");
  let css = `:root {\n${
    block(light, "  ")
  }\n}\n\n@media (prefers-color-scheme: dark) {\n  :root:not([data-theme]) {\n${
    block(dark, "    ")
  }\n  }\n}\n`;
  for (const t of allThemes) {
    if (t !== light) {
      css += `\n:root[data-theme="${t.id}"] {\n${block(t, "  ")}\n}\n`;
    }
  }
  return css;
}

const urls: string[] = [];
for (const file of new Bun.Glob("**/index.html").scanSync(OUT)) {
  const html = finishPage(await Bun.file(`${OUT}/${file}`).text());
  const dir = path.dirname(file);
  let url = dir === "." ? "/" : `/${dir}/`;
  let target = `${OUT}/${file}`;
  if (dir.endsWith(".html")) {
    url = `/${dir}`;
    target = `${OUT}/${dir}.tmp`;
  }
  await Bun.write(target, html);
  urls.push(url);
}
for (const file of new Bun.Glob("**/*.rsc").scanSync(OUT)) {
  await rm(`${OUT}/${file}`);
}
for (const dir of new Bun.Glob("**/*.html/index.html").scanSync(OUT)) {
  const name = path.dirname(dir);
  await rm(`${OUT}/${dir}`);
  await rmdir(`${OUT}/${name}`);
  await rename(`${OUT}/${name}.tmp`, `${OUT}/${name}`);
}
await rm(`${OUT}/_bun`, { recursive: true, force: true });

await cp("public", OUT, { recursive: true });

// Each browser script is compiled on its own, keeping its imports, so the
// pages load the same modules at the same URLs as before: client/panel.ts
// becomes js/panel.js. client/inline/ is built into the pages instead.
const transpiler = new Bun.Transpiler({ loader: "ts", target: "browser" });
const scripts = new Map<string, string>();
for (const file of new Bun.Glob("*.ts").scanSync("client")) {
  if (file.endsWith(".d.ts")) continue;
  const code = transpiler.transformSync(
    await Bun.file(`client/${file}`).text(),
  );
  const url = `/js/${file.replace(/\.ts$/, ".js")}`;
  await Bun.write(`${OUT}${url}`, code);
  scripts.set(url, scriptHash(code));
}
for (const file of new Bun.Glob("**/*.html").scanSync(OUT)) {
  const page = `${OUT}/${file}`;
  await Bun.write(page, securePage(await Bun.file(page).text(), scripts));
}
await Bun.write(`${OUT}/themes.css`, themesCss());
await Bun.write(
  `${OUT}/sitemap.xml`,
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${
    urls.filter((u) => !SITEMAP_EXCLUDE.has(u)).sort().map((u) =>
      `  <url><loc>${SITE_URL}${u}</loc></url>\n`
    ).join("")
  }</urlset>\n`,
);
console.log(`Finished ${urls.length} pages in ${OUT}/`);
