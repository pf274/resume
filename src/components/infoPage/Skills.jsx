import { Button, Typography } from "@mui/material";
import { ResumeCard } from "../ResumeCard";
import { useResumeContext } from "../../contexts/ResumeContext";
import { useState } from "react";
import { SkillSection } from "./Skills/SkillSection";

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
    setSkills((prevSkills) => [...prevSkills, { name: "New Skillset", level: "Beginner", keywords: ["NEW KEYWORD"] }]);
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
