import { useTheme } from "@emotion/react";
import { useResumeContext } from "../../contexts/ResumeContext"
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

export function EditableSkillLevel({level, path}) {
  const [lvl, setLevel] = useState(level);
  const [anchorEl, setAnchorEl] = useState(null);
  const {authToken, resume, setResume} = useResumeContext();
  const theme = useTheme();
  const isDark = theme.palette.mode == 'dark';
  const levelColor = Object.keys(levelsDark).includes(
    level.toLowerCase()
  )
    ? isDark
      ? levelsDark[level.toLowerCase()]
      : levelsLight[level.toLowerCase()]
    : undefined;

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
    const newResume = Object.assign({}, resume);
    if (!path) {
      throw new Error("Must define a path for an editable skill level component");
    }
    const pathParts = path.split(".");
    let target = newResume;
    for (let i = 0; i < pathParts.length - 1; i++) {
      let part = pathParts[i];
      if (!isNaN(part)) {
        part = Number(part);
      }
      target = target[part];
    }
    target[pathParts[pathParts.length - 1]] = newSkillLevel;
    setLevel(newSkillLevel);
    setResume(newResume);
  }
  return (
    authToken ? (
      <div>
        <Button onClick={handleToggleMenu} style={{color: levelColor}}>{lvl}</Button>
        <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={handleClose} style={{zIndex: 1000}}>
          <MenuItem onClick={updateSkillLevel}>Beginner</MenuItem>
          <MenuItem onClick={updateSkillLevel}>Intermediate</MenuItem>
          <MenuItem onClick={updateSkillLevel}>Advanced</MenuItem>
          <MenuItem onClick={updateSkillLevel}>Expert</MenuItem>
        </Menu>
      </div>
    ) : (<Chip
      label={lvl}
      style={{
        backgroundColor: levelColor,
        color: isDark ? "black" : "white",
        fontWeight: "bold",
      }}
    />)
  )
}