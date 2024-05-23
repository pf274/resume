import { Typography } from "@mui/material";
import { ResumeAccordion } from "../ResumeAccordion";

export function Project({info}) {
  return (
    <ResumeAccordion title={info.name} subtitle={info.description} startDateString={info.startDate} endDateString={info.endDate}>
      <div>
        {info.highlights && info.highlights.length > 0 && <ul>{info.highlights.map((highlight, index) => 
            <li key={index}>{highlight}</li>
          )}</ul>}
        {info.url && <Typography><a href={info.url}>See Project</a></Typography>}
      </div>
    </ResumeAccordion>
  )
}