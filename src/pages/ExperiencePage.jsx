import { Page } from "../components/Page";
import { Job } from "../components/experiencePage/Job";

export function ExperiencePage({ resume }) {
  if (!resume.work || resume.work.length === 0) {
    return <div>No work experience found</div>;
  }
  return (
    <Page>
      {resume.work.map((job, index) => (
        <Job key={index} job={job} />
      ))}
    </Page>
  );
}
