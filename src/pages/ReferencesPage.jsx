import { Typography } from "@mui/material";
import { Reference } from "../components/referencesPage/Reference";
import { Page } from "../components/Page";

export function ReferencesPage({ resume }) {
  if (!resume.references || resume.references.length == 0) {
    return (
      <Page>
        <Typography sx={{textAlign: 'center'}} variant="h5">
          No references found.
        </Typography>
      </Page>
    );
  }
  return (
    <Page>
      {resume.references.map((info, index) => <Reference info={info} key={index} />)}
    </Page>
  )
}
