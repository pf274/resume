import { useTheme } from "@emotion/react";
import { colorByPercentage, darken, lighten } from "../../colorGen";
import { EditableSkillKeyword } from "./EditableSkillKeyword";
import { useState } from "react";
import { useResumeContext } from "../../contexts/ResumeContext";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  TextField,
} from "@mui/material";
import { Add } from "@mui/icons-material";

export function SkillKeywords({ keywords, path }) {
  const [kwds, setKeywords] = useState(keywords);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [newKeyword, setNewKeyword] = useState("");
  const [menuVisible, setMenuVisible] = useState(false);
  const { authToken, remove, add, replace } = useResumeContext();
  const theme = useTheme();
  const isDark = theme.palette.mode == "dark";

  function deleteKeyword() {
    remove(`${path}.${selectedIndex}`);
    const newKeywords = kwds.filter((keyword, index) => index !== selectedIndex);
    setKeywords(newKeywords);
    setSelectedIndex(0);
    setMenuVisible(false);
  }
  function addKeyword() {
    add("NEW KEYWORD", path);
    setKeywords([...kwds, "NEW KEYWORD"]);
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

  function handleEditKeyword(event) {
    setNewKeyword(event.target.value);
    replace(event.target.value, `${path}.${selectedIndex}`);
  }

  return (
    <div
      style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", alignItems: "center" }}
    >
      {kwds.map((keyword, index) => {
        const keywordColor = isDark
          ? lighten(colorByPercentage(index / (kwds.length - 1)))
          : darken(colorByPercentage(index / (kwds.length - 1)));
        return (
          <EditableSkillKeyword
            key={index}
            keyword={keyword}
            path={`skills.${index}.keywords.${index}`}
            chipStyle={{
              margin: "0.25em",
              backgroundColor: keywordColor,
              color: isDark ? "black" : "white",
              fontWeight: "bold",
            }}
            index={index}
            onSelect={showMenu}
          />
        );
      })}
      {authToken && (
        <Fab size="small" onClick={addKeyword}>
          <Add />
        </Fab>
      )}
      {authToken && (
        <Dialog open={menuVisible} onClose={handleClose}>
          <DialogTitle>Edit Skill Keyword</DialogTitle>
          <DialogContent>
            <TextField value={newKeyword} onChange={handleEditKeyword} />
          </DialogContent>
          <DialogActions>
            <Button color="warning" onClick={deleteKeyword}>
              Delete
            </Button>
            <Button color="primary" onClick={handleClose}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}
