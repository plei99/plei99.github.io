import Base from "../../components/Base";
import { Now } from "../../components/views";

export default function Page() {
  return (
    <Base
      page={{
        lang: "en",
        title: "Now",
        url: "/en/now.html",
        section: "now",
        altUrl: "/zh/now.html",
      }}
    >
      <Now lang="en" />
    </Base>
  );
}
