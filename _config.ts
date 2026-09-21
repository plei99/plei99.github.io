import lume from "lume/mod.ts";
import date from "lume/plugins/date.ts";
import sitemap from "lume/plugins/sitemap.ts";

const site = lume({
  src: "./src",
  dest: "./_site",
  location: new URL("https://plei99.github.io/"),
});

// A per-build id appended to the stylesheet and script URLs. GitHub Pages
// caches everything for ten minutes, so without it a browser can pair fresh
// HTML with a stale stylesheet right after a deploy.
site.data("rev", Date.now().toString(36));

// Static assets are copied verbatim so their public URLs stay stable.
site.copy("styles.css");
site.copy("favicon.ico");
site.copy("robots.txt");
site.copy("js");
site.copy("images");
site.copy("fonts");

site.use(date());
site.use(
  sitemap({
    query: "url!=/en/ url!=/404.html url!=/papers.html url!=/zh/papers.html",
  }),
);

// Seminar schedules are wide tables written in Markdown. Wrap each one in a
// focusable scroll container so narrow screens scroll the table instead of the
// whole page.
site.process([".html"], (pages) => {
  for (const page of pages) {
    const doc = page.document;
    for (const table of doc.querySelectorAll(".prose table")) {
      const wrapper = doc.createElement("div");
      wrapper.className = "table-scroll";
      wrapper.setAttribute("tabindex", "0");
      wrapper.setAttribute("role", "region");
      wrapper.setAttribute("aria-label", "Schedule");
      table.parentNode?.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    }
  }
});

export default site;
