// Draws the quota chart in the AI subscription comparison: each model's AA
// score against the share of its plan's monthly allowance one AA task uses,
// one line per model through its reasoning settings. QuotaChart.tsx renders
// the controls and the data; this draws the SVG and keeps it in step with
// them and with the timing sliders, through setFactor.
import { query } from "./dom.js";

type Level = { effort?: string; score: number; cost: number };
type Line = { id: string; name: string; plan: string; levels: Level[] };
type ChartData = {
  plans: Record<string, { api: number; timing?: string }>;
  lines: Line[];
  hidden: string[];
  copy: Record<
    "x" | "y" | "score" | "quota" | "cost" | "tasks" | "empty",
    string
  >;
};
type Point = {
  line: Line;
  level: Level;
  /** Percent of the monthly quota one task uses. */
  share: number;
  x: number;
  y: number;
};

export type QuotaChart = { setFactor(timing: string, factor: number): void };

const SVG = "http://www.w3.org/2000/svg";

function svg<K extends keyof SVGElementTagNameMap>(
  tag: K,
  attributes: Record<string, string | number>,
  parent: Element,
): SVGElementTagNameMap[K] {
  const node = document.createElementNS(SVG, tag);
  for (const [name, value] of Object.entries(attributes)) {
    node.setAttribute(name, String(value));
  }
  parent.append(node);
  return node;
}

/** Two significant figures: the shares run from 0.0004% to 2%. */
export const percent = (value: number) =>
  `${value.toLocaleString("en-US", { maximumSignificantDigits: 2 })}%`;

const dollars = (value: number) =>
  `$${
    value.toLocaleString("en-US", {
      minimumFractionDigits: value < 0.1 ? 3 : 2,
      maximumFractionDigits: value < 0.1 ? 3 : 2,
    })
  }`;

/** Powers of ten in [lo, hi], with 2 and 5 times them, or else 3 times
 * them, where a label fits at least gap pixels from its neighbours. */
function logTicks(lo: number, hi: number, x: (v: number) => number, gap = 52) {
  const range = (steps: number[]) => {
    const out: number[] = [];
    const first = Math.floor(Math.log10(lo));
    for (let power = first; power <= Math.ceil(Math.log10(hi)); power++) {
      for (const step of steps) {
        const tick = step * 10 ** power;
        if (tick >= lo && tick <= hi) out.push(tick);
      }
    }
    return out;
  };
  const ticks = range([1]);
  const fits = (tick: number) =>
    ticks.every((kept) => Math.abs(x(kept) - x(tick)) >= gap);
  const between = range([2, 5]);
  for (const tick of between.every(fits) ? between : range([3])) {
    if (fits(tick)) ticks.push(tick);
  }
  return ticks.sort((a, b) => a - b);
}

/** A round step from 1, 2 or 5 times a power of ten, about count to [0, hi]. */
function linearStep(hi: number, count: number) {
  const raw = hi / count;
  const power = 10 ** Math.floor(Math.log10(raw));
  return [1, 2, 5, 10].map((m) => m * power).find((s) => s >= raw)!;
}

/** Spread labels at least gap apart, keeping each near its wanted y. */
function spread(wanted: number[], gap: number, top: number, bottom: number) {
  const order = wanted.map((y, i) => [y, i] as const).sort((a, b) =>
    a[0] - b[0]
  );
  const placed = order.map(([y]) => Math.max(top, Math.min(bottom, y)));
  for (let i = 1; i < placed.length; i++) {
    placed[i] = Math.max(placed[i]!, placed[i - 1]! + gap);
  }
  if (placed.length && placed.at(-1)! > bottom) {
    placed[placed.length - 1] = bottom;
    for (let i = placed.length - 2; i >= 0; i--) {
      placed[i] = Math.min(placed[i]!, placed[i + 1]! - gap);
    }
  }
  const result: number[] = [];
  order.forEach(([, index], i) => (result[index] = placed[i]!));
  return result;
}

/** Fill a "{value}" template, with the value as the strong element. */
function fill(parent: HTMLElement, template: string, value: string) {
  const p = document.createElement("p");
  const [before = "", after = ""] = template.split("{value}");
  const strong = document.createElement("strong");
  strong.textContent = value;
  p.append(before, strong, after);
  parent.append(p);
}

