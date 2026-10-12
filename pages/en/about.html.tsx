import Base from "../../components/Base";
import { About } from "../../components/views";

export default function Page() {
  return (
    <Base
      page={{
        lang: "en",
        title: "About me",
        url: "/en/about.html",
        section: "about",
        altUrl: "/zh/about.html",
      }}
    >
      <About lang="en" />
    </Base>
  );
}
