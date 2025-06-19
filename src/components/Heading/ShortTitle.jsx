import { Typography } from "@mui/material";
import { useResumeContext } from "../../contexts/ResumeContext";

export function ShortTitle() {
  const { resume } = useResumeContext();
  if (!resume?.basics?.label) {
    return null;
  }
  return (
    <Typography variant="h6" className="label">
      {resume.basics.label}
    </Typography>
  );
}
