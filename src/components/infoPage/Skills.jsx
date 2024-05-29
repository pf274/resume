import { ArrowDropDown, ArrowDropUp, Delete } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Divider,
  Fab,
  Typography,
} from "@mui/material";
import { ResumeCard } from "../ResumeCard";
import { EditableSkillLevel } from "./EditableSkillLevel";
import { EditableTypography } from "../EditableTypography";
import { SkillKeywords } from "./SkillKeywords";
import { useResumeContext } from "../../contexts/ResumeContext";
import { useState } from "react";

function SkillSection({ skill, index, totalSkills, deleteSkill, moveSkillUp, moveSkillDown }) {
  const { authToken } = useResumeContext();
  return (
    <Accordion variant="outlined">
      <AccordionSummary expandIcon={<ArrowDropDown />}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "1em",
            flexWrap: "wrap",
            textAlign: "left",
          }}
        >
          {skill.level && <EditableSkillLevel level={skill.level} path={`skills.${index}.level`} />}
          <EditableTypography
            value={skill.name}
            placeholder="Skill Category"
            path={`skills.${index}.name`}
          />
          {authToken && (
            <div style={{ display: "flex", flexDirection: "row", gap: "1em" }}>
              <Fab
                size="small"
                onClick={(event) => {
                  deleteSkill(index);
                  event.stopPropagation();
                }}
              >
                <Delete />
              </Fab>
              <Fab
                size="small"
                onClick={(event) => {
                  event.stopPropagation();
                  if (index != 0) {
                    moveSkillUp(index);
                  }
                }}
                disabled={index == 0}
              >
                <ArrowDropUp />
              </Fab>
              <Fab
                size="small"
                onClick={(event) => {
                  event.stopPropagation();
                  if (index != totalSkills - 1) {
                    moveSkillDown(index);
                  }
                }}
                disabled={index == totalSkills - 1}
              >
                <ArrowDropDown />
              </Fab>
            </div>
          )}
        </div>
      </AccordionSummary>
      <Divider />
      <AccordionDetails>
        <SkillKeywords path={`skills.${index}.keywords`} keywords={skill.keywords} />
      </AccordionDetails>
    </Accordion>
  );
}

export function Skills({ skills }) {
  const { moveUp, moveDown, remove, add, authToken } = useResumeContext();
  const [skls, setSkills] = useState(skills);

  function deleteSkill(index) {
    const newSkills = [...skls].filter((_, i) => i !== index);
    remove(`skills.${index}`);
    setSkills(newSkills);
  }
  function addSkill() {
    add({ name: "New Skillset", level: "Beginner", keywords: ["NEW KEYWORD"] }, `skills`);
    setSkills((prevSkills) => [
      ...prevSkills,
      { name: "New Skillset", level: "Beginner", keywords: ["NEW KEYWORD"] },
    ]);
  }
  function moveSkillUp(index) {
    if (index == 0) {
      return;
    }
    setSkills((prevSkills) => {
      const newSkills = [...prevSkills];
      const temp = newSkills[index];
      newSkills[index] = newSkills[index - 1];
      newSkills[index - 1] = temp;
      return newSkills;
    });
    moveUp(`skills.${index}`);
  }
  function moveSkillDown(index) {
    if (index == skls.length - 1) {
      return;
    }
    setSkills((prevSkills) => {
      const newSkills = [...prevSkills];
      const temp = newSkills[index];
      newSkills[index] = newSkills[index + 1];
      newSkills[index + 1] = temp;
      return newSkills;
    });
    moveDown(`skills.${index}`);
  }
  if (!skls) {
    return <div />;
  }
  return (
    <ResumeCard style={{ display: "flex", flexDirection: "column", textAlign: "center" }}>
      <Typography variant="h5" sx={{ marginBottom: "1em" }}>
        Skills
      </Typography>
      {skls.length === 0 && <Typography>No Skills Found.</Typography>}
      {skls.map((skill, index) => (
        <SkillSection
          key={skill.name}
          skill={skill}
          index={index}
          deleteSkill={deleteSkill}
          moveSkillUp={moveSkillUp}
          moveSkillDown={moveSkillDown}
          totalSkills={skls.length}
        />
      ))}
      {authToken && (
        <Button onClick={addSkill} sx={{ margin: "1em" }}>
          Add Skill
        </Button>
      )}
    </ResumeCard>
  );
}
