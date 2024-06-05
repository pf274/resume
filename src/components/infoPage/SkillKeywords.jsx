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
  const { authToken, remove, add, replace, moveDown, moveUp } = useResumeContext();
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
    setNewKeyword(event.currentTarget.textContent);
    setSelectedIndex(i);
    setMenuVisible(true);
  }

  function handleEditKeyword(event) {
    setNewKeyword(event.target.value);
    replace(event.target.value, `${path}.${selectedIndex}`);
    const newKeywords = kwds.map((keyword, index) =>
      index === selectedIndex ? event.target.value : keyword
    );
    setKeywords(newKeywords);
  }

  function handleMoveLeft() {
    if (selectedIndex === 0) {
      return;
    }
    const newKeywords = [...kwds];
    const temp = newKeywords[selectedIndex];
    newKeywords[selectedIndex] = newKeywords[selectedIndex - 1];
    newKeywords[selectedIndex - 1] = temp;
    moveDown(`${path}.${selectedIndex}`);
    setSelectedIndex(selectedIndex - 1);
    setKeywords(newKeywords);
  }

  function handleMoveRight() {
    if (selectedIndex === kwds.length - 1) {
      return;
    }
    const newKeywords = [...kwds];
    const temp = newKeywords[selectedIndex];
    newKeywords[selectedIndex] = newKeywords[selectedIndex + 1];
    newKeywords[selectedIndex + 1] = temp;
    moveUp(`${path}.${selectedIndex + 1}`);
    setSelectedIndex(selectedIndex + 1);
    setKeywords(newKeywords);
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "0.25em",
      }}
    >
      {kwds.map((keyword, index) => {
        const percentage = kwds.length <= 1 ? 0 : index / (kwds.length - 1);
        const keywordColor = isDark
          ? lighten(colorByPercentage(percentage))
          : darken(colorByPercentage(percentage));
        return (
          <EditableSkillKeyword
            key={`${keyword}${index}`}
            keyword={keyword}
            path={`skills.${index}.keywords.${index}`}
            chipStyle={{
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
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                paddingTop: "1em",
                gap: "1em",
              }}
            >
              <Button onClick={handleMoveLeft} disabled={selectedIndex == 0}>
                Move Left
              </Button>
              <Button onClick={handleMoveRight} disabled={selectedIndex == kwds.length - 1}>
                Move Right
              </Button>
            </div>
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
