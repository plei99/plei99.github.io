import Base from "../../components/Base";
import { About } from "../../components/views";

export default function Page() {
  return (
    <Base
      page={{
        lang: "zh",
        title: "关于我",
        url: "/zh/about.html",
        section: "about",
        altUrl: "/en/about.html",
      }}
    >
      <About lang="zh" />
    </Base>
  );
}
