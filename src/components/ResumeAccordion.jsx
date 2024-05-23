import { useTheme } from "@emotion/react";
import { ArrowDropDown } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";

function Break() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  return (<div
    className="accordion-break"
    style={{
      width: "2em",
      height: "0.2em",
      borderRadius: "1em",
      backgroundColor: isDark ? "gray" : "black",
      alignSelf: "center",
    }}
  />)
}

export function ResumeAccordion({title, title2, subtitle, startDateString, endDateString, children}) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);
  function printDate(date) {
    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  }
  return (<Accordion sx={{ padding: "1.5em", maxWidth: '100%' }}>
  <AccordionSummary expandIcon={<ArrowDropDown fontSize="large" />}>
    <div className="resume-accordion-header">
      <div className="resume-accordion-header-left">
        <div style={{display: 'flex', gap: '1em'}} className="accordionTitles">
          <Typography variant="h5">{title}</Typography>
          {title2 && <Break />}
          {title2 && <Typography variant="h5" color={isDark ? "plum" : "#CC00BB"}>
            {title2}
          </Typography>}
        </div>
        {subtitle && <Typography variant="subtitle">{subtitle}</Typography>}
      </div>
      <Typography
        variant="h5"
        color={isDark ? "lightgreen" : "green"}
        className="resume-date-range"
      >
        {`${printDate(startDate)} - ${
          endDate >= new Date() ? "Present" : printDate(endDate)
        }`}
      </Typography>
    </div>
  </AccordionSummary>
  <AccordionDetails>
    {children}
  </AccordionDetails>
</Accordion>)
}