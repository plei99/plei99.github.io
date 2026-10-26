// The globe is drawn in the page's own colours, so it reads as part of the
// figure: paper land with ink borders, a sea tinted toward the link colour,
// and the visited countries in the link colour itself.
export type Surface = Record<
  | "ocean"
  | "graticule"
  | "land"
  | "border"
  | "visited"
  | "visitedBorder"
  | "ice"
  | "iceBorder"
  | "shadow",
  string
>;

function rgb(hex: string) {
  const value = parseInt(hex.replace("#", "").slice(0, 6), 16);
  return [value >> 16, (value >> 8) & 255, value & 255] as const;
}

/** `a` moved a fraction `t` of the way toward `b`, as a hex colour. */
function mix(a: string, b: string, t: number) {
  const [x, y] = [rgb(a), rgb(b)];
  return "#" +
    x.map((c, i) =>
      Math.round(c + (y[i]! - c) * t).toString(16).padStart(2, "0")
    ).join("");
}

/** The theme roles of styles.css, as read from the page. */
export function surfaceColors(
  { paper, text, link, rule }: Record<
    "paper" | "text" | "link" | "rule",
    string
  >,
): Surface {
  // On a dark page the land must still stand out from the sea.
  const dark = rgb(paper).reduce((sum, c) => sum + c, 0) < 3 * 128;
  return {
    ocean: mix(paper, link, 0.17),
    graticule: mix(paper, link, 0.32),
    land: mix(paper, text, dark ? 0.2 : 0.03),
    border: mix(paper, text, dark ? 0.6 : 0.5),
    visited: mix(paper, link, 0.72),
    visitedBorder: link,
    ice: paper,
    iceBorder: rule,
    shadow: "#000000",
  };
}

// The measured August 2026 NSIDC sea-ice extent is drawn beneath the land.
export { arcticIce } from "./arctic-ice.js";