export function quotaChart(
  root: HTMLElement,
  signal: AbortSignal,
): QuotaChart {
  const data = JSON.parse(root.dataset.chart ?? "") as ChartData;
  const { copy } = data;
  const plot = query("[data-chart-plot]", HTMLElement, root);
  const frontier = query("[data-chart-frontier]", HTMLInputElement, root);
  const scaleButtons = [
    ...root.querySelectorAll<HTMLButtonElement>("[data-chart-scale]"),
  ];
  const effortButtons = [
    ...root.querySelectorAll<HTMLButtonElement>("[data-chart-effort]"),
  ];
  const lineButtons = [
    ...root.querySelectorAll<HTMLButtonElement>("[data-chart-line]"),
  ];
  const planButtons = [
    ...root.querySelectorAll<HTMLButtonElement>("[data-chart-plan]"),
  ];
  const options = { signal };

  const hiddenLines = new Set<string>();
  const hiddenEfforts = new Set(data.hidden);
  const factors = new Map<string, number>();
  let scale: "log" | "linear" = "log";
  let focused: string | null = null;

  const chart = svg("svg", { class: "quota-chart-svg" }, plot);
  chart.setAttribute("role", "group");
  chart.setAttribute("aria-labelledby", "quota-chart-title");
  const tip = document.createElement("div");
  tip.className = "quota-chart-tip";
  tip.hidden = true;
  plot.append(tip);

  const api = (line: Line) => {
    const plan = data.plans[line.plan]!;
    return plan.api * (plan.timing ? factors.get(plan.timing) ?? 1 : 1);
  };
  const visible = (level: Level) =>
    !level.effort || !hiddenEfforts.has(level.effort);

  const focusLine = (id: string | null) => {
    focused = id;
    if (id) chart.dataset.focus = id;
    else delete chart.dataset.focus;
    for (const node of chart.querySelectorAll<SVGElement>("[data-line]")) {
      node.classList.toggle("is-focus", node.dataset.line === id);
    }
  };

  const showTip = (point: Point, width: number) => {
    tip.replaceChildren();
    const name = document.createElement("p");
    name.className = "quota-chart-tip-name";
    const key = document.createElement("span");
    key.className = "quota-chart-key";
    key.dataset.plan = point.line.plan;
    name.append(
      key,
      point.level.effort
        ? `${point.line.name} · ${point.level.effort}`
        : point.line.name,
    );
    tip.append(name);
    fill(tip, copy.quota, percent(point.share));
    fill(tip, `${copy.score} {value}`, point.level.score.toFixed(1));
    fill(tip, copy.cost, dollars(point.level.cost));
    fill(
      tip,
      copy.tasks,
      Math.round(100 / point.share).toLocaleString("en-US"),
    );
    tip.hidden = false;
    // Beside the point where a side has room, else above or below it, and
    // never past an edge.
    const [w, h] = [tip.offsetWidth, tip.offsetHeight];
    const right = point.x + 14 + w <= width;
    const left = point.x - 14 - w >= 0;
    let x = right ? point.x + 14 : point.x - 14 - w;
    let y = point.y - h / 2;
    if (!right && !left) {
      x = point.x - w / 2;
      y = point.y - h - 16 >= 0 ? point.y - h - 16 : point.y + 16;
    }
    tip.style.left = `${Math.max(0, Math.min(x, width - w))}px`;
    tip.style.top = `${Math.max(0, y)}px`;
  };
  const hideTip = () => {
    tip.hidden = true;
  };

  function render() {
    const width = plot.clientWidth;
    if (!width) return;
    chart.replaceChildren();
    hideTip();

    const narrow = width < 560;
    const height = Math.round(Math.min(540, Math.max(320, width * 0.62)));
    const labelWidth = narrow ? 0 : Math.min(150, width * 0.22);
    const margin = {
      top: 30,
      right: labelWidth + 16,
      bottom: 52,
      left: 44,
    };
    const inner = {
      left: margin.left,
      right: width - margin.right,
      top: margin.top,
      bottom: height - margin.bottom,
    };
    chart.setAttribute("viewBox", `0 0 ${width} ${height}`);
    chart.setAttribute("width", String(width));
    chart.setAttribute("height", String(height));

    const shown = data.lines.filter((line) => !hiddenLines.has(line.id));
    const points = shown.flatMap((line) =>
      line.levels.filter(visible).map((level) => ({
        line,
        level,
        share: level.cost / api(line) * 100,
        x: 0,
        y: 0,
      }))
    );

    // Axes. The score axis starts at zero and ends on the next ten.
    const topScore = Math.max(
      10,
      Math.ceil(Math.max(0, ...points.map((p) => p.level.score)) / 10) * 10,
    );
    const yOf = (score: number) =>
      inner.bottom - score / topScore * (inner.bottom - inner.top);
    const shares = points.map((p) => p.share);
    let xOf: (share: number) => number;
    let ticks: number[];
    if (scale === "log") {
      let lo = Math.min(...shares, Infinity) / 1.5;
      let hi = Math.max(...shares, -Infinity) * 1.5;
      if (!points.length) [lo, hi] = [0.001, 1];
      const span = Math.log10(hi / lo);
      xOf = (share) =>
        inner.left +
        Math.log10(share / lo) / span * (inner.right - inner.left);
      ticks = logTicks(lo, hi, xOf);
    } else {
      const raw = points.length ? Math.max(...shares) : 1;
      const step = linearStep(raw, narrow ? 4 : 6);
      const hi = Math.ceil(raw * 1.04 / step) * step;
      xOf = (share) => inner.left + share / hi * (inner.right - inner.left);
      ticks = Array.from(
        { length: Math.round(hi / step) + 1 },
        (_, i) => i * step,
      );
    }
    for (const point of points) {
      point.x = xOf(point.share);
      point.y = yOf(point.level.score);
    }

    const axes = svg("g", { class: "quota-chart-axes" }, chart);
    for (let score = 0; score <= topScore; score += 10) {
      const y = yOf(score);
      svg("line", {
        class: score ? "quota-chart-grid" : "quota-chart-baseline",
        x1: inner.left,
        x2: inner.right,
        y1: y,
        y2: y,
      }, axes);
      svg(
        "text",
        { x: inner.left - 8, y, "text-anchor": "end", dy: "0.32em" },
        axes,
      )
        .textContent = String(score);
    }
    for (const tick of ticks) {
      const x = xOf(tick);
      svg("line", {
        class: "quota-chart-tick",
        x1: x,
        x2: x,
        y1: inner.bottom,
        y2: inner.bottom + 5,
      }, axes);
      svg("text", {
        x,
        y: inner.bottom + 20,
        "text-anchor": "middle",
      }, axes).textContent = percent(tick);
    }
    svg("text", {
      class: "quota-chart-title",
      x: inner.left - 32,
      y: 14,
    }, axes).textContent = copy.y;
    svg("text", {
      class: "quota-chart-title",
      x: (inner.left + inner.right) / 2,
      y: height - 8,
      "text-anchor": "middle",
    }, axes).textContent = copy.x;

    if (!points.length) {
      svg("text", {
        class: "quota-chart-empty",
        x: (inner.left + inner.right) / 2,
        y: (inner.top + inner.bottom) / 2,
        "text-anchor": "middle",
      }, chart).textContent = copy.empty;
      return;
    }

    // End labels sit in a column to the right, joined to each line's last
    // point by a leader, and are spread so they never overlap.
    const ends = shown.map((line) => points.filter((p) => p.line === line))
      .filter((own) => own.length).map((own) => own.at(-1)!);
    const labelY = spread(
      ends.map((p) => p.y),
      17,
      inner.top,
      inner.bottom,
    );
    if (labelWidth) {
      const labels = svg("g", { class: "quota-chart-labels" }, chart);
      ends.forEach((end, i) => {
        const group = svg("g", {
          class: "quota-chart-label",
          "data-line": end.line.id,
          "data-plan": end.line.plan,
        }, labels);
        const x = inner.right + 14;
        svg("polyline", {
          points: `${end.x + 6},${end.y} ${x - 4},${labelY[i]}`,
        }, group);
        svg("text", { x, y: labelY[i]!, dy: "0.32em" }, group).textContent =
          end.line.name;
        group.addEventListener("pointerenter", () => focusLine(end.line.id));
        group.addEventListener("pointerleave", () => focusLine(null));
      });
    }

    for (const line of shown) {
      const own = points.filter((p) => p.line === line);
      if (!own.length) continue;
      const group = svg("g", {
        class: "quota-chart-line",
        "data-line": line.id,
        "data-plan": line.plan,
      }, chart);
      if (own.length > 1) {
        const d = own.map((p, i) => `${i ? "L" : "M"}${p.x},${p.y}`).join("");
        svg("path", { class: "quota-chart-path", d }, group);
        svg("path", { class: "quota-chart-hit", d }, group);
      }
      for (const point of own) {
        svg("circle", {
          class: "quota-chart-dot",
          cx: point.x,
          cy: point.y,
          r: 4.5,
        }, group);
        const hit = svg("circle", {
          class: "quota-chart-target",
          cx: point.x,
          cy: point.y,
          r: 12,
          tabindex: 0,
          role: "img",
        }, group);
        hit.setAttribute(
          "aria-label",
          `${
            point.level.effort
              ? `${line.name}, ${point.level.effort}`
              : line.name
          }: ${copy.score} ${point.level.score.toFixed(1)}, ${
            copy.quota.replace("{value}", percent(point.share))
          }`,
        );
        const enter = () => {
          focusLine(line.id);
          showTip(point, width);
        };
        const leave = () => {
          focusLine(null);
          hideTip();
        };
        hit.addEventListener("pointerenter", enter);
        hit.addEventListener("pointerleave", leave);
        hit.addEventListener("focus", enter);
        hit.addEventListener("blur", leave);
      }
      group.addEventListener("pointerenter", () => focusLine(line.id));
      group.addEventListener("pointerleave", () => focusLine(null));
    }
    // The frontier, over the lines it runs along: points no cheaper point
    // beats on score.
    if (frontier.checked) {
      let best = -Infinity;
      const edge = [...points].sort((a, b) => a.share - b.share).filter((p) =>
        p.level.score > best ? (best = p.level.score, true) : false
      );
      svg("polyline", {
        class: "quota-chart-frontier",
        points: edge.map((p) => `${p.x},${p.y}`).join(" "),
      }, chart);
    }
    if (focused) focusLine(focused);
  }

  const syncControls = () => {
    for (const button of scaleButtons) {
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.chartScale === scale),
      );
    }
    for (const button of effortButtons) {
      button.setAttribute(
        "aria-pressed",
        String(!hiddenEfforts.has(button.dataset.chartEffort ?? "")),
      );
    }
    for (const button of lineButtons) {
      button.setAttribute(
        "aria-pressed",
        String(!hiddenLines.has(button.dataset.chartLine ?? "")),
      );
    }
    for (const button of planButtons) {
      const own = data.lines.filter((line) =>
        line.plan === button.dataset.chartPlan
      );
      const on = own.filter((line) => !hiddenLines.has(line.id)).length;
      button.setAttribute(
        "aria-pressed",
        on === own.length ? "true" : on ? "mixed" : "false",
      );
    }
  };
  const update = () => {
    syncControls();
    render();
  };

  for (const button of scaleButtons) {
    button.addEventListener("click", () => {
      scale = button.dataset.chartScale === "linear" ? "linear" : "log";
      update();
    }, options);
  }
  for (const button of effortButtons) {
    button.addEventListener("click", () => {
      const effort = button.dataset.chartEffort ?? "";
      if (!hiddenEfforts.delete(effort)) hiddenEfforts.add(effort);
      update();
    }, options);
  }
  for (const button of lineButtons) {
    const id = button.dataset.chartLine ?? "";
    button.addEventListener("click", () => {
      if (!hiddenLines.delete(id)) hiddenLines.add(id);
      update();
    }, options);
    for (const type of ["pointerenter", "focus"] as const) {
      button.addEventListener(type, () => focusLine(id), options);
    }
    for (const type of ["pointerleave", "blur"] as const) {
      button.addEventListener(type, () => focusLine(null), options);
    }
  }
  for (const button of planButtons) {
    button.addEventListener("click", () => {
      const own = data.lines.filter((line) =>
        line.plan === button.dataset.chartPlan
      );
      const allOn = own.every((line) => !hiddenLines.has(line.id));
      for (const line of own) {
        if (allOn) hiddenLines.add(line.id);
        else hiddenLines.delete(line.id);
      }
      update();
    }, options);
  }
  query("[data-chart-reset]", HTMLButtonElement, root).addEventListener(
    "click",
    () => {
      hiddenLines.clear();
      hiddenEfforts.clear();
      for (const effort of data.hidden) hiddenEfforts.add(effort);
      scale = "log";
      frontier.checked = false;
      update();
    },
    options,
  );
  frontier.addEventListener("change", render, options);

  // Drawn at the plot's own width, so text stays at its CSS size. The plot
  // has no width while the disclosure is closed; it draws once it opens.
  let frame = 0;
  const observer = new ResizeObserver(() => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(render);
  });
  observer.observe(plot);
  signal.addEventListener("abort", () => observer.disconnect(), {
    once: true,
  });

  root.hidden = false;
  update();

  return {
    setFactor(timing, factor) {
      factors.set(timing, factor);
      render();
    },
  };
}
