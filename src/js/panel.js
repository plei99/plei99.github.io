// Opens the site's pages as panels over the figure.
//
// Every page is built with the figure behind it and its own content inside
// <dialog id="panel">, already open in the static HTML. This script upgrades
// that to a modal dialog, and turns internal links into content swaps so the
// figure never reloads. Without it, the links and the close button are plain
// navigation and everything still works.

const panel = document.getElementById("panel");
const content = document.getElementById("panel-content");
const home = document.body.dataset.home;
const homeTitle = document.body.dataset.homeTitle;
const parser = new DOMParser();
let request = 0;

function isHome(url) {
  return url.pathname === "/en/" || url.pathname === "/zh/" ||
    url.pathname === "/";
}

// A link opens in the panel when it points at another HTML page of this site.
function panelTarget(link) {
  // Read attributes, not properties: on the SVG links in the figure, `href`
  // and `target` are SVGAnimatedString objects rather than strings.
  if (link.hasAttribute("target") || link.hasAttribute("download")) return null;
  if (link.hasAttribute("data-no-panel")) return null;
  const url = new URL(link.getAttribute("href"), location.href);
  if (url.origin !== location.origin) return null;
  if (!/(\/|\.html)$/.test(url.pathname)) return null;
  if (url.pathname === location.pathname && url.hash) return null;
  return url;
}

function markCurrent(section) {
  for (const link of document.querySelectorAll(".fig-link")) {
    if (link.dataset.id === section) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  }
}

function setLanguageLinks(doc) {
  const fresh = doc?.querySelectorAll(".langswitch a");
  document.querySelectorAll(".langswitch a").forEach((link, i) => {
    link.href = fresh
      ? fresh[i].getAttribute("href")
      : i === 0
      ? "/en/"
      : "/zh/";
  });
}

// Module scripts only run once per URL, so a page script (the globe) is
// re-imported under a fresh query string each time its panel opens.
function runScripts() {
  for (const script of content.querySelectorAll("script[src]")) {
    import(`${script.getAttribute("src")}?open=${Date.now()}`);
  }
}

function show() {
  if (panel.open && !panel.matches(":modal")) panel.close();
  if (!panel.open) panel.showModal();
  panel.scrollTop = 0;
  // Start reading at the top of the sheet rather than on the close button.
  content.focus({ preventScroll: true });
}

function closePanel({ push }) {
  document.dispatchEvent(new Event("panel:close"));
  if (panel.open) panel.close();
  content.replaceChildren();
  content.dataset.section = "home";
  document.title = homeTitle;
  document.body.classList.add("is-home");
  // Hand focus back to the label this panel was opened from. Two copies of
  // the figure exist; only the one laid out for this screen is rendered.
  const opener = [...document.querySelectorAll(".fig-link[aria-current]")]
    .find((link) => link.getClientRects().length);
  markCurrent(null);
  opener?.focus({ preventScroll: true });
  setLanguageLinks(null);
  if (push) history.pushState({}, "", home);
}

async function openPanel(url, { push }) {
  const id = ++request;
  let doc;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(response.statusText);
    doc = parser.parseFromString(await response.text(), "text/html");
  } catch {
    location.href = url;
    return;
  }
  if (id !== request) return;

  const next = doc.getElementById("panel-content");
  if (!next || !next.children.length) {
    closePanel({ push });
    return;
  }

  document.dispatchEvent(new Event("panel:close"));
  content.replaceChildren(...next.childNodes);
  content.dataset.section = next.dataset.section;
  document.title = next.dataset.title;
  document.body.classList.remove("is-home");
  markCurrent(next.dataset.section);
  setLanguageLinks(doc);
  if (push) history.pushState({}, "", url);
  show();
  runScripts();
}

document.addEventListener("click", (event) => {
  if (event.defaultPrevented || event.button !== 0) return;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const link = event.target.closest("a[href]");
  if (!link) return;
  const url = panelTarget(link);
  if (!url) return;
  event.preventDefault();
  if (isHome(url)) closePanel({ push: true });
  else openPanel(url, { push: true });
});

// Esc fires `cancel`; route it through closePanel so the URL follows.
panel.addEventListener("cancel", (event) => {
  event.preventDefault();
  closePanel({ push: true });
});

// A click on the backdrop lands on the dialog element itself.
panel.addEventListener("click", (event) => {
  if (event.target === panel) closePanel({ push: true });
});

addEventListener("popstate", () => {
  const url = new URL(location.href);
  if (isHome(url)) closePanel({ push: false });
  else openPanel(url, { push: false });
});

if (panel.open) show();
