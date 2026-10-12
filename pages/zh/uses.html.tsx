import Base from "../../components/Base";
import { Uses } from "../../components/views";

export default function Page() {
  return (
    <Base
      page={{
        lang: "zh",
        title: "装备",
        url: "/zh/uses.html",
        section: "uses",
        altUrl: "/en/uses.html",
      }}
    >
      <Uses lang="zh" />
    </Base>
  );
}
