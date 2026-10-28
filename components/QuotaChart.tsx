// The chart under the subscription table: each model's AA score against the
// share of its plan's monthly allowance one AA task uses, through every
// reasoning setting AA has run. quota-chart.js draws it from data-chart and
// wires the controls rendered here; without JS, the table below stands in.
import {
  aiSubscriptions as study,
  type Effort,
  type Lang,
  type PlanId,
} from "../lib/site";
import { entry, number, percent, values } from "./study";

const efforts: Effort[] = ["none", "low", "medium", "high", "xhigh", "max"];
/** Off until chosen: non-reasoning modes cost more than low effort for less. */
const hiddenEfforts: Effort[] = ["none"];

export default function QuotaChart({ lang }: { lang: Lang }) {
  const copy = study.copy[lang];
  const plans = Object.entries(study.plans) as [
    PlanId,
    (typeof study.plans)[PlanId],
  ][];
  const data = {
    plans: Object.fromEntries(
      plans.map(([id, plan]) => [id, { api: plan.api, timing: plan.timing }]),
    ),
    lines: study.lines.map(({ id, name, plan, levels }) => ({
      id,
      name,
      plan,
      levels: levels.map(({ effort, score, cost }) => ({
        effort,
        score,
        cost,
      })),
    })),
    hidden: hiddenEfforts,
    copy: {
      x: copy.chart_x,
      y: copy.chart_y,
      score: copy.score,
      quota: copy.chart_quota,
      cost: copy.chart_cost,
      tasks: copy.chart_tasks,
      empty: copy.chart_empty,
    },
  };

  return (
    <>
      <section
        className="quota-chart"
        aria-labelledby="quota-chart-title"
        data-quota-chart=""
        data-chart={JSON.stringify(data)}
        hidden
      >
        <div className="quota-chart-head">
          <h3 id="quota-chart-title">{copy.chart_title}</h3>
          <div className="quota-chart-options">
            <label>
              <input type="checkbox" data-chart-frontier="" />
              {copy.chart_frontier}
            </label>
            <div
              className="quota-chart-switch"
              role="group"
              aria-label={copy.chart_scale}
            >
              <button
                type="button"
                data-chart-scale="linear"
                aria-pressed="false"
              >
                {copy.chart_linear}
              </button>
              <button type="button" data-chart-scale="log" aria-pressed="true">
                {copy.chart_log}
              </button>
            </div>
          </div>
        </div>
        <p className="study-reading-note">{copy.chart_note}</p>
        <div className="quota-chart-body">
          <div className="quota-chart-plot" data-chart-plot="" />
          <div className="quota-chart-panel">
            <div
              className="quota-chart-efforts"
              role="group"
              aria-labelledby="quota-chart-reasoning"
            >
              <h4 id="quota-chart-reasoning">{copy.chart_reasoning}</h4>
              {efforts.map((effort) => (
                <button
                  type="button"
                  key={effort}
                  data-chart-effort={effort}
                  aria-pressed={!hiddenEfforts.includes(effort)}
                >
                  {effort}
                </button>
              ))}
            </div>
            <div className="quota-chart-models">
              <div className="quota-chart-models-head">
                <h4>{copy.chart_models}</h4>
                <button type="button" data-chart-reset="">
                  {copy.chart_reset}
                </button>
              </div>
              {plans.map(([id, plan]) => (
                <div className="quota-chart-plan" key={id}>
                  <button
                    type="button"
                    className="quota-chart-plan-name"
                    data-chart-plan={id}
                    aria-pressed="true"
                  >
                    {plan.name[lang]}
                  </button>
                  <ul>
                    {study.lines.filter((line) =>
                      line.plan === id
                    ).map((
                      line,
                    ) => (
                      <li key={line.id}>
                        <button
                          type="button"
                          data-chart-line={line.id}
                          data-plan={id}
                          aria-pressed="true"
                        >
                          <span
                            className="quota-chart-key"
                            aria-hidden="true"
                          />
                          {line.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <details className="study-method quota-chart-table">
        <summary>{copy.chart_table}</summary>
        <div
          className="table-scroll study-comparison"
          tabIndex={0}
          role="region"
          aria-label={copy.chart_table}
        >
          <table>
            <thead>
              <tr>
                <th scope="col">{copy.plan_model}</th>
                <th scope="col">{copy.chart_effort}</th>
                <th scope="col">{copy.score}</th>
                <th scope="col">{copy.cost_task}</th>
                <th scope="col">{copy.chart_quota_task}</th>
                <th scope="col">{copy.tasks}</th>
              </tr>
            </thead>
            <tbody>
              {study.lines.flatMap((line) =>
                line.levels.map((level) => {
                  const row = entry(line, level);
                  const tasks = row.plan.api / level.cost;
                  return (
                    <tr
                      key={row.label}
                      {...(row.plan.timing ? values(row) : {})}
                    >
                      <th scope="row">
                        <span className="study-plan">
                          {row.plan.name[lang]}
                        </span>
                        <a href={line.url}>{line.name}</a>
                      </th>
                      <td>{level.effort ?? "—"}</td>
                      <td>{number(level.score, 1)}</td>
                      <td>${number(level.cost, level.cost < 0.1 ? 3 : 2)}</td>
                      <td data-value="quota">{percent(100 / tasks)}</td>
                      <td className="study-result" data-value="tasks">
                        {number(tasks)}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </details>
    </>
  );
}
