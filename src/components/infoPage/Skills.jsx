import { ArrowDropDown } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Chip,
  Divider,
  Typography,
} from "@mui/material";
import {
  colorByPercentage,
  darken,
  lighten,
} from "../../colorGen";
import { useTheme } from "@emotion/react";
import { ResumeCard } from "../ResumeCard";

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

function SkillSection({ skill }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
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
          {skill.level && (
            <Chip
              label={skill.level}
              style={{
                backgroundColor: Object.keys(levelsDark).includes(
                  skill.level.toLowerCase()
                )
                  ? isDark
                    ? levelsDark[skill.level.toLowerCase()]
                    : levelsLight[skill.level.toLowerCase()]
                  : undefined,
                color: isDark ? "black" : "white",
                fontWeight: "bold",
              }}
            />
          )}
          <Typography>{skill.name}</Typography>
        </div>
      </AccordionSummary>
      <Divider />
      <AccordionDetails>
        {skill.keywords.map((keyword, index) => (
          <Chip
            key={index}
            label={keyword}
            sx={{
              margin: "0.25em",
              backgroundColor: isDark
                ? lighten(
                    colorByPercentage(index / (skill.keywords.length - 1))
                  )
                : darken(
                    colorByPercentage(index / (skill.keywords.length - 1))
                  ),
              color: isDark ? "black" : "white",
              fontWeight: "bold",
            }}
          />
        ))}
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
        <SkillSection key={index} skill={skill} />
      ))}
    </ResumeCard>
  );
}
