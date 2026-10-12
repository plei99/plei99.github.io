// Data and helpers shared by the pages. Everything here runs at build time.
import { themes } from "../data/themes";
import type { Lang, Theme } from "../data/types";

export { aiSubscriptions } from "../data/ai-subscriptions";
export { home } from "../data/home";
export { site } from "../data/site";
export { themes } from "../data/themes";
export { travel } from "../data/travel";
export type * from "../data/types";
export { ui } from "../data/ui";
export { uses } from "../data/uses";

export const SITE_URL = "https://plei99.github.io";

// Appended to stylesheet and script URLs. scripts/finish.ts replaces it with
// one id per build, since Bake may render pages in several workers.
export const rev = "__REV__";

export const absolute = (url: string) => SITE_URL + url;

export const md = (text: string) =>
  Bun.markdown.html(text, { tables: true } as never).trim();
export const mdInline = (text: string) =>
  md(text).replace(/^<p>([\s\S]*)<\/p>$/, "$1");

// Seminar schedules are wide tables written in Markdown. Wrap each one in a
// focusable scroll container so narrow screens scroll the table instead of the
// whole page.
export const scrollTables = (html: string, label = "Schedule") =>
  new HTMLRewriter()
    .on("table", {
      element(el) {
        el.before(
          `<div class="table-scroll" tabindex="0" role="region" aria-label="${
            Bun.escapeHTML(label)
          }">`,
          { html: true },
        );
        el.after("</div>", { html: true });
      },
    })
    .transform(html);

export function formatDate(date: string | Date, lang: Lang, long = false) {
  const d = new Date(date);
  if (lang === "zh") {
    return `${d.getUTCFullYear()} 年 ${d.getUTCMonth() + 1} 月`;
  }
  return new Intl.DateTimeFormat("en-US", {
    month: long ? "long" : "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(d);
}

export const allThemes: Theme[] = themes.flatMap((f) => f.themes);

// Each theme's brightness and its counterpart of the other brightness: the
// theme in the same place among its family's other half (Gruvbox Dark Soft for
// Gruvbox Light Soft, the last one if the other half is shorter), or the
// default when the family has none.
export const themePairs: Record<string, [0 | 1, string]> = Object.fromEntries(
  themes.flatMap((family) =>
    family.themes.map((t) => {
      const same = family.themes.filter((o) => o.dark === t.dark);
      const other = family.themes.filter((o) => o.dark !== t.dark);
      const pair = other[Math.min(same.indexOf(t), other.length - 1)] ??
        allThemes.find((o) => o.dark !== t.dark)!;
      return [t.id, [t.dark ? 1 : 0, pair.id]];
    })
  ),
);

export type Seminar = {
  slug: string;
  url: string;
  title: string;
  title_zh?: string;
  description: string;
  description_zh?: string;
  pubDate: string;
  body: string;
};

// Markdown front matter is not type checked, so each seminar's is checked
// here: a missing or misspelled field fails the build and names the file.
function seminarFields(file: string, front: unknown) {
  const data = (front ?? {}) as Record<string, unknown>;
  const fail = (problem: string) => {
    throw new Error(`${file}: ${problem}`);
  };
  const known = [
    "title",
    "title_zh",
    "description",
    "description_zh",
    "pubDate",
  ];
  for (const key of Object.keys(data)) {
    if (!known.includes(key)) fail(`unknown front matter field "${key}"`);
  }
  for (const key of ["title", "description"]) {
    if (typeof data[key] !== "string") fail(`"${key}" must be a string`);
  }
  for (const key of ["title_zh", "description_zh"]) {
    if (data[key] !== undefined && typeof data[key] !== "string") {
      fail(`"${key}" must be a string`);
    }
  }
  const pubDate = String(data.pubDate);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(pubDate)) {
    fail(`"pubDate" must be a YYYY-MM-DD date`);
  }
  return {
    ...(data as Omit<Seminar, "slug" | "url" | "body" | "pubDate">),
    pubDate,
  };
}

// The seminar pages, newest first. Each is a Markdown file with YAML front
// matter in content/seminars/.
export async function seminars(): Promise<Seminar[]> {
  const list: Seminar[] = [];
  for (const file of new Bun.Glob("content/seminars/*.md").scanSync()) {
    const text = await Bun.file(file).text();
    const [, front = "", body = ""] =
      text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/) ?? [];
    const slug = file.slice("content/seminars/".length, -".md".length);
    const fields = seminarFields(file, Bun.YAML.parse(front));
    list.push({ ...fields, slug, url: `/seminars/${slug}/`, body });
  }
  return list.sort((a, b) => b.pubDate.localeCompare(a.pubDate));
}
