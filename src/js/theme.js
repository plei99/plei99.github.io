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

// Every preference (theme, latin, cjk) is kept in two places: localStorage,
// and a cookie that lasts a year. The site is static, so nothing reads the
// cookie on a server; it is a second copy that survives where script-only
// storage is blocked or cleared, and the inline script in <head> reads
// whichever is present. Both are written on a choice the visitor makes.
const YEAR = 60 * 60 * 24 * 365;

function store(key, value) {
  try {
    if (value) localStorage.setItem(key, value);
    else localStorage.removeItem(key);
  } catch {
    // Private browsing: the cookie may still work.
  }
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${key}=${encodeURIComponent(value || "")}; Max-Age=${
    value ? YEAR : 0
  }; Path=/; SameSite=Lax${secure}`;
}

function save(value) {
  store("theme", value);
  try {
    localStorage.removeItem("scheme"); // from the earlier two-control design
  } catch {
    // Nothing to clear.
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

// The font pickers: Latin text (with its math companion) on every page, and
// the Chinese face on Chinese pages. Each sets one attribute on <html> and is
// saved under the same key. With no attribute the stylesheet pairs sans with
// sans (a Chinese sans brings Fira, a Latin sans brings Source Han Sans), so
// a picker with nothing chosen shows that effective value; choosing anything,
// including the default face, makes it explicit. The lists mirror styles.css.
const SANS_LATIN = ["fira", "new-cm-sans", "lato"];
const SANS_CJK = ["sans", "rounded"];
const pickers = {};

function effective(attr) {
  if (root.dataset[attr]) return root.dataset[attr];
  if (attr === "latin") {
    return SANS_CJK.includes(root.dataset.cjk) ? "fira" : "pagella";
  }
  return SANS_LATIN.includes(root.dataset.latin) ? "sans" : "serif";
}

function showEffective() {
  for (const [attr, select] of Object.entries(pickers)) {
    select.value = effective(attr);
  }
}

function fontPicker(selector, attr) {
  const picker = document.querySelector(selector);
  if (!picker) return;
  const select = picker.querySelector("select");
  pickers[attr] = select;
  // A saved value that no longer exists falls back to the default.
  if (root.dataset[attr]) {
    select.value = root.dataset[attr];
    if (select.selectedIndex < 0) {
      delete root.dataset[attr];
      store(attr, "");
    }
  }
  select.addEventListener("change", () => {
    root.dataset[attr] = select.value;
    store(attr, select.value);
    showEffective();
  });
  picker.hidden = false;
}

fontPicker(".latin", "latin");
fontPicker(".cjk", "cjk");
showEffective();
