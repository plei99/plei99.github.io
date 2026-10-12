import Redirect from "../components/Redirect";

// The notes list used to live here. The notes are now their own site.
export default function Page() {
  return (
    <Redirect
      lang="en"
      to="/notes/"
      label="Notes"
      canonical="https://plei99.github.io/notes/"
    />
  );
}
