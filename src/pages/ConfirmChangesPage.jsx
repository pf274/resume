import { Page } from "../components/Page";
import { saveData, stringifyResume } from "../gistHelper";
import { useResumeContext } from "../contexts/ResumeContext";
import ReactDiffViewer from "react-diff-viewer-refined";
import { Button, Switch, Typography } from "@mui/material";
import { useState } from "react";

export function ConfirmChangesPage() {
  const { resume, editedResume, setPage, clearChanges, authToken } = useResumeContext();
  const oldString = stringifyResume(resume);
  const newString = stringifyResume(editedResume.current);
  const [loading, setLoading] = useState(false);
  const [splitView, setSplitView] = useState(false);

  async function handleSaveChanges() {
    setLoading(true);
    await saveData(newString, authToken);
    localStorage.removeItem("authToken");
    window.location.reload();
  }
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
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <Switch checked={splitView} onChange={() => setSplitView(!splitView)} />
        <Typography variant="h6">Split View</Typography>
      </div>
      <div style={{ overflow: "auto", width: "100%", maxHeight: "80vh" }}>
        <div style={{ minWidth: "34em" }}>
          <ReactDiffViewer oldValue={oldString} newValue={newString} splitView={splitView} />
        </div>
      </div>
      <Button variant="outlined" onClick={handleSaveChanges} disabled={loading}>
        Save Changes
      </Button>
    </Page>
  );
}
