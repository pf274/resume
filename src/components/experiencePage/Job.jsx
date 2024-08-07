import { Button, Typography } from "@mui/material";
import { EditableResumeAccordion } from "../EditableResumeAccordion";
import { EditableTypography } from "../EditableTypography";
import { useState } from "react";
import { useResumeContext } from "../../contexts/ResumeContext";
import { Delete } from "@mui/icons-material";
import { getNewHighlight } from "../../helperFuncs";

export function Job({ job, path, handleDelete, index, handleMoveUp, handleMoveDown, numJobs }) {
  const [highlights, setHighlights] = useState(job.highlights || []);
  const { authToken, add, remove } = useResumeContext();
  function handleAddHighlight() {
    const newHighlight = getNewHighlight();
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
      <div style={{display: 'flex', flexDirection: 'column', gap: '1em'}}>
        {authToken && (
          <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '1em'}}>
            <Button onClick={() => handleDelete(index)} variant="outlined" color="error">
              Delete Job
            </Button>
            <Button onClick={() => handleMoveUp(index)} variant="outlined" disabled={index == 0}>
              Move Job Up
            </Button>
            <Button onClick={() => handleMoveDown(index)} variant="outlined" disabled={index == numJobs - 1}>
              Move Job Down
            </Button>
          </div>
        )}
        <EditableTypography
          value={job.summary}
          placeholder="Summary"
          path={`${path}.summary`}
          textFieldStyle={{ width: "100%" }}
          multiline
        />
        <ul style={{display: 'flex', flexDirection: 'column', gap: '1em'}}>
          {highlights.map((highlight, index) => (
            <li key={`${index}/${highlights.length}`}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "1em",
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
          <div>
            <Button onClick={handleAddHighlight} variant="outlined">
              Add Highlight
            </Button>
          </div>
        )}
        {job.url && !authToken && (
          <Typography>
            <a href={job.url}>See Related Website</a>
          </Typography>
        )}
        {authToken && (
          <EditableTypography value={job.url} placeholder="Related Website" path={`${path}.url`} />
        )}
      </div>
    </EditableResumeAccordion>
  );
}
