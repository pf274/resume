import { Accordion, AccordionDetails, AccordionSummary, Divider, Table, TableBody, TableHead, Typography } from "@mui/material";
import { ResumeAccordion } from "../ResumeAccordion";
import { ArrowDropDown } from "@mui/icons-material";
import { Course } from "./Course";

export function Institution({ details }) {
  return (
    <ResumeAccordion title={details.institution} title2={details.area} startDateString={details.startDate} endDateString={details.endDate}>
      <div style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
        <Typography variant="subtitle1">
          {`${details.studyType} - ${details.score} GPA`}
        </Typography>
        {details.courses && details.courses.length > 0 && (
          <Accordion variant="outlined">
            <AccordionSummary expandIcon={<ArrowDropDown />}>
              <Typography>Courses</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Divider />
              <div style={{ overflow: "auto", maxHeight: "60vh" }}>
                <Table sx={{ width: "auto" }}>
                  <TableHead>
                    <tr style={{ textAlign: "center" }}>
                      <th style={{ paddingRight: "1em" }}>Status</th>
                      <th style={{ paddingRight: "1em" }}>Course ID</th>
                      <th style={{ paddingRight: "1em" }}>Course Name</th>
                      <th>Grade</th>
                    </tr>
                  </TableHead>
                  <TableBody>
                    {details.courses.map((courseDescription, index) => (
                      <Course key={index} description={courseDescription} />
                    ))}
                  </TableBody>
                </Table>
              </div>
            </AccordionDetails>
          </Accordion>
        )}
        {details.url && (
          <Typography>
            <a href={details.url}>See Related Website</a>
          </Typography>
        )}
      </div>
    </ResumeAccordion>
  );
}