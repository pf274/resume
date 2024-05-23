import { Avatar, Card, Typography } from "@mui/material";

export function Summary({ resume }) {
  return (
    <Card
      sx={{
        flex: 1,
        minWidth: "300px",
        padding: "1.5em",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "1em",
      }}
    >
      {resume.basics.image && (
        <Avatar
          alt="Profile Picture"
          src={resume.basics.image}
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
        <Typography>{resume.basics.summary}</Typography>
      </div>
    </Card>
  );
}
