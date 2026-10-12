// Inlined into pages that moved (see components/Redirect.tsx). The meta
// refresh covers visitors without JavaScript; this keeps the URL's hash.

/** Where the page moved. */
declare const TARGET: string;
/** Whether to carry the hash over, for anchors into the old page. */
declare const KEEP_HASH: boolean;

location.replace(KEEP_HASH ? TARGET + location.hash : TARGET);
