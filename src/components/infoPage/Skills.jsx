import { ArrowDropDown } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Divider,
  Typography,
} from "@mui/material";
import { ResumeCard } from "../ResumeCard";
import { EditableSkillLevel } from "./EditableSkillLevel";
import { EditableTypography } from "../EditableTypography";
import { SkillKeywords } from "./SkillKeywords";

function SkillSection({ skill, index }) {
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
          <EditableTypography value={skill.name} placeholder="Skill Category" path={`skills.${index}.name`}/>
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
  if (!skills || skills.length == 0) {
    return <div />;
  }
  return (
    <ResumeCard style={{display: 'flex', flexDirection: 'column', textAlign: 'center'}}>
      <Typography variant="h5" sx={{ marginBottom: "1em" }}>
        Skills
      </Typography>
      {skills.map((skill, index) => (
        <SkillSection key={index} skill={skill} index={index} />
      ))}
    </ResumeCard>
  );
}
