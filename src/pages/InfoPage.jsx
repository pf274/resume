import { Skills } from "../components/infoPage/Skills";
import { Page } from "../components/Page";
import { useResumeContext } from "../contexts/ResumeContext";
import { InfoTopSection } from "../components/infoPage/InfoTopSection";

export function InfoPage() {
  const { getResume } = useResumeContext();
  const resume = getResume();

  return (
    <Page>
      <InfoTopSection />
      <Skills skills={resume.skills} />
    </Page>
  );
}
