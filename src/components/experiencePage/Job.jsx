import { Typography } from "@mui/material";
import { ResumeAccordion } from "../ResumeAccordion";
import { TypographyW } from "../TypographyW";

export function Job({ job }) {
  return (
    <ResumeAccordion title={job.name} title2={job.position} startDateString={job.startDate} endDateString={job.endDate}>
      <div>
        <TypographyW>{job.summary}</TypographyW>
        {job.highlights && job.highlights.length > 0 && (
          <ul>
            {job.highlights.map((highlight, index) => (
              <li key={index}>{highlight}</li>
            ))}
          </ul>
        )}
        {job.url && (
          <Typography>
            <a href={job.url}>See Related Website</a>
          </Typography>
        )}
      </div>
    </ResumeAccordion>
  );
}