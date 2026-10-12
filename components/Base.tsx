import { Fragment, type ReactNode } from "react";
import {
  absolute,
  allThemes,
  home,
  type Lang,
  rev,
  site,
  type ThemeFamily,
  themePairs,
  themes,
  ui,
} from "../lib/site";
import Figure from "./Figure";

export type PageInfo = {
  lang: Lang;
  title: string;
  url: string;
  section: string;
  altUrl?: string;
  switchUrl?: string;
  description?: string;
  detectLanguage?: boolean;
};

// First visit from a browser set to Chinese: go to the Chinese site. Skipped
// once the visitor has used the language link (panel.js records that), and when
// arriving from another page of this site.
const detectLanguageScript = `try {
  var here = document.referrer.indexOf(location.origin) === 0;
  if (!here && !localStorage.getItem("lang") &&
      (navigator.language || "").toLowerCase().indexOf("zh") === 0) {
    location.replace("/zh/");
  }
} catch (_) {}`;

// Apply saved preferences before first paint. Each is read from localStorage,
// or from the cookie of the same name (js/theme.js writes both). The theme
// follows the system setting: a saved theme is stored with the setting it was
// chosen under ("theme-system"), and once the setting differs a theme of the
// wrong brightness gives way to its counterpart. js/theme.js calls applyTheme
// again when the setting changes while a page is open.
const preferencesScript = `(function () {
  function pref(key) {
    try {
      var v = localStorage.getItem(key);
      if (v) return v;
    } catch (_) {}
    var m = document.cookie.match(new RegExp("(?:^|; )" + key + "=([^;]*)"));
    return m ? decodeURIComponent(m[1]) : "";
  }
  var root = document.documentElement;
  var keys = ["latin", "cjk"];
  for (var i = 0; i < keys.length; i++) {
    var v = pref(keys[i]);
    if (v) root.dataset[keys[i]] = v;
  }
  var pairs = ${JSON.stringify(themePairs)};
  var system = matchMedia("(prefers-color-scheme: dark)");
  window.applyTheme = function () {
    var theme = pref("theme");
    var now = system.matches ? "dark" : "light";
    var pair = pairs[theme];
    if (pair && (pref("theme-system") || now) !== now &&
        !!pair[0] !== system.matches) {
      theme = pair[1];
    }
    if (theme) root.dataset.theme = theme;
    else delete root.dataset.theme;
  };
  window.applyTheme();
})();`;

export function fullTitle(title: string) {
  return title === site.name ? title : `${title} · ${site.name}`;
}

