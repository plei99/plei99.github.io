import { inlineScript } from "../lib/inline";
import type { Lang } from "../lib/site";

/**
 * A page that used to exist and now sends visitors elsewhere: a meta refresh,
 * a script that can keep the URL's hash, and a plain link without either.
 */
export default async function Redirect(
  { lang, to, label, canonical, keepHash = false }: {
    lang: Lang;
    to: string;
    label: string;
    canonical?: string;
    keepHash?: boolean;
  },
) {
  return (
    <>
      <template data-shell data-lang={lang === "zh" ? "zh-CN" : "en"} />
      <meta charSet="utf-8" />
      <title>Patrick Lei</title>
      {canonical && <link rel="canonical" href={canonical} />}
      <meta name="robots" content="noindex" />
      <meta httpEquiv="refresh" content={`0; url=${to}`} />
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <script
        dangerouslySetInnerHTML={{
          __html: await inlineScript("redirect", {
            TARGET: to,
            KEEP_HASH: keepHash,
          }),
        }}
      />
      <p>
        <a href={to}>{label}</a>
      </p>
    </>
  );
}
