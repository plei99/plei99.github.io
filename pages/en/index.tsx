import Redirect from "../../components/Redirect";

export default function Page() {
  return (
    <Redirect
      lang="en"
      to="/"
      label="Patrick Lei"
      canonical="https://plei99.github.io/"
      script={'"/" + window.location.hash'}
      reason="The English home page used to live here; it is now the site root."
    />
  );
}
