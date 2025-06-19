import { Typography } from "@mui/material";
import { EditableTypography } from "../../../EditableTypography";
import { useResumeContext } from "../../../../contexts/ResumeContext";

export function LongDescription() {
  const { resume } = useResumeContext();

  return (
    <div
      style={{
        justifyContent: "flex-start",
        flex: 1,
        padding: 0,
      }}
      className="resumeCard"
    >
      <Typography variant="h5">Summary</Typography>
      <EditableTypography path="basics.summary" value={resume.basics.summary} multiline textFieldStyle={{ width: "100%" }} placeholder="summary" />
    </div>
  );
}
