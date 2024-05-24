import { useTheme } from "@emotion/react";
import { colorByPercentage, darken, lighten } from "../../colorGen";
import { EditableSkillKeyword } from "./EditableSkillKeyword";
import { useState } from "react";
import { useResumeContext } from "../../contexts/ResumeContext";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";


export function SkillKeywords({keywords, path}) {
  const [kwds, setKeywords] = useState(keywords);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [newKeyword, setNewKeyword] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);
  const {authToken, resume, setResume} = useResumeContext();
  const theme = useTheme();
  const isDark = theme.palette.mode == 'dark';

  function deleteKeyword() {
    const newKeywords = kwds.filter((keyword, index) => index !== selectedIndex);
    setKeywords(newKeywords);
    setSelectedIndex(0);
    setMenuVisible(false);
    /*
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
    const lastPart = Number.isNaN(Number(pathParts[pathParts.length - 1])) ? pathParts[pathParts.length - 1] : Number(pathParts[pathParts.length - 1]);
    target.splice(lastPart, 1);
    setResume(newResume);
    */
  }
  function addKeyword() {

  }

  function handleClose(event) {
    setMenuVisible(false);
    event.stopPropagation();
  }

  function showMenu(event, i) {
    setNewKeyword(event.target.innerHTML);
    setSelectedIndex(i);
    setMenuVisible(true);
  }

  return <div style={{display: 'flex', justifyContent: 'center', flexWrap: 'wrap'}}>
    {kwds.map((keyword, index) => {
      const keywordColor = isDark
        ? lighten(
            colorByPercentage(index / (kwds.length - 1))
          )
        : darken(
            colorByPercentage(index / (kwds.length - 1))
          );
        return (
          <EditableSkillKeyword
            key={index}
            keyword={keyword}
            path={`skills.${index}.keywords.${index}`}
            chipStyle={{
              margin: "0.25em",
              backgroundColor: keywordColor,
              color: isDark ? "black" : "white",
              fontWeight: "bold"
            }}
            index={index}
            onSelect={showMenu}
          />
        );
      })}
      {authToken && <Dialog open={menuVisible} onClose={handleClose}>
        <DialogTitle>Edit Skill Keyword</DialogTitle>
        <DialogContent>
          <TextField value={newKeyword} onChange={(event) => setNewKeyword(event.target.value)}/>
        </DialogContent>
        <DialogActions>
          <Button color="warning" onClick={deleteKeyword}>Delete</Button>
          <Button color="primary" disabled={newKeyword.length == 0}>Save</Button>
        </DialogActions>
      </Dialog>}
  </div>
}