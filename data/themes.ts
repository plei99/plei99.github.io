import type { Theme } from "./types";

// The two themes, light and dark: one palette in two keys. Warm paper (or
// warm near-black), teal for what can be followed and terracotta for the
// figure's marked points, so a link and a marked point never share a colour.
// Body text is at least 13:1 against the paper and muted text at least 5:1.
// This file is the single source: themes.css is generated from it and so is
// the picker in the footer.
//
// Each theme gives the page's colour roles:
//   paper  background             ink    marked points and cycles in the figure
//   text   text and outlines      link   words that can be followed
//   muted  dates, ledes           rule   hairlines
//   stage  raised surfaces, such as the globe's backdrop (optional; when absent
//          it is the paper colour nudged toward the text colour)
//   series one colour per subscription in the AI quota chart, each near its
//          maker's own hue. Every pair stays distinct with full colour vision
//          (OKLab ΔE ≥ 16) and under protan/deutan simulation (≥ 8), since any
//          two lines in a scatter can cross. OpenAI's green sits well above
//          Anthropic's rust in lightness, not below: protanopia darkens reds,
//          so a lighter orange would slide back toward a dark green. The
//          light ochre and pink fall under 3:1 on the paper, so every line
//          also carries a text label. On the dark paper every series clears
//          3:1 as protan and deutan readers see it too, since dimmed reds
//          there sink into the background.
// `dark: true` sets color-scheme, so scrollbars and form controls follow.
//
// Visitors who have not chosen get light or dark by system setting.
export const themes: Theme[] = [
  {
    id: "light",
    name: { en: "Light", zh: "浅色" },
    dark: false,
    paper: "#f6f1e7",
    text: "#2a2622",
    muted: "#6b6257",
    ink: "#b5462b",
    link: "#18666f",
    rule: "#cfc4b2",
    stage: "#ece5d7",
    series: {
      codex: "#0a9e5b",
      claude: "#932605",
      google: "#2456a2",
      kimi: "#8543d6",
      mimo: "#dba11f",
      glm: "#e0609f",
    },
  },
  {
    id: "dark",
    name: { en: "Dark", zh: "深色" },
    dark: true,
    paper: "#1a1714",
    text: "#ede6da",
    muted: "#b1a797",
    ink: "#e8876a",
    link: "#82b8c7",
    rule: "#433b33",
    stage: "#2b251f",
    series: {
      codex: "#16ad93",
      claude: "#c25634",
      google: "#3d92ed",
      kimi: "#8045e4",
      mimo: "#b09303",
      glm: "#c1429a",
    },
  },
];
