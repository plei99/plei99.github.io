import Redirect from "../../components/Redirect";

// The English home page used to live here; it is now the site root.
export default function Page() {
  return (
    <Redirect
      lang="en"
      to="/"
      label="Patrick Lei"
      canonical="https://plei99.github.io/"
      keepHash
    />
  );
}
