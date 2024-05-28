import { Typography } from "@mui/material";
import { EditableResumeAccordion } from "../EditableResumeAccordion";
import { TypographyW } from "../TypographyW";

export function Job({ job, path }) {
  return (
    <EditableResumeAccordion
      title={job.name}
      title2={job.position}
      startDateString={job.startDate}
      endDateString={job.endDate}
      titlePath={`${path}.name`}
      title2Path={`${path}.position`}
      startDatePath={`${path}.startDate`}
      endDatePath={`${path}.endDate`}
    >
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
    </EditableResumeAccordion>
  );
}
