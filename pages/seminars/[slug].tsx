import Base from "../../components/Base";
import { SeminarPage } from "../../components/views";
import { seminars } from "../../lib/site";

type Params = { slug: string };

// Individual seminar pages exist only in English. `switchUrl` tells the EN/中文
// control where to go without claiming a translation, so no hreflang pair is
// emitted.
export default async function Page({ params }: { params: Params }) {
  const seminar = (await seminars()).find((s) => s.slug === params.slug)!;
  return (
    <Base
      page={{
        lang: "en",
        title: seminar.title,
        description: seminar.description,
        url: seminar.url,
        section: "seminars",
        switchUrl: "/zh/seminars/",
      }}
    >
      <SeminarPage seminar={seminar} />
    </Base>
  );
}

// Bake renders one page per slug at build time.
export async function getStaticPaths(): Promise<
  { paths: { params: Params }[] }
> {
  return {
    paths: (await seminars()).map((s) => ({ params: { slug: s.slug } })),
  };
}
