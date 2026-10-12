import Redirect from "../components/Redirect";

export default function Page() {
  return (
    <Redirect
      lang="en"
      to="/notes/"
      label="Notes"
      canonical="https://plei99.github.io/notes/"
      reason="The notes list used to live here. The notes are now their own site."
    />
  );
}
