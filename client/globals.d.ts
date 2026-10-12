// Set by the inline preferences script in every page's head (see
// client/inline/preferences.ts) and called again by theme.ts.
interface Window {
  applyTheme(): void;
}

// panel.ts fires this before it swaps or closes the panel, so page scripts
// (the globe, the subscription comparison) can let go of what they hold.
interface DocumentEventMap {
  "panel:close": Event;
}
