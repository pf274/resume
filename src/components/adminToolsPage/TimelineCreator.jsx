import { Button, Divider, Fab, TextField, Typography } from "@mui/material";
import { ResumeCard } from "../ResumeCard";
import { useEffect, useState } from "react";
import { useThemeContext } from "../../contexts/ThemeContext";
import { Delete } from "@mui/icons-material";

const defaultColors = {
  light: "#95d6b4",
  dark: "#0d542f",
};

function dateToString(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${year}-${month < 10 ? "0" : ""}${month}-${day < 10 ? "0" : ""}${day}`;
}
function stringToDate(dateString) {
  const parts = dateString.split("-");
  return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
}

export function DateSelector({ startDate, setStartDate, endDate, setEndDate }) {
  return (
    <div style={{ display: "flex", flexDirection: "row", gap: "1em", flexWrap: "wrap" }}>
      <div>
        <Typography>Start Date:</Typography>
        <TextField
          type="date"
          value={dateToString(startDate)}
          onChange={(event) => {
            setStartDate(stringToDate(event.target.value));
          }}
        />
      </div>
      <div>
        <Typography>End Date:</Typography>
        <TextField
          type="date"
          value={dateToString(endDate)}
          onChange={(event) => {
            setEndDate(stringToDate(event.target.value));
          }}
        />
      </div>
    </div>
  );
}

export function TimeBlock({ timeBlockUpdate, index, deleteBlock, timeBlock }) {
  const [startDate, setStartDate] = useState(timeBlock.startDate);
  const [endDate, setEndDate] = useState(timeBlock.endDate);
  const [name, setName] = useState(timeBlock.name);
  const { currentTheme } = useThemeContext();
  const [color, setColor] = useState(timeBlock.color);
  useEffect(() => {
    timeBlockUpdate(index, { startDate, endDate, name, color });
  }, [startDate, endDate, name, color]);
  return (
    <ResumeCard variant="outlined" style={{ backgroundColor: color }}>
      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "1em", alignItems: "center" }}>
        <div>
          <Typography>Name:</Typography>
          <TextField value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <DateSelector startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Typography>{`Color: ${color}`}</Typography>
          <TextField
            type="color"
            value={color}
            onChange={(e) => {
              setColor(e.target.value);
            }}
            style={{ width: "3em" }}
          />
        </div>
        <div>
          <Typography sx={{ opacity: 0 }}>sdfs </Typography>
          <Fab size="small" onClick={() => deleteBlock(index)} color="error">
            <Delete />
          </Fab>
        </div>
      </div>
    </ResumeCard>
  );
}

export function TimelineCreator() {
  const currentDate = new Date();
  const [startDate, setStartDate] = useState(currentDate);
  const [endDate, setEndDate] = useState(currentDate);
  const [timeBlocks, setTimeBlocks] = useState([]);
  const { currentTheme } = useThemeContext();
  const isDark = currentTheme.palette.mode === "dark";

  function timeBlockUpdate(index, timeBlock) {
    const newTimeBlocks = [...timeBlocks];
    newTimeBlocks[index] = timeBlock;
    setTimeBlocks(newTimeBlocks);
  }
  function deleteBlock(index) {
    const newTimeBlocks = timeBlocks.filter((_, i) => i !== index);
    setTimeBlocks(newTimeBlocks);
  }
  function addTimeBlock() {
    debugger;
    const newTimeBlock = {
      startDate: new Date(),
      endDate: new Date(),
      name: "New Time Block",
      color: isDark ? defaultColors.dark : defaultColors.light,
      id: Math.random(),
    };
    setTimeBlocks([...timeBlocks, newTimeBlock]);
  }
  return (
    <ResumeCard style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
      <Typography variant="h6" sx={{ textAlign: "center" }}>
        Timeline Creator
      </Typography>
      <div style={{ display: "flex", flexDirection: "row", flexWrap: "nowrap", gap: "1em" }}>
        <div>
          <DateSelector startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
        </div>
        <div style={{ flex: 1 }}></div>
      </div>
      <Divider />
      <Typography sx={{ textAlign: "center" }}>Time Blocks</Typography>
      <div style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
        {timeBlocks.map((timeBlock, index) => (
          <TimeBlock
            key={`${index}/${timeBlocks.length}/${timeBlock.id}`}
            timeBlockUpdate={timeBlockUpdate}
            index={index}
            deleteBlock={deleteBlock}
            timeBlock={timeBlock}
          />
        ))}
      </div>
      <Button variant="outlined" color="info" onClick={addTimeBlock}>
        Add Time Block
      </Button>
    </ResumeCard>
  );
}
