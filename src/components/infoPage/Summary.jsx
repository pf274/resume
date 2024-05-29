import {
  Alert,
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { ResumeCard } from "../ResumeCard";
import { EditableTypography } from "../EditableTypography";
import { useResumeContext } from "../../contexts/ResumeContext";
import { useState } from "react";

export function Summary({ basics }) {
  const { authToken, replace } = useResumeContext();
  const [profilePicOpen, setProfilePicOpen] = useState(false);
  const [image, setImage] = useState(basics.image || "");

  function handleChangeProfilePic(event) {
    setImage(event.target.value);
    replace(event.target.value, "basics.image");
  }

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
      {image && (
        <Avatar
          alt="Profile Image"
          src={image}
          style={{
            width: "11em",
            height: "11em",
            alignSelf: "center",
          }}
          onClick={() => {
            if (authToken) {
              setProfilePicOpen(true);
            }
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
        <EditableTypography
          path="basics.summary"
          value={basics.summary}
          multiline
          textFieldStyle={{ width: "100%" }}
          placeholder="summary"
        />
        {authToken && (
          <Dialog open={profilePicOpen} onClose={() => setProfilePicOpen(false)}>
            <DialogTitle>Profile Picture</DialogTitle>
            <DialogContent>
              <TextField
                placeholder="url"
                value={image}
                onChange={handleChangeProfilePic}
                multiline
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setProfilePicOpen(false)}>Close</Button>
            </DialogActions>
          </Dialog>
        )}
      </div>
    </ResumeCard>
  );
}
