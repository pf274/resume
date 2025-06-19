import { Button } from "@mui/material";
import { useResumeContext } from "../../contexts/ResumeContext";
/**
 *
 * @param {{setPage: (newPage: string) => void}} param0
 * @returns
 */
export function DevControls({ setPage }) {
  const { authToken, cancelEdit } = useResumeContext();
  if (!authToken) {
    return <div className="showOnHover" onClick={() => setPage("login")} />;
  }
  return (
    <div
      className="flexRow"
      style={{
        position: "absolute",
        right: "1em",
        top: "1em",
        gap: "1em",
      }}
    >
      <Button variant="outlined" onClick={cancelEdit}>
        Cancel
      </Button>
      <Button variant="outlined" onClick={() => setPage("confirmChanges")}>
        Review Changes
      </Button>
    </div>
  );
}
