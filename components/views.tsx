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
import type { ReactNode } from "react";
import { Symbol } from "./Figure";
import SubscriptionStudy from "./SubscriptionStudy";

/** A panel's title, with the figure's name for the page hung in the margin. */
function Title({ id, children }: {
  id: "about" | "seminars" | "travel" | "now" | "uses";
  children: ReactNode;
}) {
  return (
    <h1 id="panel-title">
      <Symbol symbol={site.pages[id].symbol} />
      {children}
    </h1>
  );
}

/** Markup from the data files, which already holds HTML. */
const html = (__html: string) => ({ dangerouslySetInnerHTML: { __html } });

export function About({ lang }: { lang: Lang }) {
  const t = ui[lang];
  return (
    <>
      <header className="panel-head">
        <Title id="about">{home.about.title[lang]}</Title>
      </header>

      <div className="with-side">
        <div
          className="prose"
          {...html(`<p>${home.bio[lang]}</p>${home.about.body[lang]}`)}
        />
        <aside className="side">
          <img
            className="portrait"
            src="/images/me.webp"
            alt={t.portrait_alt}
            width="800"
            height="800"
            decoding="async"
          />
          <Contact lang={lang} />
        </aside>
      </div>
    </>
  );
}

function Contact({ lang }: { lang: Lang }) {
  const t = ui[lang];
  return (
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
  );
}

export function Now({ lang }: { lang: Lang }) {
  const t = ui[lang];
  return (
    <>
      <header className="panel-head">
        <Title id="now">{t.now}</Title>
        <p className="lede">{t.now_lede}</p>
        <p className="panel-date">
          {t.updated} {formatDate(`${home.now.updated}-01`, lang, true)}
        </p>
      </header>
      {home.now.groups.map((group) => (
        <section className="now-group" key={group.title.en}>
          <h2>{group.title[lang]}</h2>
          <ul className="now-list">
            {group.items[lang].map((item) => <li key={item}>{item}</li>)}
          </ul>
        </section>
      ))}
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
        <Title id="seminars">{t.seminars}</Title>
        <p className="lede">{t.seminars_lede}</p>
      </header>
      <ul className="entries timeline">
        {(await seminars()).map((s) => {
          const title = zh && s.title_zh ? s.title_zh : s.title;
          const description = zh && s.description_zh
            ? s.description_zh
            : s.description;
          // Some descriptions only restate the title.
          const echo = description.replace(/[.。]$/, "").toLowerCase() ===
            title.toLowerCase();
          return (
            <li className="entry" key={s.slug}>
              <p className="entry-when">{formatDate(s.pubDate, lang)}</p>
              <div>
                <h2 className="entry-title">
                  <a href={s.url}>{title}</a>
                </h2>
                {!echo && <p className="entry-body">{description}</p>}
                {s.coOrganizers.length > 0 && (
                  <p className="entry-where">
                    {t.organized_with}
                    {zh ? "" : " "}
                    {s.coOrganizers.join(zh ? "、" : ", ")}
                  </p>
                )}
              </div>
            </li>
          );
        })}
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
        <Title id="seminars">{seminar.title}</Title>
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
        <Title id="travel">{t.title}</Title>
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
        <div className="atlas-places">
          <p className="atlas-count">
            {t.count.replace("{n}", String(travel.places.length))}
          </p>
          <ul>
            {travel.places.map((place) => (
              <li key={place.id}>
                <button
                  type="button"
                  data-lat={place.lat}
                  data-lon={place.lon}
                  disabled
                >
                  {place.name[lang]}
                </button>
              </li>
            ))}
          </ul>
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
        <Title id="uses">{t.uses}</Title>
        <p className="lede">{t.uses_lede}</p>
        <nav className="contents" aria-label={t.index}>
          {uses.map((category) => (
            <a key={category.id} href={`#uses-${category.id}-heading`}>
              {category.title[lang]}
            </a>
          ))}
        </nav>
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
