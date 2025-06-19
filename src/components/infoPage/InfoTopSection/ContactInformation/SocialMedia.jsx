import { useTheme } from "@emotion/react";
import { Add, Face, Facebook, GitHub, Instagram, LinkedIn, Pinterest, Reddit, Telegram, X, YouTube } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, TextField } from "@mui/material";
import { colorByPercentage, darken, lighten } from "../../../../colorGen";
import { useResumeContext } from "../../../../contexts/ResumeContext";
import { useState } from "react";

const icons = {
  LinkedIn,
  Facebook,
  GitHub,
  Instagram,
  Reddit,
  Pinterest,
  X,
  YouTube,
  Telegram,
  Other: Face,
};

export function SocialMedia() {
  const { resume } = useResumeContext();
  const basics = resume.basics;
  const [profiles, setProfiles] = useState(basics.profiles);
  const [editProfileDialogOpen, setEditProfileDialogOpen] = useState(false);
  const [platform, setPlatform] = useState("");
  const [url, setUrl] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const { authToken, replace, moveUp, moveDown, remove, add } = useResumeContext();
  function handleDeleteProfile() {
    const newProfiles = profiles.filter((profile, index) => index !== selectedIndex);
    setProfiles(newProfiles);
    remove(`basics.profiles.${selectedIndex}`);
    setEditProfileDialogOpen(false);
  }
  function handleChangeUrl(event) {
    setUrl(event.target.value);
    replace(event.target.value, `basics.profiles.${selectedIndex}.url`);
    const newProfiles = profiles.map((profile, index) => (index === selectedIndex ? { network: platform, url: event.target.value } : profile));
    setProfiles(newProfiles);
  }
  function handleChangePlatform(newPlatform) {
    setPlatform(newPlatform);
    replace(newPlatform, `basics.profiles.${selectedIndex}.network`);
    const newProfiles = profiles.map((profile, index) => (index === selectedIndex ? { network: newPlatform, url } : profile));
    setProfiles(newProfiles);
  }
  function handleMoveLeft() {
    if (selectedIndex === 0) {
      return;
    }
    const newProfiles = [...profiles];
    const temp = newProfiles[selectedIndex];
    newProfiles[selectedIndex] = newProfiles[selectedIndex - 1];
    newProfiles[selectedIndex - 1] = temp;
    setProfiles(newProfiles);
    moveUp(`basics.profiles.${selectedIndex}`);
    setSelectedIndex(selectedIndex - 1);
  }
  function handleMoveRight() {
    if (selectedIndex === profiles.length - 1) {
      return;
    }
    const newProfiles = [...profiles];
    const temp = newProfiles[selectedIndex];
    newProfiles[selectedIndex] = newProfiles[selectedIndex + 1];
    newProfiles[selectedIndex + 1] = temp;
    setProfiles(newProfiles);
    moveDown(`basics.profiles.${selectedIndex}`);
    setSelectedIndex(selectedIndex + 1);
  }
  function handleAddProfile() {
    add({ network: "Other", url: "" }, `basics.profiles`);
    setProfiles((prevProfiles) => [
      ...prevProfiles,
      {
        network: "Other",
        url: "",
      },
    ]);
    setPlatform("Other");
    setUrl("");
    setSelectedIndex(profiles.length);
    setEditProfileDialogOpen(true);
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "0.25em",
      }}
    >
      {profiles.map((profile, index) => {
        const IconComponent = icons[Object.keys(icons).find((domain) => domain.toLowerCase() === profile.network.toLowerCase())];
        const percentage = profiles.length <= 1 ? 0 : index / (profiles.length - 1);
        return (
          <IconComponent
            key={`${profile.network}/${index}`}
            onClick={() => {
              if (authToken) {
                setPlatform(profile.network);
                setUrl(profile.url);
                setSelectedIndex(index);
                setEditProfileDialogOpen(true);
              } else {
                window.open(profile.url);
              }
            }}
            sx={{ cursor: "pointer" }}
            fontSize="large"
            htmlColor={isDark ? lighten(colorByPercentage(percentage)) : darken(colorByPercentage(percentage))}
          />
        );
      })}
      {authToken && <Add onClick={handleAddProfile} />}
      {authToken && (
        <Dialog open={editProfileDialogOpen} onClose={() => setEditProfileDialogOpen(false)}>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogContent>
            <Select value={platform} sx={{ minWidth: "6em" }}>
              {Object.keys(icons).map((platformOption) => (
                <MenuItem key={platformOption} value={platformOption} onClick={() => handleChangePlatform(platformOption)}>
                  {platformOption}
                </MenuItem>
              ))}
            </Select>
            <TextField placeholder="url" value={url} multiline onChange={handleChangeUrl} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleMoveLeft} disabled={selectedIndex == 0}>
              Move Left
            </Button>
            <Button onClick={handleMoveRight} disabled={selectedIndex == profiles.length - 1}>
              Move Right
            </Button>
            <Button onClick={handleDeleteProfile}>Delete</Button>
            <Button onClick={() => setEditProfileDialogOpen(false)}>Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}
