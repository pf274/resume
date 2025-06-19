import { Avatar } from "@mui/material";
import { useResumeContext } from "../../../../contexts/ResumeContext";
import { useState } from "react";

export function ProfilePic() {
  const [profilePicOpen, setProfilePicOpen] = useState(false);
  const { resume, authToken } = useResumeContext();
  const [image, setImage] = useState(resume?.basics?.image || null);

  function handleChangeProfilePic(event) {
    setImage(event.target.value);
    replace(event.target.value, "basics.image");
  }

  return (
    <div>
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
      {authToken && (
        <Dialog open={profilePicOpen} onClose={() => setProfilePicOpen(false)}>
          <DialogTitle>Profile Picture</DialogTitle>
          <DialogContent>
            <TextField placeholder="url" value={image} onChange={handleChangeProfilePic} multiline />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setProfilePicOpen(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}
