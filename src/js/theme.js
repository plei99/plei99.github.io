// The theme picker, and on Chinese pages the Chinese font picker.
//
// themes.css defines one block per theme, selected by data-theme on <html>.
// With nothing chosen the attribute is absent and the stylesheet shows the
// default light or dark theme by the system setting; the picker then shows
// whichever of the two is on screen. A choice is saved, and the inline script
// in <head> applies it before first paint on later visits.

const root = document.documentElement;
const picker = document.querySelector(".scheme");
const select = picker.querySelector("select");
const system = matchMedia("(prefers-color-scheme: dark)");

function save(value) {
  try {
    if (value) localStorage.setItem("theme", value);
    else localStorage.removeItem("theme");
    localStorage.removeItem("scheme"); // from the earlier two-control design
  } catch {
    // Private browsing: the choice lasts for this page only.
  }
}

function showCurrent() {
  select.value = root.dataset.theme ||
    (system.matches ? select.dataset.defaultDark : select.dataset.defaultLight);
}

select.addEventListener("change", () => {
  root.dataset.theme = select.value;
  save(select.value);
});

// A saved theme that no longer exists (an old "dark", the removed light Nord)
// falls back to the default.
showCurrent();
if (select.selectedIndex < 0) {
  delete root.dataset.theme;
  save("");
  showCurrent();
}

system.addEventListener("change", () => {
  if (!root.dataset.theme) showCurrent();
});
picker.hidden = false;

// Chinese font: Source Han Serif by default, LXGW WenKai by choice, applied
// through data-cjk on <html> and saved the same way as the theme.
const cjk = document.querySelector(".cjk");
if (cjk) {
  const cjkSelect = cjk.querySelector("select");
  cjkSelect.value = root.dataset.cjk === "wenkai" ? "wenkai" : "";
  cjkSelect.addEventListener("change", () => {
    if (cjkSelect.value) root.dataset.cjk = cjkSelect.value;
    else delete root.dataset.cjk;
    try {
      if (cjkSelect.value) localStorage.setItem("cjk", cjkSelect.value);
      else localStorage.removeItem("cjk");
    } catch {
      // Private browsing: the choice lasts for this page only.
    }
  });
  cjk.hidden = false;
}
