import { ArrowDropDown, Delete } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Divider, Fab } from "@mui/material";
import { EditableSkillLevel } from "./EditableSkillLevel";
import { EditableTypography } from "../../EditableTypography";
import { useResumeContext } from "../../../contexts/ResumeContext";
import { SkillKeywords } from "./SkillKeywords";

export function SkillSection({ skill, index, totalSkills, deleteSkill, moveSkillUp, moveSkillDown }) {
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
          <EditableTypography value={skill.name} placeholder="Skill Category" path={`skills.${index}.name`} />
          {authToken && (
            <div style={{ display: "flex", flexDirection: "row", gap: "1em" }}>
              <Fab
                size="small"
                onClick={(event) => {
                  deleteSkill(index);
                  event.stopPropagation();
                }}
                color="error"
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
