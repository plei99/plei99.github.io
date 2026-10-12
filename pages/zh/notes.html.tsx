import Redirect from "../../components/Redirect";

export default function Page() {
  return (
    <Redirect
      lang="zh"
      to="/notes/zh/"
      label="笔记"
      canonical="https://plei99.github.io/notes/zh/"
      reason="The notes list used to live here. The notes are now their own site."
    />
  );
}
