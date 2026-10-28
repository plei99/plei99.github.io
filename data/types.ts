// The shape of the site's data. Every string a visitor reads exists in both
// languages, so a missing translation or a mistyped key fails `bun check`.

export type Lang = "en" | "zh";
export type Localized<T = string> = Record<Lang, T>;

/** A destination in the figure. `external` ones open in a new tab. */
export type Destination = {
  label: Localized;
  href: Localized;
  external?: true;
  /** The figure's name for it, such as x₁ or α₂: a math italic letter and an
   * optional subscript. Shown beside its hint and in the panel's margin. */
  symbol: { base: string; n?: number };
  /** What the link leads to, shown under the figure while it is pointed at. */
  hint: Localized;
};

export type Site = {
  name: string;
  description: Localized;
  pages: {
    about: Destination;
    seminars: Destination;
    notes: Destination;
    travel: Destination;
    arxiv: Omit<Destination, "href">;
    now: Destination;
    cv: Destination;
    uses: Destination;
  };
  latin_fonts: {
    group: Localized;
    serif?: true;
    fonts: { id: string; name: string }[];
  }[];
  contact: {
    email: string;
    github: string;
    github_label: string;
    arxiv: string;
    arxiv_label: string;
  };
  footer: {
    copyright: string;
    links: { label: string; href: string | Localized; external?: true }[];
  };
};

export type UiKey =
  | "skip_to_content"
  | "sections"
  | "seminars"
  | "travel"
  | "now"
  | "about"
  | "seminars_lede"
  | "travel_lede"
  | "globe_start"
  | "globe_pause"
  | "now_lede"
  | "now_what"
  | "updated"
  | "uses"
  | "uses_lede"
  | "uses_what"
  | "contact"
  | "portrait_alt"
  | "cv"
  | "close"
  | "theme"
  | "latin_font"
  | "cjk_font"
  | "cjk_serif"
  | "cjk_sans"
  | "cjk_rounded"
  | "cjk_kai"
  | "back_to_seminars"
  | "organized_with"
  | "figure_label"
  | "figure_hint"
  | "index";
export type Ui = Localized<Record<UiKey, string>>;

export type Home = {
  tagline: Localized;
  /** HTML, set as the first paragraph of About me. */
  bio: Localized;
  /** `body` is HTML. */
  about: { title: Localized; body: Localized };
  /** The Now page: when it was last revised (YYYY-MM), and its items in
   * groups. */
  now: {
    updated: string;
    groups: { title: Localized; items: Localized<string[]> }[];
  };
};

export type ThemeRole = "paper" | "text" | "muted" | "ink" | "link" | "rule";
export type Theme =
  & {
    id: string;
    name: Localized;
    dark: boolean;
    stage?: string;
    /** One mark colour per subscription in the quota chart. */
    series: Record<PlanId, string>;
  }
  & Record<ThemeRole, string>;

export type TravelKey =
  | "title"
  | "count"
  | "globe_label"
  | "controls"
  | "keyboard"
  | "reset"
  | "zoom_in"
  | "zoom_out"
  | "pause"
  | "play"
  | "flat";
export type Place = {
  id: string;
  feature: string;
  name: Localized;
  lat: number;
  lon: number;
};
export type Travel = Localized<Record<TravelKey, string>> & { places: Place[] };

export type UsesItem = {
  kind: Localized;
  name: string;
  url?: string;
  /** Inline Markdown. */
  note: Localized;
  /** Opens the AI subscription comparison from this item. */
  study?: true;
};
export type UsesCategory = {
  id: string;
  tone: "apricot" | "lilac" | "ink";
  title: Localized;
  /** Markdown. */
  body?: Localized;
  items: UsesItem[];
};

export type StudyKey =
  | "trigger"
  | "close"
  | "date"
  | "title"
  | "intro"
  | "reading_note"
  | "timing_heading"
  | "timing_note"
  | "timing_limits"
  | "reset"
  | "preview"
  | "scroll_hint"
  | "plan_model"
  | "price"
  | "score"
  | "api_value"
  | "cost_task"
  | "time_task"
  | "time_unavailable"
  | "minutes"
  | "seconds"
  | "tasks"
  | "per_100"
  | "notes"
  | "endnote"
  | "chart_title"
  | "chart_note"
  | "chart_x"
  | "chart_y"
  | "chart_scale"
  | "chart_log"
  | "chart_linear"
  | "chart_frontier"
  | "chart_reasoning"
  | "chart_models"
  | "chart_reset"
  | "chart_quota"
  | "chart_tasks"
  | "chart_cost"
  | "chart_empty"
  | "chart_table"
  | "chart_effort"
  | "chart_quota_task";
/** A usage window that uses.js lets the reader weight with a slider. */
export type Timing = {
  label: Localized;
  window: Localized;
  /** With {share} and {other} placeholders, in percent. */
  share: Localized;
  default: number;
  window_coefficient: number;
  other_coefficient: number;
};
export type PlanId = "codex" | "claude" | "google" | "kimi" | "mimo" | "glm";
export type Plan = {
  name: Localized;
  price: number;
  /** The allowance's monthly worth at API prices, in dollars. */
  api: number;
  /** A key of AiSubscriptions["timing"], for plans the sliders adjust. */
  timing?: string;
};
/** AA's reasoning settings; "none" is a non-reasoning mode. */
export type Effort = "none" | "low" | "medium" | "high" | "xhigh" | "max";
/** One model at one reasoning setting, as AA's Intelligence Index ran it. */
export type ModelLevel = {
  /** Absent for a model AA runs at a single setting. */
  effort?: Effort;
  score: number;
  /** Dollars per task at API prices. */
  cost: number;
  time_seconds: number | null;
};
/** A model with every reasoning setting AA has measured, lowest first. */
export type ModelLine = {
  id: string;
  name: string;
  plan: PlanId;
  url: string;
  levels: ModelLevel[];
};
/** A table row: one level of a model line. */
export type StudyRow = {
  line: string;
  effort?: Effort;
  time_url: string;
  url: string;
};
export type AiSubscriptions = {
  copy: Localized<Record<StudyKey, string>>;
  timing: Record<string, Timing>;
  plans: Record<PlanId, Plan>;
  lines: ModelLine[];
  rows: StudyRow[];
  /** Inline Markdown, one per list item. */
  notes: Localized[];
};
