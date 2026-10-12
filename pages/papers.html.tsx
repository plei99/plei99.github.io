import Redirect from "../components/Redirect";
import { site } from "../lib/site";

export default function Page() {
  return (
    <Redirect
      lang="en"
      to={site.contact.arxiv}
      label="arXiv"
      reason="The papers list used to live here. The arXiv author page replaces it."
    />
  );
}
