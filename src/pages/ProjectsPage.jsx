import { useTheme } from "@emotion/react";
import { ArrowDropDown } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Card, Typography } from "@mui/material";

function Project({info}) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  console.log(info);
  const startDate = new Date(info.startDate);
  const endDate = new Date(info.endDate);
  function printDate(date) {
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  }
  return (
    <Accordion sx={{ padding: "1.5em" }}>
      <AccordionSummary expandIcon={<ArrowDropDown />}>
        <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%'}}>
          <div>
            <Typography variant="h5">{info.name}</Typography>
            <Typography variant="subtitle1">{info.description}</Typography>
          </div>
          <Typography
            variant="h5"
            color={isDark ? "lightgreen" : "green"}
            sx={{ flex: 1, textAlign: "right", marginRight: "1em" }}
          >
            {`${printDate(startDate)} - ${printDate(endDate)}`}
          </Typography>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        {info.highlights && info.highlights.length > 0 && <ul>{info.highlights.map((highlight, index) => 
          <li key={index}>{highlight}</li>
        )}</ul>}
        {info.url && <Typography><a href={info.url}>See Project</a></Typography>}
      </AccordionDetails>
    </Accordion>
  )
}

export function ProjectsPage({ resume }) {
  if (!resume.projects || resume.projects.length == 0) {
      return <Typography sx={{textAlign: 'center'}} variant="h5">No projects found.</Typography>
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2em",
        flexWrap: "wrap",
      }}
    >
      {resume.projects.map((info, index) => <Project info={info} key={index} />)}
    </div>
  );
}
