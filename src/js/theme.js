// The light/dark button. With nothing saved the stylesheet follows the system
// setting; pressing the button saves an explicit choice, which the inline
// script in <head> applies before first paint on later visits.

const button = document.querySelector(".theme-toggle");
const root = document.documentElement;
const system = matchMedia("(prefers-color-scheme: dark)");

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
  try {
    localStorage.setItem("theme", next);
  } catch {
    // Private browsing: the choice lasts for this page only.
  }
  label();
});

system.addEventListener("change", label);
button.hidden = false;
label();
