// Data and helpers shared by the pages. Everything here runs at build time.
import aiSubscriptions from "../data/ai_subscriptions.yaml";
import home from "../data/home.yaml";
import site from "../data/site.yaml";
import themes from "../data/themes.yaml";
import travel from "../data/travel.yaml";
import ui from "../data/ui.yaml";
import uses from "../data/uses.yaml";

export { aiSubscriptions, home, site, themes, travel, ui, uses };

export type Lang = "en" | "zh";
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

export type Theme =
  & { id: string; name: string; dark?: boolean }
  & Record<string, string>;
export type ThemeFamily = { family: string; themes: Theme[] };
export const allThemes: Theme[] = (themes as ThemeFamily[]).flatMap((f) =>
  f.themes
);

// Each theme's brightness and its counterpart of the other brightness: the
// theme in the same place among its family's other half (Gruvbox Dark Soft for
// Gruvbox Light Soft, the last one if the other half is shorter), or the
// default when the family has none.
export const themePairs = Object.fromEntries(
  (themes as ThemeFamily[]).flatMap((family) =>
    family.themes.map((t) => {
      const same = family.themes.filter((o) => !!o.dark === !!t.dark);
      const other = family.themes.filter((o) => !!o.dark !== !!t.dark);
      const pair = other[Math.min(same.indexOf(t), other.length - 1)] ??
        allThemes.find((o) => !!o.dark !== !!t.dark)!;
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

// The seminar pages, newest first. Each is a Markdown file with YAML front
// matter in content/seminars/.
export async function seminars(): Promise<Seminar[]> {
  const list: Seminar[] = [];
  for (const file of new Bun.Glob("content/seminars/*.md").scanSync()) {
    const text = await Bun.file(file).text();
    const [, front = "", body = ""] =
      text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/) ?? [];
    const slug = file.slice("content/seminars/".length, -".md".length);
    const data = Bun.YAML.parse(front) as Omit<
      Seminar,
      "slug" | "url" | "body"
    >;
    list.push({
      ...data,
      pubDate: String(data.pubDate),
      slug,
      url: `/seminars/${slug}/`,
      body,
    });
  }
  return list.sort((a, b) => b.pubDate.localeCompare(a.pubDate));
}
