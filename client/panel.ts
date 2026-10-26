// Opens the site's pages as panels over the figure.
//
// Every page is built with the figure behind it and its own content inside
// <dialog id="panel">, already open in the static HTML. This script upgrades
// that to a modal dialog, and turns internal links into content swaps so the
// figure never reloads. Without it, the links and the close button are plain
// navigation and everything still works.
import { byId, query } from "./dom.js";

const panel = byId("panel", HTMLDialogElement);
const content = byId("panel-content", HTMLElement);
const home = document.body.dataset.home ?? "/";
const homeTitle = document.body.dataset.homeTitle ?? "";
const parser = new DOMParser();
let request = 0;
let activation = 0;
// Where the sheet opens from and closes back into: the marked point of the
// label that was followed, in viewport coordinates.
let origin: { x: number; y: number } | null = null;
let closing = 0;
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");

// The home figure draws itself once per visit to the page, not every time a
// panel closes over it.
function endIntro() {
  document.body.classList.remove("intro");
}

/** The centre of a label's marked point, or of the label itself. */
function pointOf(link: Element) {
  const box = (link.querySelector(".fig-pt") ?? link).getBoundingClientRect();
  if (!box.width && !box.height) return null;
  return { x: box.x + box.width / 2, y: box.y + box.height / 2 };
}

/** A circle at the origin, in the panel's own coordinates, as a clip path. */
function circle(radius: number) {
  const box = panel.getBoundingClientRect();
  const x = (origin?.x ?? box.x + box.width / 2) - box.x;
  const y = (origin?.y ?? box.y + box.height / 2) - box.y;
  const far = Math.hypot(
    Math.max(x, box.width - x),
    Math.max(y, box.height - y),
  );
  return `circle(${radius < 0 ? far : radius}px at ${x}px ${y}px)`;
}

function animated() {
  return !reducedMotion.matches && typeof panel.animate === "function";
}

function isHome(url: URL) {
  return url.pathname === "/" || url.pathname === "/zh/";
}

// Other GitHub Pages projects share this origin. Their HTML must be opened as
// a new document, never transplanted into this site's trusted script context.
function isPanelPage(url: URL) {
  return url.origin === location.origin && (
    /^\/(en|zh)\/(about|now|travel|uses)\.html$/.test(url.pathname) ||
    /^\/(?:zh\/)?seminars\/(?:[a-z0-9-]+\/)?$/.test(url.pathname)
  );
}

// A link opens in the panel when it points at another HTML page of this site.
function panelTarget(link: Element) {
  // Read attributes, not properties: on the SVG links in the figure, `href`
  // and `target` are SVGAnimatedString objects rather than strings.
  if (link.hasAttribute("target") || link.hasAttribute("download")) return null;
  if (link.hasAttribute("data-no-panel")) return null;
  const url = new URL(link.getAttribute("href") ?? "", location.href);
  if (url.origin !== location.origin) return null;
  if (!isHome(url) && !isPanelPage(url)) return null;
  if (url.pathname === location.pathname && url.hash) return null;
  return url;
}

function markCurrent(section: string | null) {
  for (
    const link of document.querySelectorAll<HTMLElement | SVGElement>(
      ".fig-link, .panel-nav a",
    )
  ) {
    if (link.dataset.id === section) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  }
  // On a narrow screen the bar scrolls sideways; keep the current page in it.
  const here = document.querySelector<HTMLElement>(
    ".panel-nav a[aria-current]",
  );
  const bar = here?.parentElement;
  if (here && bar && bar.scrollWidth > bar.clientWidth) {
    bar.scrollLeft = here.offsetLeft - bar.offsetLeft - bar.clientWidth / 3;
  }
}

// The language link comes from the page now in the panel, label included: a
// seminar page opened from the Chinese site is English, so its link must offer
// 中文. Closing the panel restores the link the home page started with.
const homeLanguageLink = document.body.classList.contains("is-home")
  ? query(".langswitch", HTMLAnchorElement).cloneNode(true) as HTMLAnchorElement
  : null;

function setLanguageLinks(doc: Document | null) {
  const current = query(".langswitch", HTMLAnchorElement);
  const fresh = doc?.querySelector(".langswitch") ?? homeLanguageLink;
  if (fresh) {
    current.replaceWith(document.importNode(fresh, true));
    return;
  }
  // Closed a panel on a page that did not load as the home page.
  const toEnglish = home === "/zh/";
  current.href = toEnglish ? "/" : "/zh/";
  current.textContent = toEnglish ? "English" : "中文";
  current.lang = toEnglish ? "en" : "zh-CN";
  current.hreflang = toEnglish ? "en" : "zh-Hans";
}

// Module scripts only run once per URL. Reload the two known enhancements
// when their panel opens, without treating script URLs in fetched HTML as code.
function runScripts() {
  const section = content.dataset.section;
  if (section !== "travel" && section !== "uses") return;
  const src = new URL(
    section === "travel" ? "./globe.js" : "./uses.js",
    import.meta.url,
  );
  src.searchParams.set("open", String(++activation));
  import(src.href);
}

