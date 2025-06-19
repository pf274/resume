import { Typography } from "@mui/material";
import { useResumeContext } from "../../contexts/ResumeContext";

export function Name() {
  const { authToken, resume } = useResumeContext();
  return (
    <Typography alignSelf="center" variant="h2" style={{ marginTop: authToken ? "0.66em" : 0 }}>
      {resume.basics.name}
    </Typography>
  );
}
