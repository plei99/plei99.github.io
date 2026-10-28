// The comparison is an ordinary disclosure without JS. Move its content into
// a native modal when enhanced, retaining one copy and the Uses page beneath it.
import { query } from "./dom.js";
import { percent, quotaChart } from "./quota-chart.js";

const disclosure = document.querySelector<HTMLDetailsElement>(
  "[data-uses-study]",
);

if (disclosure) {
  const trigger = query("summary", HTMLElement, disclosure);
  const body = query("[data-study-content]", HTMLElement, disclosure);
  const close = query("[data-study-close]", HTMLButtonElement, body);
  const controller = new AbortController();
  const options = { signal: controller.signal };
  const canShowModal = typeof HTMLDialogElement !== "undefined" &&
    typeof HTMLDialogElement.prototype.showModal === "function";
  let dialog: HTMLDialogElement | null = null;

  const chartRoot = body.querySelector<HTMLElement>("[data-quota-chart]");
  const chart = chartRoot ? quotaChart(chartRoot, controller.signal) : null;

  const timingForm = body.querySelector<HTMLFormElement>("[data-study-timing]");
  if (timingForm) {
    const form = timingForm;
    const sliders = [
      ...form.querySelectorAll<HTMLInputElement>('input[type="range"]'),
    ];
    const amounts = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });
    const counts = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });

    const updateTiming = (slider: HTMLInputElement) => {
      const share = Number(slider.value);
      const windowRate = Number(slider.dataset.windowCoefficient);
      const otherRate = Number(slider.dataset.otherCoefficient);
      const coefficient = (percent: number) =>
        windowRate * percent / 100 + otherRate * (1 - percent / 100);
      // API values in the HTML are calibrated at the original slider default.
      // Weight credit consumption, then invert it to find the available usage.
      const factor = coefficient(Number(slider.defaultValue)) /
        coefficient(share);
      const label = (slider.dataset.shareLabel ?? "")
        .replace("{share}", String(share))
        .replace("{other}", String(100 - share));
      slider.setAttribute("aria-valuetext", label);
      chart?.setFactor(slider.name, factor);
      query(`[data-share-output="${slider.name}"]`, HTMLOutputElement, form)
        .value = label;

      for (
        const row of body.querySelectorAll<HTMLElement>(
          `[data-study-values="${slider.name}"]`,
        )
      ) {
        const api = Number(row.dataset.api) * factor;
        const tasks = api / Number(row.dataset.cost);
        const values: Record<string, string> = {
          api: amounts.format(api),
          quota: percent(100 / tasks),
          tasks: counts.format(tasks),
          per100: counts.format(tasks * 100 / Number(row.dataset.price)),
        };
        for (const cell of row.querySelectorAll<HTMLElement>("[data-value]")) {
          cell.textContent = values[cell.dataset.value ?? ""] ??
            cell.textContent;
        }
      }
    };

    for (const slider of sliders) {
      slider.addEventListener("input", () => updateTiming(slider), options);
      updateTiming(slider);
    }
    form.addEventListener(
      "submit",
      (event) => event.preventDefault(),
      options,
    );
    form.addEventListener("reset", (event) => {
      event.preventDefault();
      for (const slider of sliders) {
        slider.value = slider.defaultValue;
        updateTiming(slider);
      }
    }, options);
    form.hidden = false;
  }

  if (canShowModal) trigger.setAttribute("aria-haspopup", "dialog");

  // The comparison has its own address (/uses.html#ai-subscriptions), kept in
  // the URL while it is open. replaceState rather than pushState: panel.js
  // treats every popstate as a page change and would reload Uses on Back.
  const hash = `#${disclosure.id}`;
  const setHash = (on: boolean) => {
    const url = new URL(location.href);
    url.hash = on ? hash : "";
    history.replaceState(history.state, "", url);
  };

  // byVisitor is false when panel.js is swapping or closing Uses; by then the
  // URL belongs to the next page and must be left alone.
  const dismiss = (byVisitor = true) => {
    if (!dialog) return;
    const previous = dialog;
    dialog = null;
    previous.close();
    close.hidden = true;
    disclosure.append(body);
    previous.remove();
    if (!byVisitor) return;
    setHash(false);
    if (trigger.isConnected) trigger.focus({ preventScroll: true });
  };

  const open = () => {
    if (dialog) return;
    disclosure.open = false;
    const sheet = document.createElement("dialog");
    dialog = sheet;
    sheet.className = "study-dialog";
    sheet.setAttribute("aria-labelledby", "subscription-study-title");
    sheet.lang = body.lang;
    close.hidden = false;
    sheet.append(body);
    document.body.append(sheet);

    sheet.addEventListener("cancel", (event) => {
      event.preventDefault();
      dismiss();
    }, options);
    // Both pointer endpoints must be on the backdrop, so selecting text and
    // releasing outside the sheet does not accidentally dismiss it.
    let startedOutside = false;
    const outside = (event: MouseEvent) => {
      const rect = sheet.getBoundingClientRect();
      return event.clientX < rect.left || event.clientX > rect.right ||
        event.clientY < rect.top || event.clientY > rect.bottom;
    };
    sheet.addEventListener("pointerdown", (event) => {
      startedOutside = event.target === sheet && outside(event);
    }, options);
    sheet.addEventListener("click", (event) => {
      if (startedOutside && event.target === sheet && outside(event)) {
        dismiss();
      }
    }, options);
    sheet.showModal();
    setHash(true);
    query("h2", HTMLElement, body).focus({ preventScroll: true });
  };

  trigger.addEventListener("click", (event) => {
    if (!canShowModal) return;
    event.preventDefault();
    open();
  }, options);

  close.addEventListener("click", () => dismiss(), options);
  // panel.js dispatches this before swaps, history navigation and closing Uses.
  document.addEventListener("panel:close", () => {
    dismiss(false);
    controller.abort();
  }, { once: true, signal: controller.signal });

  if (location.hash === hash) {
    if (canShowModal) open();
    else disclosure.open = true;
  }
}
