import Base from "../../components/Base";
import { Travel } from "../../components/views";

export default function Page() {
  return (
    <Base
      page={{
        lang: "en",
        title: "Travel",
        url: "/en/travel.html",
        section: "travel",
        altUrl: "/zh/travel.html",
      }}
    >
      <Travel lang="en" />
    </Base>
  );
}
