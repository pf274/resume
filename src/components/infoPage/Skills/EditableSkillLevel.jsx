import { useTheme } from "@emotion/react";
import { useResumeContext } from "../../../contexts/ResumeContext";
import { Button, Chip, Menu, MenuItem } from "@mui/material";
import { useState } from "react";

const levelsDark = {
  beginner: "LightSalmon",
  intermediate: "LightSkyBlue",
  advanced: "LightGreen",
  expert: "Plum",
};

const levelsLight = {
  beginner: "darkorange",
  intermediate: "darkblue",
  advanced: "darkgreen",
  expert: "#CC00BB",
};

export function EditableSkillLevel({ level, path }) {
  const [lvl, setLevel] = useState(level);
  const [anchorEl, setAnchorEl] = useState(null);
  const { authToken, replace } = useResumeContext();
  const theme = useTheme();
  const isDark = theme.palette.mode == "dark";
  const levelColor = Object.keys(levelsDark).includes(lvl.toLowerCase()) && (isDark ? levelsDark[lvl.toLowerCase()] : levelsLight[lvl.toLowerCase()]);

  function handleToggleMenu(event) {
    setAnchorEl(event.currentTarget);
    event.stopPropagation();
  }

  function handleClose(event) {
    setAnchorEl(null);
    event.stopPropagation();
  }

  function updateSkillLevel(event) {
    const newSkillLevel = event.target.innerText;
    setAnchorEl(null);
    event.stopPropagation();
    if (!path) {
      throw new Error("Must define a path for an editable skill level component");
    }
    replace(newSkillLevel, path);
    setLevel(newSkillLevel);
  }
  return authToken ? (
    <div>
      <Button onClick={handleToggleMenu} style={{ color: levelColor }}>
        {lvl}
      </Button>
      <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleClose} style={{ zIndex: 1000 }}>
        <MenuItem onClick={updateSkillLevel}>Beginner</MenuItem>
        <MenuItem onClick={updateSkillLevel}>Intermediate</MenuItem>
        <MenuItem onClick={updateSkillLevel}>Advanced</MenuItem>
        <MenuItem onClick={updateSkillLevel}>Expert</MenuItem>
      </Menu>
    </div>
  ) : (
    <Chip
      label={lvl}
      style={{
        backgroundColor: levelColor,
        color: isDark ? "black" : "white",
        fontWeight: "bold",
      }}
    />
  );
}
