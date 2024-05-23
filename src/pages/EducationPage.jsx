import { useTheme } from "@emotion/react";
import { ArrowDropDown } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Table,
  TableBody,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { colorByPercentage } from "../colorGen";

const gradeLetters = ["A", "B", "C", "D", "F"];
const gradeColors = [
  colorByPercentage(0.4),
  colorByPercentage(0.3),
  colorByPercentage(0.2),
  colorByPercentage(0.1),
  colorByPercentage(0),
];

// TODO: Split these into separate files

function Course({ description }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  if (!description) return null;
  const numColumns = (description.match(new RegExp(" \\| ", "g")) || []).length;
  if (numColumns < 3) {
    return <Typography>{description}</Typography>;
  }
  let columns = description.split(" | ").map((column) => column.trim());
  columns = {
    status: columns[0],
    grade: columns[1],
    courseId: columns[2],
    courseName: columns[3],
  };
  const isCompleted = columns.status.toLowerCase() === "completed";
  const gradeLetter = columns.grade.replace(/[^A-D,F]/g, "").toUpperCase();
  const gradeIndex = gradeLetters.findIndex((value) => value == gradeLetter);
  const gradeColor =
    gradeIndex < 0 ? (isDark ? "white" : "black") : gradeColors[gradeIndex];
  return (
    <TableRow sx={{ textAlign: "center" }}>
      <td style={{ paddingRight: "1em", paddingBottom: "2em" }}>
        <Typography
          alt={columns.status}
          label={columns.status}
          style={{
            color: isCompleted
              ? isDark
                ? "lightgreen"
                : "green"
              : isDark
              ? "gray"
              : "darkgray",
            // color: isDark ? "black" : "white",
            // fontWeight: "bold",
          }}
        >
          {columns.status}
        </Typography>
      </td>
      <td style={{ paddingRight: "1em", paddingBottom: "2em" }}>
        {columns.courseId}
      </td>
      <td style={{ paddingRight: "1em", paddingBottom: "2em" }}>
        {columns.courseName}
      </td>
      <td style={{ color: gradeColor }}>{columns.grade}</td>
    </TableRow>
  );
}

function Institution({ details }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const startDate = new Date(details.startDate);
  const endDate = new Date(details.endDate);
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
          <Typography variant="h5">{details.institution}</Typography>
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
            {details.area}
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
      </AccordionDetails>
    </Accordion>
  );
}

export function EducationPage({ resume }) {
  if (!resume.education || resume.education.length == 0) {
    return <div>No Education details found.</div>;
  }
  return (
    <div>
      {resume.education.map((education, index) => (
        <Institution key={index} details={education} />
      ))}
    </div>
  );
}
