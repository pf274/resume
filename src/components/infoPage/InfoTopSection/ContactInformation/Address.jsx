import { Typography } from "@mui/material";
import { EditableTypography } from "../../../EditableTypography";
import { useResumeContext } from "../../../../contexts/ResumeContext";

export function Address() {
  const { resume } = useResumeContext();
  const basics = resume.basics;
  return (
    <div
      style={{
        alignItems: "center",
        alignSelf: "center",
        flexWrap: "wrap",
      }}
      className="flexRow"
    >
      <EditableTypography value={basics.location.city} path="basics.location.city" placeholder="city" />
      <Typography>{"\u00a0"}</Typography>
      <EditableTypography value={basics.location.region} path="basics.location.region" placeholder="state" />
      <Typography>{`, United States`}</Typography>
    </div>
  );
}
