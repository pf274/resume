import { Page } from "../components/Page";
import { Institution } from "../components/educationPage/Institution";
import { useResumeContext } from "../contexts/ResumeContext";

export function EducationPage() {
  const { getResume } = useResumeContext();
  const resume = getResume();
  if (!resume.education || resume.education.length == 0) {
    return <Page>No Education details found.</Page>;
  }
  return (
    <Page>
      {resume.education.map((education, index) => (
        <Institution key={index} details={education} path={`education.${index}`} />
      ))}
    </Page>
  );
}
