import { useTheme } from "@emotion/react";
import { TableRow, Typography } from "@mui/material";
import { colorByPercentage } from "../../colorGen";

const gradeLetters = ["A", "B", "C", "D", "F"];
const gradeColors = [
  colorByPercentage(0.4),
  colorByPercentage(0.2),
  colorByPercentage(0.1),
  colorByPercentage(0),
  colorByPercentage(0),
];

export function Course({ description }) {
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
  const gradeColor = gradeIndex < 0 ? (isDark ? "white" : "black") : gradeColors[gradeIndex];
  return (
    <TableRow sx={{ textAlign: "center" }}>
      <td style={{ paddingRight: "1em", paddingBottom: "2em" }}>
        <Typography
          alt={columns.status}
          label={columns.status}
          style={{
            color: isCompleted ? (isDark ? "lightgreen" : "green") : isDark ? "gray" : "darkgray",
            // color: isDark ? "black" : "white",
            // fontWeight: "bold",
          }}
        >
          {columns.status}
        </Typography>
      </td>
      <td style={{ paddingRight: "1em", paddingBottom: "2em" }}>{columns.courseId}</td>
      <td style={{ paddingRight: "1em", paddingBottom: "2em" }}>{columns.courseName}</td>
      <td style={{ color: gradeColor }}>{columns.grade}</td>
    </TableRow>
  );
}
