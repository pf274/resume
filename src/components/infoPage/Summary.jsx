import { Avatar, Typography } from "@mui/material";
import { ResumeCard } from "../ResumeCard";
import { EditableTypography } from "../EditableTypography";

export function Summary({ basics }) {
  return (
    <ResumeCard
      style={{
        flex: 1,
        minWidth: "300px",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "1em",
      }}
    >
      {basics.image && (
        <Avatar
          alt="Profile Picture"
          src={basics.image}
          style={{
            width: "11em",
            height: "11em",
            alignSelf: "center",
          }}
        />
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          flex: 1,
        }}
      >
        <Typography variant="h5" sx={{ paddingBottom: "1em" }}>
          Summary
        </Typography>
        <EditableTypography path="basics.summary" value={basics.summary} multiline textFieldStyle={{width: '100%'}} placeholder="summary" />
      </div>
    </ResumeCard>
  );
}
