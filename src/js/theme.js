// The colour scheme picker and the light/dark button.
//
// styles.css defines every scheme with light-dark(), so this script only sets
// two attributes on <html>: data-scheme (absent for Modus, the default) and
// data-theme (absent to follow the system). Both choices are saved, and the
// inline script in <head> applies them before first paint on later visits.

const root = document.documentElement;
const button = document.querySelector(".theme-toggle");
const picker = document.querySelector(".scheme");
const select = picker.querySelector("select");
const system = matchMedia("(prefers-color-scheme: dark)");

function save(key, value) {
  try {
    if (value) localStorage.setItem(key, value);
    else localStorage.removeItem(key);
  } catch {
    // Private browsing: the choice lasts for this page only.
  }
}

function current() {
  return root.dataset.theme || (system.matches ? "dark" : "light");
}

// The button names the mode it switches to.
function label() {
  button.textContent = current() === "dark"
    ? button.dataset.lightLabel
    : button.dataset.darkLabel;
}

button.addEventListener("click", () => {
  const next = current() === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  save("theme", next);
  label();
});

select.addEventListener("change", () => {
  if (select.value) root.dataset.scheme = select.value;
  else delete root.dataset.scheme;
  save("scheme", select.value);
});

// A saved scheme that no longer exists falls back to the default.
select.value = root.dataset.scheme || "";
if (select.selectedIndex < 0) {
  select.value = "";
  delete root.dataset.scheme;
  save("scheme", "");
}

system.addEventListener("change", label);
button.hidden = false;
picker.hidden = false;
label();
