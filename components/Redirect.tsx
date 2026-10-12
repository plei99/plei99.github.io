import type { Lang } from "../lib/site";

/**
 * A page that used to exist and now sends visitors elsewhere: a meta refresh,
 * a script for the hash-preserving case, and a plain link without either.
 */
export default function Redirect(
  { lang, to, label, canonical, script, reason }: {
    lang: Lang;
    to: string;
    label: string;
    canonical?: string;
    script?: string;
    reason: string;
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
          __html: `// ${reason}\nwindow.location.replace(${
            script ?? JSON.stringify(to)
          });`,
        }}
      />
      <p>
        <a href={to}>{label}</a>
      </p>
    </>
  );
}
