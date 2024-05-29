import { Page } from "../components/Page";
import { stringifyResume } from "../gistHelper";
import { useResumeContext } from "../contexts/ResumeContext";
import ReactDiffViewer from "react-diff-viewer-refined";
import { Button, Typography } from "@mui/material";

export function ConfirmChangesPage() {
  const { resume, editedResume, setPage, clearChanges } = useResumeContext();
  const oldString = stringifyResume(resume);
  const newString = stringifyResume(editedResume.current);
  if (oldString === newString) {
    return (
      <Page>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Typography style={{ textAlign: "center", margin: "1em" }} variant="h5">
            No changes have been made
          </Typography>
          <Button variant="outlined" onClick={() => setPage("info")}>
            Go Back
          </Button>
        </div>
      </Page>
    );
  }
  return (
    <Page>
      <Button variant="outlined" onClick={clearChanges}>
        Clear Changes
      </Button>
      <div style={{ overflow: "auto", width: "100%", maxHeight: "80vh" }}>
        <div style={{ minWidth: "34em" }}>
          <ReactDiffViewer oldValue={oldString} newValue={newString} splitView={false} />
        </div>
      </div>
      <Button variant="outlined">Save Changes</Button>
    </Page>
  );
}
