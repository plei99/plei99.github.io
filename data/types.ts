// The shape of the site's data. Every string a visitor reads exists in both
// languages, so a missing translation or a mistyped key fails `bun check`.

export type Lang = "en" | "zh";
export type Localized<T = string> = Record<Lang, T>;

/** A destination in the figure. `external` ones open in a new tab. */
export type Destination = {
  label: Localized;
  href: Localized;
  external?: true;
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
    sans?: true;
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
    links: { label: string; href: string | Localized }[];
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
  | "figure_label"
  | "index";
export type Ui = Localized<Record<UiKey, string>>;

export type Home = {
  tagline: Localized;
  /** HTML, set as the first paragraph of About me. */
  bio: Localized;
  /** `body` is HTML. */
  about: { title: Localized; body: Localized };
  now: Localized<string[]>;
};

export type ThemeRole = "paper" | "text" | "muted" | "ink" | "link" | "rule";
export type Theme =
  & { id: string; name: string; dark: boolean; stage?: string }
  & Record<ThemeRole, string>;
export type ThemeFamily = { family: string; themes: Theme[] };

export type TravelKey =
  | "title"
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
  | "minutes"
  | "seconds"
  | "tasks"
  | "per_100"
  | "notes"
  | "endnote";
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
export type StudyRow = {
  plan: Localized;
  model: string;
  /** A key of AiSubscriptions["timing"], for rows the sliders adjust. */
  timing?: string;
  price: number;
  score: number;
  api: number;
  cost: number;
  time_seconds: number;
  time_url: string;
  url: string;
};
export type AiSubscriptions = {
  copy: Localized<Record<StudyKey, string>>;
  timing: Record<string, Timing>;
  rows: StudyRow[];
  /** Inline Markdown, one per list item. */
  notes: Localized[];
};
