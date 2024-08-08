import { Accordion, AccordionDetails, AccordionSummary, Divider, Table, TableBody, TableHead, Typography } from "@mui/material";
import { EditableResumeAccordion } from "../EditableResumeAccordion";
import { ArrowDropDown } from "@mui/icons-material";
import { Course } from "./Course";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@emotion/react";

export function Institution({ details, path }) {
  const scrollRef = useRef();
  const startDateRaw = details.startDate.split("-").map((part) => Number(part));
  const endDateRaw = details.endDate.split("-").map((part) => Number(part));
  const startDate = new Date(startDateRaw[0], startDateRaw[1] - 1, startDateRaw[2]);
  const endDate = new Date(endDateRaw[0], endDateRaw[1] - 1, endDateRaw[2]);
  const currentDate = new Date();
  const progress = (currentDate.valueOf() - startDate.valueOf()) / (endDate.valueOf() - startDate.valueOf());
  const [validVisual, setValidVisual] = useState(false);
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo(Math.max(0, 2000 * progress - 20), 0);
    }
  }, [scrollRef.current, validVisual]);
  useEffect(() => {
    async function loadVisual() {
      if (details.visual) {
        const response = await fetch(details.visual);
        setValidVisual(response.ok);
      }
    }
    loadVisual();
  }, []);
  return (
    <EditableResumeAccordion
      title={details.institution}
      title2={details.area}
      startDateString={details.startDate}
      endDateString={details.endDate}
      titlePath={`${path}.institution`}
      title2Path={`${path}.area`}
      startDatePath={`${path}.startDate`}
      endDatePath={`${path}.endDate`}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
        <Typography variant="subtitle1">{`${details.studyType} - ${details.score} GPA`}</Typography>
        {validVisual && (
          <div
            ref={scrollRef}
            style={{
              position: "relative",
              overflowX: "auto",
              overflowY: "hidden",
              maxWidth: "100%",
              padding: "1em",
              borderWidth: 2,
              borderRadius: "0.5em",
              borderColor: isDark ? "gray" : "black",
              borderStyle: "solid",
              backgroundColor: "black",
            }}
          >
            {<img src={details.visual} width={2000} />}
            {progress < 1 && progress > 0 && (
              <div
                style={{ backgroundColor: "red", position: "absolute", left: 2000 * progress + 16, top: 0, bottom: 0, width: 1, height: "100%" }}
              />
            )}
            {progress < 1 && progress > 0 && (
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  position: "absolute",
                  left: 2000 * progress + 16,
                  top: 0,
                  bottom: 0,
                  height: "100%",
                }}
              >
                <Typography style={{ textAlign: "right", color: "red", paddingRight: "0.5em", transform: "translateX(-100%)", textWrap: "nowrap" }}>
                  Today
                </Typography>
              </div>
            )}
          </div>
        )}
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
    </EditableResumeAccordion>
  );
}
