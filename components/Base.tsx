import { Fragment, type ReactNode } from "react";
import {
  absolute,
  home,
  type Lang,
  rev,
  site,
  themePairs,
  themes,
  ui,
} from "../lib/site";
import { inlineScript } from "../lib/inline";
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

export function fullTitle(title: string) {
  return title === site.name ? title : `${title} · ${site.name}`;
}

/** The page: head metadata, masthead, the figure, footer, and the panel. */
export default async function Base(
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
        <script
          dangerouslySetInnerHTML={{
            __html: await inlineScript("detect-language"),
          }}
        />
      )}
      <script
        dangerouslySetInnerHTML={{
          __html: await inlineScript("preferences", {
            THEME_PAIRS: themePairs,
          }),
        }}
      />
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
                data-default-light={themes.find((x) => !x.dark)!.id}
                data-default-dark={themes.find((x) => x.dark)!.id}
              >
                {themes.map((theme) => (
                  <option key={theme.id} value={theme.id}>
                    {theme.name[lang]}
                  </option>
                ))}
              </select>
            </label>
            <label className="latin" hidden>
              <span className="visually-hidden">{t.latin_font}</span>
              <select>
                {site.latin_fonts.map((group) => (
                  <optgroup
                    key={group.group.en}
                    label={group.group[lang]}
                    data-sans={group.sans ? "" : undefined}
                  >
                    {group.fonts.map((font) => (
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
            {site.footer.links.map((link) => (
              <Fragment key={link.label}>
                {" "}
                <a
                  href={typeof link.href === "string"
                    ? link.href
                    : link.href[lang]}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener" : undefined}
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
