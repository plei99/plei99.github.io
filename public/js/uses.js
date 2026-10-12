// The comparison is an ordinary disclosure without JS. Move its content into
// a native modal when enhanced, retaining one copy and the Uses page beneath it.
const disclosure = document.querySelector("[data-uses-study]");

if (disclosure) {
  const trigger = disclosure.querySelector("summary");
  const body = disclosure.querySelector("[data-study-content]");
  const close = body.querySelector("[data-study-close]");
  const controller = new AbortController();
  const options = { signal: controller.signal };
  const canShowModal = typeof HTMLDialogElement !== "undefined" &&
    typeof HTMLDialogElement.prototype.showModal === "function";
  let dialog;

  const timingForm = body.querySelector("[data-study-timing]");
  if (timingForm) {
    const sliders = [...timingForm.querySelectorAll('input[type="range"]')];
    const amounts = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });
    const counts = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });

    function updateTiming(slider) {
      const share = Number(slider.value);
      const windowRate = Number(slider.dataset.windowCoefficient);
      const otherRate = Number(slider.dataset.otherCoefficient);
      const coefficient = (percent) =>
        windowRate * percent / 100 + otherRate * (1 - percent / 100);
      // API values in the HTML are calibrated at the original slider default.
      // Weight credit consumption, then invert it to find the available usage.
      const factor = coefficient(Number(slider.defaultValue)) /
        coefficient(share);
      const label = slider.dataset.shareLabel.replace("{share}", share)
        .replace("{other}", 100 - share);
      slider.setAttribute("aria-valuetext", label);
      timingForm.querySelector(`[data-share-output="${slider.name}"]`).value =
        label;

      for (
        const row of body.querySelectorAll(
          `[data-study-values="${slider.name}"]`,
        )
      ) {
        const api = Number(row.dataset.api) * factor;
        const tasks = api / Number(row.dataset.cost);
        const values = {
          api: amounts.format(api),
          tasks: counts.format(tasks),
          per100: counts.format(tasks * 100 / Number(row.dataset.price)),
        };
        for (const cell of row.querySelectorAll("[data-value]")) {
          cell.textContent = values[cell.dataset.value];
        }
      }
    }

    for (const slider of sliders) {
      slider.addEventListener("input", () => updateTiming(slider), options);
      updateTiming(slider);
    }
    timingForm.addEventListener(
      "submit",
      (event) => event.preventDefault(),
      options,
    );
    timingForm.addEventListener("reset", (event) => {
      event.preventDefault();
      for (const slider of sliders) {
        slider.value = slider.defaultValue;
        updateTiming(slider);
      }
    }, options);
    timingForm.hidden = false;
  }

  if (canShowModal) trigger.setAttribute("aria-haspopup", "dialog");

  // The comparison has its own address (/uses.html#ai-subscriptions), kept in
  // the URL while it is open. replaceState rather than pushState: panel.js
  // treats every popstate as a page change and would reload Uses on Back.
  const hash = `#${disclosure.id}`;
  function setHash(on) {
    const url = new URL(location.href);
    url.hash = on ? hash : "";
    history.replaceState(history.state, "", url);
  }

  // byVisitor is false when panel.js is swapping or closing Uses; by then the
  // URL belongs to the next page and must be left alone.
  function dismiss(byVisitor = true) {
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
  }

  function open() {
    if (dialog) return;
    disclosure.open = false;
    dialog = document.createElement("dialog");
    dialog.className = "study-dialog";
    dialog.setAttribute("aria-labelledby", "subscription-study-title");
    dialog.lang = body.lang;
    close.hidden = false;
    dialog.append(body);
    document.body.append(dialog);

    dialog.addEventListener("cancel", (event) => {
      event.preventDefault();
      dismiss();
    }, options);
    // Both pointer endpoints must be on the backdrop, so selecting text and
    // releasing outside the sheet does not accidentally dismiss it.
    let startedOutside = false;
    const outside = (event) => {
      const rect = dialog.getBoundingClientRect();
      return event.clientX < rect.left || event.clientX > rect.right ||
        event.clientY < rect.top || event.clientY > rect.bottom;
    };
    dialog.addEventListener("pointerdown", (event) => {
      startedOutside = event.target === dialog && outside(event);
    }, options);
    dialog.addEventListener("click", (event) => {
      if (startedOutside && event.target === dialog && outside(event)) {
        dismiss();
      }
    }, options);
    dialog.showModal();
    setHash(true);
    body.querySelector("h2").focus({ preventScroll: true });
  }

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
