import Base from "../../../components/Base";
import { Seminars } from "../../../components/views";

export default function Page() {
  return (
    <Base
      page={{
        lang: "zh",
        title: "讨论班",
        url: "/zh/seminars/",
        section: "seminars",
        altUrl: "/seminars/",
      }}
    >
      <Seminars lang="zh" />
    </Base>
  );
}
