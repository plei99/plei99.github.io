import type { Theme } from "./types";

// The two themes, light and dark: one palette in two keys, the same Kelvin
// family as my terminal and editor. A faintly cool near-white (or a deep
// blue-black), blue for what can be followed and red for the figure's marked
// points, so a link and a marked point never share a colour. The dark key is
// pastel and the light key bold, at the same hue for each role. Body text is
// at least 15:1 against the paper and muted text at least 6:1.
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
//          two lines in a scatter can cross. That takes more spread in
//          lightness than the page's own accents have, so the series are
//          their own set. The light ochre, pink and sky blue sit near 3:1 on
//          the paper or under it, so every line also carries a text label. On
//          the dark paper every series clears 5:1, as protan and deutan
//          readers see it too.
// `dark: true` sets color-scheme, so scrollbars and form controls follow.
//
// Visitors who have not chosen get light or dark by system setting.
export const themes: Theme[] = [
  {
    id: "light",
    name: { en: "Light", zh: "浅色" },
    dark: false,
    paper: "#f9fbfe",
    text: "#0e1826",
    muted: "#535b67",
    ink: "#d2132b",
    link: "#0655e6",
    rule: "#cbd0d8",
    stage: "#eef1f6",
    series: {
      codex: "#007d4f",
      claude: "#c04100",
      google: "#175cf6",
      kimi: "#682b94",
      mimo: "#b89319",
      glm: "#fa499f",
      tencent: "#389dcf",
    },
  },
  {
    id: "dark",
    name: { en: "Dark", zh: "深色" },
    dark: true,
    paper: "#0b121b",
    text: "#e7ecf4",
    muted: "#a9b3c0",
    ink: "#ef7d83",
    link: "#77a6ff",
    rule: "#28313d",
    stage: "#161d27",
    series: {
      codex: "#0ad9a3",
      claude: "#ffa46e",
      google: "#5a97fc",
      kimi: "#d7a9fd",
      mimo: "#aa9601",
      glm: "#ea6a9c",
      tencent: "#a9eaff",
    },
  },
];
