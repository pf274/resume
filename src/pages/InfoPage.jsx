import { ContactInformation } from "../components/infoPage/ContactInformation";
import { Summary } from "../components/infoPage/Summary";
import { Skills } from "../components/infoPage/Skills";
import { Page } from "../components/Page";
import { useResumeContext } from "../contexts/ResumeContext";

export function InfoPage() {
  const { getResume } = useResumeContext();
  const resume = getResume();

  return (
    <Page>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "2em",
          textAlign: "center",
          flexWrap: "wrap-reverse",
          justifyContent: "center",
        }}
      >
        <ContactInformation basics={resume.basics} />
        <Summary basics={resume.basics} />
      </div>
      <Skills skills={resume.skills} />
    </Page>
  );
}
