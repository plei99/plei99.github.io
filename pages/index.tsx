import Base from "../components/Base";

export default function Home() {
  return (
    <Base
      page={{
        lang: "en",
        title: "Patrick Lei",
        url: "/",
        section: "home",
        altUrl: "/zh/",
        detectLanguage: true,
      }}
    />
  );
}
