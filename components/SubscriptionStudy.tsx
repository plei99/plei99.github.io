// The AI subscription comparison that opens over the Uses panel. uses.js reads
// the data-* attributes to adjust the timed rows live.
import { aiSubscriptions as study, type Lang, mdInline } from "../lib/site";

const number = (value: number, digits = 0) =>
  value.toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });

type Row = {
  model: string;
  url: string;
  plan: Record<Lang, string>;
  price: number;
  score: number;
  api: number;
  cost: number;
  time_seconds: number;
  time_url: string;
  timing?: string;
};
type Timing = {
  label: Record<Lang, string>;
  window: Record<Lang, string>;
  share: Record<Lang, string>;
  default: number;
  window_coefficient: number;
  other_coefficient: number;
};

/** The data attributes uses.js recomputes a timed row from. */
const values = (row: Row) => ({
  "data-study-values": row.timing,
  "data-api": row.api,
  "data-cost": row.cost,
  "data-price": row.price,
});

export default function SubscriptionStudy({ lang }: { lang: Lang }) {
  const copy = study.copy[lang];
  const rows: Row[] = study.rows;
  const timings = Object.entries(study.timing as Record<string, Timing>);
  const notes = (study.notes as Record<Lang, string>[]).map((note) =>
    note[lang].trim()
  ).filter(Boolean);

  return (
    <details className="uses-study" id="ai-subscriptions" data-uses-study="">
      <summary>{copy.trigger}</summary>
      <div
        className="study-content"
        data-study-content=""
        lang={lang === "zh" ? "zh-CN" : "en"}
      >
        <button
          className="study-close"
          type="button"
          data-study-close=""
          hidden
          aria-label={copy.close}
          title={copy.close}
        >
          <span aria-hidden="true">×</span>
        </button>
        <header className="study-head">
          <p className="study-date">{copy.date}</p>
          <h2 id="subscription-study-title" tabIndex={-1}>{copy.title}</h2>
          <p>{copy.intro}</p>
        </header>
        <div className="study-main">
          <p className="study-reading-note">{copy.reading_note}</p>
          <form
            className="study-timing"
            data-study-timing=""
            hidden
            aria-labelledby="study-timing-title"
          >
            <div className="study-timing-head">
              <h3 id="study-timing-title">{copy.timing_heading}</h3>
              <button type="reset">{copy.reset}</button>
            </div>
            <p className="study-reading-note">{copy.timing_note}</p>
            <div className="study-timing-grid">
              {timings.map(([id, timing]) => (
                <div className="study-timing-control" key={id}>
                  <label htmlFor={`study-${id}-share`}>
                    {timing.label[lang]}
                  </label>
                  <p id={`study-${id}-window`} className="study-timing-window">
                    {timing.window[lang]}
                  </p>
                  <input
                    type="range"
                    id={`study-${id}-share`}
                    name={id}
                    min="0"
                    max="100"
                    step="1"
                    defaultValue={timing.default}
                    data-window-coefficient={timing.window_coefficient}
                    data-other-coefficient={timing.other_coefficient}
                    data-share-label={timing.share[lang]}
                    aria-describedby={`study-${id}-window`}
                  />
                  <output htmlFor={`study-${id}-share`} data-share-output={id}>
                    {timing.share[lang]
                      .replace("{share}", String(timing.default))
                      .replace("{other}", String(100 - timing.default))}
                  </output>
                  {rows.filter((row) =>
                    row.timing === id
                  ).map((row) => (
                    <p
                      className="study-timing-result"
                      key={row.model}
                      {...values(row)}
                      dangerouslySetInnerHTML={{
                        __html:
                          `<span class="study-preview-model">${
                            Bun.escapeHTML(row.model)
                          }</span> ` +
                          copy.preview
                            .replace(
                              "{api}",
                              `<span data-value="api">$${
                                number(row.api, 2)
                              }</span>`,
                            )
                            .replace(
                              "{tasks}",
                              `<strong data-value="tasks">${
                                number(row.api / row.cost)
                              }</strong>`,
                            ),
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>
            <p className="study-reading-note study-timing-limits">
              {copy.timing_limits}
            </p>
          </form>
          <p className="study-scroll-hint">{copy.scroll_hint}</p>
          <div
            className="table-scroll study-comparison"
            tabIndex={0}
            role="region"
            aria-labelledby="subscription-study-title"
          >
            <table>
              <thead>
                <tr>
                  <th scope="col">{copy.plan_model}</th>
                  <th scope="col">{copy.price}</th>
                  <th scope="col">{copy.score}</th>
                  <th scope="col">{copy.api_value}</th>
                  <th scope="col">{copy.cost_task}</th>
                  <th scope="col">{copy.time_task}</th>
                  <th scope="col">{copy.tasks}</th>
                  <th scope="col">{copy.per_100}</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr
                    key={row.model + row.plan.en}
                    {...(row.timing ? values(row) : {})}
                  >
                    <th scope="row">
                      <span className="study-plan">{row.plan[lang]}</span>
                      <a href={row.url}>{row.model}</a>
                    </th>
                    <td>${number(row.price)}</td>
                    <td>{row.score}</td>
                    <td data-value="api">${number(row.api, 2)}</td>
                    <td>${number(row.cost, 2)}</td>
                    <td className="study-task-time">
                      <a
                        href={row.time_url}
                        title={`${number(row.time_seconds, 2)} ${copy.seconds}`}
                      >
                        {number(row.time_seconds / 60, 1)} {copy.minutes}
                      </a>
                    </td>
                    <td className="study-result" data-value="tasks">
                      {number(row.api / row.cost)}
                    </td>
                    <td data-value="per100">
                      {number((row.api / row.cost) * 100 / row.price)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {notes.length > 0 && (
            <details className="study-method">
              <summary>{copy.notes}</summary>
              <div className="prose prose--wide">
                <ul>
                  {notes.map((note) => (
                    <li
                      key={note}
                      dangerouslySetInnerHTML={{ __html: mdInline(note) }}
                    />
                  ))}
                </ul>
              </div>
            </details>
          )}
          <p className="study-endnote">{copy.endnote}</p>
        </div>
      </div>
    </details>
  );
}
