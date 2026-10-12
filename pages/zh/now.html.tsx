import Base from "../../components/Base";
import { Now } from "../../components/views";

export default function Page() {
  return (
    <Base
      page={{
        lang: "zh",
        title: "最近",
        url: "/zh/now.html",
        section: "now",
        altUrl: "/en/now.html",
      }}
    >
      <Now lang="zh" />
    </Base>
  );
}
