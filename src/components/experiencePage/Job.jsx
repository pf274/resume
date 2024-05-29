import { Button, Fab, Typography } from "@mui/material";
import { EditableResumeAccordion } from "../EditableResumeAccordion";
import { TypographyW } from "../TypographyW";
import { EditableTypography } from "../EditableTypography";
import { useState } from "react";
import { useResumeContext } from "../../contexts/ResumeContext";
import { Add, Delete } from "@mui/icons-material";

export function Job({ job, path }) {
  const [highlights, setHighlights] = useState(job.highlights || []);
  const { authToken, add, remove } = useResumeContext();
  function handleAddHighlight() {
    const randomNumber = Math.floor(Math.random() * 999_999_999).toLocaleString();
    const newHighlight = [
      `Saved the world ${randomNumber} times`,
      `Benched ${randomNumber} pounds`,
      `Saved the company $${randomNumber} in costs`,
      `Consumed ${randomNumber} enchiladas in one sitting`,
    ][Math.floor(Math.random() * 4)];
    setHighlights([...highlights, newHighlight]);
    add(newHighlight, `${path}.highlights`);
  }
  function handleDeleteHighlight(index) {
    const newHighlights = highlights.filter((highlight, i) => i !== index);
    setHighlights(newHighlights);
    remove(`${path}.highlights.${index}`);
  }
  return (
    <EditableResumeAccordion
      title={job.name}
      title2={job.position}
      startDateString={job.startDate}
      endDateString={job.endDate}
      titlePath={`${path}.name`}
      title2Path={`${path}.position`}
      startDatePath={`${path}.startDate`}
      endDatePath={`${path}.endDate`}
    >
      <div>
        <EditableTypography
          value={job.summary}
          placeholder="Summary"
          path={`${path}.summary`}
          textFieldStyle={{ width: "100%" }}
          multiline
        />

        <ul>
          {highlights.map((highlight, index) => (
            <li key={`${index}/${highlights.length}`}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "1em",
                  marginTop: "1em",
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <EditableTypography
                  value={highlight}
                  path={`${path}.highlights.${index}`}
                  multiline
                  onUpdated={(newHighlight) => {
                    const newHighlights = [...highlights];
                    newHighlights[index] = newHighlight;
                    setHighlights(newHighlights);
                  }}
                />
                {authToken && <Delete onClick={() => handleDeleteHighlight(index)} />}
              </div>
            </li>
          ))}
        </ul>
        {authToken && (
          <Button onClick={handleAddHighlight} variant="outlined">
            Add Highlight
          </Button>
        )}
        {job.url && (
          <Typography>
            <a href={job.url}>See Related Website</a>
          </Typography>
        )}
      </div>
    </EditableResumeAccordion>
  );
}
