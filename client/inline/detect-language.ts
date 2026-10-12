// First visit from a browser set to Chinese: go to the Chinese site. Inlined
// into the English home page. Skipped once the visitor has used the language
// link (panel.ts records that), and when arriving from another page of this
// site.
try {
  const here = document.referrer.startsWith(location.origin);
  if (
    !here && !localStorage.getItem("lang") &&
    (navigator.language || "").toLowerCase().startsWith("zh")
  ) {
    location.replace("/zh/");
  }
} catch {
  // Storage blocked: stay on the English site.
}
