import lume from "lume/mod.ts";
import date from "lume/plugins/date.ts";
import sitemap from "lume/plugins/sitemap.ts";

const site = lume({
  src: "./src",
  dest: "./_site",
  location: new URL("https://plei99.github.io/"),
});

// Static assets are copied verbatim so their public URLs stay stable.
site.copy("styles.css");
site.copy("favicon.ico");
site.copy("robots.txt");
site.copy("js");
site.copy("images");

site.use(date());
site.use(sitemap());

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
