import Base from "../../components/Base";
import { Seminars } from "../../components/views";

export default function Page() {
  return (
    <Base
      page={{
        lang: "en",
        title: "Seminars",
        url: "/seminars/",
        section: "seminars",
        altUrl: "/zh/seminars/",
      }}
    >
      <Seminars lang="en" />
    </Base>
  );
}