/** The page: head metadata, masthead, the figure, footer, and the panel. */
export default function Base(
  { page, children }: { page: PageInfo; children?: ReactNode },
) {
  const { lang, title, url, section, altUrl, switchUrl } = page;
  const t = ui[lang];
  const description = page.description ?? site.description[lang];
  const homeUrl = lang === "zh" ? "/zh/" : "/";
  const isHome = section === "home";

  return (
    <>
      {
        /* Bake's React shell owns <html> and <body>; scripts/finish.ts copies
          these attributes onto them. */
      }
      <template
        data-shell
        data-lang={lang === "zh" ? "zh-CN" : "en"}
        data-home={homeUrl}
        data-home-title={site.name}
        data-body-class={isHome ? "is-home" : undefined}
      />
      <meta charSet="utf-8" />
      <title>{fullTitle(title)}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={absolute(url)} />
      {altUrl && (
        <>
          <link
            rel="alternate"
            hrefLang={lang === "zh" ? "en" : "zh-Hans"}
            href={absolute(altUrl)}
          />
          <link
            rel="alternate"
            hrefLang={lang === "zh" ? "zh-Hans" : "en"}
            href={absolute(url)}
          />
        </>
      )}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={absolute(url)} />
      <meta property="og:locale" content={lang === "zh" ? "zh_CN" : "en_US"} />
      <meta name="twitter:card" content="summary" />
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <meta name="color-scheme" content="light dark" />
      <link
        rel="preload"
        href="/fonts/tex-gyre-pagella-regular.woff2"
        as="font"
        type="font/woff2"
        crossOrigin=""
      />
      <link
        rel="stylesheet"
        href={`/fonts/fonts.css?v=${rev}`}
        precedence="site"
      />
      <link rel="stylesheet" href={`/themes.css?v=${rev}`} precedence="site" />
      <link rel="stylesheet" href={`/styles.css?v=${rev}`} precedence="site" />
      {page.detectLanguage && (
        <script dangerouslySetInnerHTML={{ __html: detectLanguageScript }} />
      )}
      <script dangerouslySetInnerHTML={{ __html: preferencesScript }} />
      <script type="module" src={`/js/panel.js?v=${rev}`} />
      <script type="module" src={`/js/theme.js?v=${rev}`} />

      <a className="skip-link" href={isHome ? "#figure" : "#panel"}>
        {t.skip_to_content}
      </a>

      <div className="page">
        <header className="masthead">
          <div>
            {isHome
              ? <h1 className="name">{site.name}</h1>
              : (
                <p className="name">
                  <a href={homeUrl}>{site.name}</a>
                </p>
              )}
            <p className="tagline">{home.tagline[lang]}</p>
          </div>
          <div className="controls">
            <label className="scheme" hidden>
              <span className="visually-hidden">{t.theme}</span>
              <select
                data-default-light={allThemes.find((x) => !x.dark)!.id}
                data-default-dark={allThemes.find((x) => x.dark)!.id}
              >
                {(themes as ThemeFamily[]).map((family) =>
                  family.themes.length > 1
                    ? (
                      <optgroup key={family.family} label={family.family}>
                        {family.themes.map((theme) => (
                          <option key={theme.id} value={theme.id}>
                            {theme.name}
                          </option>
                        ))}
                      </optgroup>
                    )
                    : (
                      <option
                        key={family.themes[0].id}
                        value={family.themes[0].id}
                      >
                        {family.themes[0].name}
                      </option>
                    )
                )}
              </select>
            </label>
            <label className="latin" hidden>
              <span className="visually-hidden">{t.latin_font}</span>
              <select>
                {site.latin_fonts.map((group: any) => (
                  <optgroup
                    key={group.group.en}
                    label={group.group[lang]}
                    data-sans={group.sans ? "" : undefined}
                  >
                    {group.fonts.map((font: any) => (
                      <option key={font.id} value={font.id}>{font.name}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </label>
            {/* Chinese pages can also choose the Chinese face. */}
            {lang === "zh" && (
              <label className="cjk" hidden>
                <span className="visually-hidden">{t.cjk_font}</span>
                <select>
                  <option value="serif">{t.cjk_serif}</option>
                  <option value="sans" data-sans="">{t.cjk_sans}</option>
                  <option value="rounded" data-sans="">{t.cjk_rounded}</option>
                  <option value="wenkai">{t.cjk_kai}</option>
                </select>
              </label>
            )}
            {/* The language link names the language it switches to. */}
            {lang === "zh"
              ? (
                <a
                  className="langswitch"
                  lang="en"
                  hrefLang="en"
                  data-no-panel=""
                  href={altUrl || switchUrl || "/"}
                >
                  en
                </a>
              )
              : (
                <a
                  className="langswitch"
                  lang="zh-CN"
                  hrefLang="zh-Hans"
                  data-no-panel=""
                  href={altUrl || switchUrl || "/zh/"}
                >
                  中文
                </a>
              )}
          </div>
        </header>

        <main id="figure" tabIndex={-1}>
          <Figure lang={lang} section={section} />
        </main>

        <footer className="colophon">
          <p>
            <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
            {" "}
            <a href={site.contact.github}>GitHub</a>
          </p>
          <p>
            {site.footer.copyright}
            {site.footer.links.map((link: any) => (
              <Fragment key={link.label}>
                {" "}
                <a
                  href={typeof link.href === "string"
                    ? link.href
                    : link.href[lang]}
                >
                  {link.label}
                </a>
              </Fragment>
            ))}
          </p>
        </footer>
      </div>

      {
        /* Every page other than the home page is this panel, already open in
          the static HTML. panel.js upgrades it to a modal dialog and swaps its
          content when a label in the figure is followed. */
      }
      <dialog
        id="panel"
        className="panel"
        aria-labelledby="panel-title"
        open={!isHome}
      >
        <a
          className="panel-close"
          href={homeUrl}
          aria-label={t.close}
          title={t.close}
        >
          <span aria-hidden="true">×</span>
        </a>
        <article
          id="panel-content"
          tabIndex={-1}
          data-section={section}
          data-title={fullTitle(title)}
        >
          {!isHome && children}
        </article>
      </dialog>
    </>
  );
}
