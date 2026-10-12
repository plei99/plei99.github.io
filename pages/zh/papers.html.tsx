import Redirect from "../../components/Redirect";
import { site } from "../../lib/site";

// The papers list used to live here. The arXiv author page replaces it.
export default function Page() {
  return (
    <Redirect
      lang="zh"
      to={site.contact.arxiv}
      label="arXiv"
    />
  );
}
