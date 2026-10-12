import Base from "../../components/Base";
import { Travel } from "../../components/views";

export default function Page() {
  return (
    <Base
      page={{
        lang: "zh",
        title: "旅行",
        url: "/zh/travel.html",
        section: "travel",
        altUrl: "/en/travel.html",
      }}
    >
      <Travel lang="zh" />
    </Base>
  );
}