function show() {
  if (panel.open && !panel.matches(":modal")) panel.close();
  const opening = !panel.open;
  if (opening) panel.showModal();
  panel.scrollTop = 0;
  if (animated()) {
    // A new sheet opens out of the point that was followed; moving between
    // pages on an open sheet only settles the new text into place.
    if (opening && origin) {
      // It also swells slightly from the point, so a point outside the sheet
      // still reads as where it came from.
      const box = panel.getBoundingClientRect();
      panel.style.transformOrigin = `${origin.x - box.x}px ${
        origin.y - box.y
      }px`;
      panel.animate([
        { clipPath: circle(0), transform: "scale(0.92)" },
        { clipPath: circle(-1), transform: "none" },
      ], { duration: 520, easing: "cubic-bezier(0.7, 0, 0.2, 1)" });
    } else if (!opening) {
      content.animate([{ opacity: 0, transform: "translateY(0.4rem)" }, {
        opacity: 1,
        transform: "none",
      }], { duration: 220, easing: "ease-out" });
    }
  }
  // Start reading at the top of the sheet rather than on the close button.
  content.focus({ preventScroll: true });
}

function closePanel({ push }: { push: boolean }) {
  endIntro();
  request++;
  document.dispatchEvent(new Event("panel:close"));
  const opener = [
    ...document.querySelectorAll<HTMLElement | SVGElement>(
      ".fig-link[aria-current]",
    ),
  ]
    .find((link) => link.getClientRects().length);
  // Fold the sheet back into the point it came from, then put it away.
  const token = ++closing;
  const finish = () => {
    if (token !== closing) return;
    if (panel.open) panel.close();
    content.replaceChildren();
  };
  if (panel.open && animated() && panel.matches(":modal")) {
    origin = opener ? pointOf(opener) : null;
    panel.animate([{ clipPath: circle(-1) }, { clipPath: circle(0) }], {
      duration: 340,
      easing: "cubic-bezier(0.6, 0, 0.4, 1)",
    }).finished.then(finish, finish);
  } else {
    finish();
  }
  content.dataset.section = "home";
  document.title = homeTitle;
  document.body.classList.add("is-home");
  // Hand focus back to the label this panel was opened from. Two copies of
  // the figure exist; only the one laid out for this screen is rendered.
  markCurrent(null);
  opener?.focus({ preventScroll: true });
  setLanguageLinks(null);
  if (push) history.pushState({}, "", home);
}

async function openPanel(url: URL, { push }: { push: boolean }) {
  if (!isPanelPage(url)) {
    location.href = url.href;
    return;
  }
  const id = ++request;
  let doc: Document;
  try {
    const response = await fetch(url, {
      mode: "same-origin",
      redirect: "error",
    });
    if (!response.ok) throw new Error(response.statusText);
    if (!response.headers.get("content-type")?.startsWith("text/html")) {
      throw new Error("Panel response is not HTML");
    }
    doc = parser.parseFromString(await response.text(), "text/html");
  } catch {
    location.href = url.href;
    return;
  }
  if (id !== request) return;

  const next = doc.getElementById("panel-content");
  // Other projects on this origin (such as tikz-bench) have their own layout.
  if (!next) {
    location.href = url.href;
    return;
  }
  if (!next.children.length) {
    closePanel({ push });
    return;
  }

  endIntro();
  closing++;
  document.dispatchEvent(new Event("panel:close"));
  for (const script of next.querySelectorAll("script")) script.remove();
  content.replaceChildren(...next.childNodes);
  content.dataset.section = next.dataset.section;
  document.title = next.dataset.title ?? homeTitle;
  document.body.classList.remove("is-home");
  markCurrent(next.dataset.section ?? null);
  setLanguageLinks(doc);
  if (push) history.pushState({}, "", url);
  show();
  runScripts();
}

// Remember a deliberate language choice, so the root page's first-visit
// language detection never overrides it.
document.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) return;
  const link = event.target.closest<HTMLAnchorElement>(".langswitch");
  if (!link) return;
  try {
    localStorage.setItem("lang", link.lang.startsWith("zh") ? "zh" : "en");
  } catch {
    // Private browsing: nothing to remember.
  }
});

document.addEventListener("click", (event) => {
  if (event.defaultPrevented || event.button !== 0) return;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  if (!(event.target instanceof Element)) return;
  const link = event.target.closest("a[href]");
  if (!link) return;
  const url = panelTarget(link);
  if (!url) return;
  event.preventDefault();
  origin = link.closest(".fig-link") ? pointOf(link) : null;
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
  origin = null;
  const url = new URL(location.href);
  if (isHome(url)) closePanel({ push: false });
  else openPanel(url, { push: false });
});

if (panel.open) {
  markCurrent(content.dataset.section ?? null);
  show();
}
