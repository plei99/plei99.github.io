import Base from "../../components/Base";
import { Uses } from "../../components/views";

export default function Page() {
  return (
    <Base
      page={{
        lang: "en",
        title: "Uses",
        url: "/en/uses.html",
        section: "uses",
        altUrl: "/zh/uses.html",
      }}
    >
      <Uses lang="en" />
    </Base>
  );
}
