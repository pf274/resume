import { useTheme } from "@emotion/react";
import { ArrowDropDown } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  Typography,
} from "@mui/material";

function Job({ job }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const startDate = new Date(job.startDate);
  const endDate = new Date(job.endDate);
  function printDate(date) {
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  }
  return (
    <Accordion sx={{ padding: "1.5em" }}>
      <AccordionSummary expandIcon={<ArrowDropDown />}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            rowGap: "1em",
            columnGap: "1em",
            width: "100%",
          }}
        >
          <Typography variant="h5">{job.name}</Typography>
          <div
            style={{
              width: "2em",
              height: "0.2em",
              borderRadius: "1em",
              backgroundColor: isDark ? "gray" : "black",
              alignSelf: "center",
            }}
          />
          <Typography variant="h5" color={isDark ? "plum" : "purple"}>
            {job.position}
          </Typography>
          <Typography
            variant="h5"
            color={isDark ? "lightgreen" : "green"}
            sx={{ flex: 1, textAlign: "right", marginRight: "1em" }}
          >
            {`${printDate(startDate)} - ${
              endDate >= new Date() ? "Present" : printDate(endDate)
            }`}
          </Typography>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant="subtitle1">{job.summary}</Typography>
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
      </AccordionDetails>
    </Accordion>
  );
}

export function ExperiencePage({ resume }) {
  if (!resume.work || resume.work.length === 0) {
    return <div>No work experience found</div>;
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2em" }}>
      {resume.work.map((job, index) => (
        <Job key={index} job={job} />
      ))}
    </div>
  );
}
