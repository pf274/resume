import { useTheme } from "@emotion/react";
import { Card, Typography } from "@mui/material";

function Reference({info}) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const hasReference = info.reference && info.reference.trim().length > 0;
  return <Card sx={{ padding: "1.5em" }}>
    {hasReference && <Typography sx={{paddingBottom: '2em', whiteSpace: 'pre-line'}}>{info.reference}</Typography>}
    <Typography sx={{whiteSpace: 'pre-line'}} color={isDark ? "plum" : "purple"}>{`${info.name}`}</Typography>
  </Card>
}

export function ReferencesPage({ resume }) {
  if (!resume.references || resume.references.length == 0) {
    return <Typography sx={{textAlign: 'center'}} variant="h5">No references found.</Typography>
  }
  return <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "2em",
      flexWrap: "wrap",
    }}
  >
    {resume.references.map((info, index) => <Reference info={info} key={index} />)}
  </div>
}
