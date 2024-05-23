import { Page } from "../components/Page";
import { Institution } from "../components/educationPage/Institution";


export function EducationPage({ resume }) {
  if (!resume.education || resume.education.length == 0) {
    return <Page>No Education details found.</Page>;
  }
  return (
    <Page>
      {resume.education.map((education, index) => (
        <Institution key={index} details={education} />
      ))}
    </Page>
  );
}
