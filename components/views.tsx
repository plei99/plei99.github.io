// The panel bodies, shared between the English and Chinese pages.
import {
  formatDate,
  home,
  type Lang,
  md,
  mdInline,
  rev,
  scrollTables,
  type Seminar,
  seminars,
  site,
  travel,
  ui,
  uses,
} from "../lib/site";
import SubscriptionStudy from "./SubscriptionStudy";

/** Markup from the data files, which already holds HTML. */
const html = (__html: string) => ({ dangerouslySetInnerHTML: { __html } });

export function About({ lang }: { lang: Lang }) {
  const t = ui[lang];
  return (
    <>
      <header className="panel-head panel-head--portrait">
        <div>
          <h1 id="panel-title">{home.about.title[lang]}</h1>
        </div>
        <img
          className="portrait"
          src="/images/me.webp"
          alt={t.portrait_alt}
          width="800"
          height="800"
          decoding="async"
        />
      </header>

      <div
        className="prose"
        {...html(`<p>${home.bio[lang]}</p>${home.about.body[lang]}`)}
      />

      <section className="contact" aria-labelledby="contact-heading">
        <h2 id="contact-heading">{t.contact}</h2>
        <ul>
          <li>
            <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
          </li>
          <li>
            <a href={site.contact.github}>GitHub</a>
          </li>
          <li>
            <a href={site.contact.arxiv}>arXiv</a>
          </li>
          <li>
            <a href={site.pages.cv.href[lang]} rel="noopener">{t.cv} (PDF)</a>
          </li>
        </ul>
      </section>
    </>
  );
}

export function Now({ lang }: { lang: Lang }) {
  const t = ui[lang];
  return (
    <>
      <header className="panel-head">
        <h1 id="panel-title">{t.now}</h1>
        <p className="lede">{t.now_lede}</p>
      </header>
      <ul className="now-list">
        {home.now[lang].map((item: string) => <li key={item}>{item}</li>)}
      </ul>
      <p className="aside">
        <a href="https://sive.rs/now">{t.now_what}</a>
      </p>
    </>
  );
}

export async function Seminars({ lang }: { lang: Lang }) {
  const t = ui[lang];
  const zh = lang === "zh";
  return (
    <>
      <header className="panel-head">
        <h1 id="panel-title">{t.seminars}</h1>
        <p className="lede">{t.seminars_lede}</p>
      </header>
      <ul className="entries">
        {(await seminars()).map((s) => (
          <li className="entry" key={s.slug}>
            <p className="entry-when">{formatDate(s.pubDate, lang)}</p>
            <div>
              <h2 className="entry-title">
                <a href={s.url}>{zh && s.title_zh ? s.title_zh : s.title}</a>
              </h2>
              <p className="entry-body">
                {zh && s.description_zh ? s.description_zh : s.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

export function SeminarPage({ seminar }: { seminar: Seminar }) {
  return (
    <>
      <header className="panel-head">
        <p className="panel-back">
          <a href="/seminars/">{ui.en.back_to_seminars}</a>
        </p>
        <h1 id="panel-title">{seminar.title}</h1>
        <p className="lede">
          {formatDate(seminar.pubDate, "en", true)}. {seminar.description}
        </p>
      </header>
      <div
        className="prose prose--wide"
        {...html(scrollTables(md(seminar.body)))}
      />
    </>
  );
}

export function Travel({ lang }: { lang: Lang }) {
  const t = travel[lang];
  return (
    <>
      <header className="panel-head">
        <h1 id="panel-title">{t.title}</h1>
      </header>
      <section className="atlas" aria-label={ui[lang].travel}>
        <div className="atlas-stage">
          <div
            id="globe-container"
            role="group"
            aria-label={t.globe_label}
            data-fallback-label={t.flat}
            data-visited={travel.places.map((place: { feature: string }) =>
              place.feature
            ).join("|")}
          >
            <img
              className="atlas-fallback"
              src="/images/travel-globe.svg"
              alt={t.globe_label}
              width="800"
              height="800"
            />
          </div>
          <div className="atlas-controls" aria-label={t.controls}>
            <button
              type="button"
              id="globe-zoom-in"
              aria-label={t.zoom_in}
              title={t.zoom_in}
              disabled
            >
              +
            </button>
            <button
              type="button"
              id="globe-zoom-out"
              aria-label={t.zoom_out}
              title={t.zoom_out}
              disabled
            >
              −
            </button>
            <button
              type="button"
              id="globe-reset"
              aria-label={t.reset}
              title={t.reset}
              disabled
            >
              ↺
            </button>
            <button
              id="globe-motion-toggle"
              className="globe-motion-toggle"
              type="button"
              aria-pressed="false"
              aria-label={t.play}
              title={t.play}
              data-start-label={t.play}
              data-pause-label={t.pause}
              disabled
            >
              <span className="atlas-motion-icon" aria-hidden="true" />
            </button>
          </div>
          <span id="globe-keyboard-help" className="visually-hidden">
            {t.keyboard}
          </span>
          <span id="globe-status" className="visually-hidden" role="status" />
        </div>
      </section>
      <script type="module" src={`/js/globe.js?v=${rev}`} />
    </>
  );
}

export function Uses({ lang }: { lang: Lang }) {
  const t = ui[lang];
  return (
    <>
      <header className="panel-head">
        <h1 id="panel-title">{t.uses}</h1>
        <p className="lede">{t.uses_lede}</p>
      </header>
      {uses.map((category) => (
        <section
          className="uses-group"
          key={category.id}
          aria-labelledby={`uses-${category.id}-heading`}
        >
          <h2 id={`uses-${category.id}-heading`}>{category.title[lang]}</h2>
          {category.body && (
            <div className="prose" {...html(md(category.body[lang]))} />
          )}
          <ul className="entries">
            {category.items.map((item) => (
              <li className="entry" key={item.name}>
                <p className="entry-when">{item.kind[lang]}</p>
                <div>
                  <h3 className="entry-title">
                    {item.url ? <a href={item.url}>{item.name}</a> : item.name}
                  </h3>
                  <p
                    className="entry-body"
                    {...html(mdInline(item.note[lang]))}
                  />
                  {item.study && <SubscriptionStudy lang={lang} />}
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
      <p className="aside">
        <a href="https://uses.tech/">{t.uses_what}</a>
      </p>
      <script type="module" src={`/js/uses.js?v=${rev}`} />
    </>
  );
}
