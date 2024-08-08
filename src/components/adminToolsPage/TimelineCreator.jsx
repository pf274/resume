import { Button, Divider, Fab, TextField, Typography } from "@mui/material";
import { ResumeCard } from "../ResumeCard";
import { useEffect, useState } from "react";
import { useThemeContext } from "../../contexts/ThemeContext";
import { Delete } from "@mui/icons-material";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const defaultColors = {
  light: "#95d6b4",
  dark: "#0d542f",
};

function getCurrentDate() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const day = currentDate.getDate();
  return new Date(year, month, day);
}
function getYesterday() {
  const currentDate = getCurrentDate();
  const yesterday = new Date(currentDate);
  yesterday.setDate(yesterday.getDate() - 1);
  return yesterday;
}

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
  const [color, setColor] = useState(timeBlock.color);
  const [textColor, setTextColor] = useState(timeBlock.textColor);
  useEffect(() => {
    timeBlockUpdate(index, { startDate, endDate, name, color, textColor });
  }, [startDate, endDate, name, color, textColor]);
  return (
    <ResumeCard variant="outlined" style={{ backgroundColor: color }}>
      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "1em", alignItems: "center" }}>
        <div>
          <Typography>Name:</Typography>
          <TextField value={name} onChange={(e) => setName(e.target.value)} multiline />
        </div>
        <DateSelector startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Typography>{`Background Color:`}</Typography>
          <TextField
            type="color"
            value={color}
            onChange={(e) => {
              setColor(e.target.value);
            }}
            style={{ width: "3em" }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Typography>{`Text Color:`}</Typography>
          <TextField
            type="color"
            value={textColor}
            onChange={(e) => {
              setTextColor(e.target.value);
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
  const currentDate = getCurrentDate();
  const yesterday = getYesterday();
  const [startDate, setStartDate] = useState(yesterday);
  const [endDate, setEndDate] = useState(currentDate);
  const [timeBlocks, setTimeBlocks] = useState([]);
  const [svgData, setSvgData] = useState(getSvgData([]));
  const { currentTheme } = useThemeContext();
  const isDark = currentTheme.palette.mode === "dark";
  const [dateColor, setDateColor] = useState(isDark ? "#FFFFFF" : "#000000");
  const [backgroundColor, setBackgroundColor] = useState(isDark ? "#000000" : "#FFFFFF");
  function getSvgWidth() {
    return 2000;
  }
  function getSvgData(currentTimeBlocks) {
    const timeElapsed = endDate.valueOf() - startDate.valueOf();
    const newSvgWidth = getSvgWidth();
    const svgHeight = 200;
    let newSvgData = `<?xml version="1.0" encoding="utf-8"?><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${newSvgWidth} ${svgHeight}" width="${newSvgWidth}" height="${svgHeight}">`;
    currentTimeBlocks.forEach((timeBlock) => {
      const blockStartPercentage = (timeBlock.startDate.valueOf() - startDate.valueOf()) / timeElapsed;
      const blockEndPercentage = (timeBlock.endDate.valueOf() - startDate.valueOf()) / timeElapsed;
      newSvgData += `<path d="`;
      newSvgData += `M ${newSvgWidth * blockStartPercentage} 0 `; // top left
      newSvgData += `L ${newSvgWidth * blockStartPercentage} ${(svgHeight / 3) * 2} `; // bottom left
      newSvgData += `L ${newSvgWidth * blockEndPercentage} ${(svgHeight / 3) * 2} `; // bottom right
      newSvgData += `L ${newSvgWidth * blockEndPercentage} 0 `; // top right
      newSvgData += `Z" fill="${timeBlock.color}" />`; // color
      // name
      newSvgData += `<text text-anchor="middle" dominant-baseline="middle" font-family="Aptos,Aptos_MSFontService,sans-serif" font-weight="400" font-size="24" `;
      newSvgData += `x="${(newSvgWidth * (blockStartPercentage + blockEndPercentage)) / 2}" `;
      const lineOffset = (timeBlock.name.split("\n").length + 1) * 15;
      newSvgData += `y="${Math.floor(svgHeight / 3) - lineOffset}" fill="${timeBlock.textColor}">`;
      timeBlock.name.split("\n").forEach((line, i) => {
        newSvgData += `<tspan x="${(newSvgWidth * (blockStartPercentage + blockEndPercentage)) / 2}" dy="${30}">${line}</tspan>`;
      });
      newSvgData += `</text>`;
      // dates
      newSvgData += `<text text-anchor="start" dominant-baseline="text-after-edge" font-family="Aptos,Aptos_MSFontService,sans-serif" font-weight="400" font-size="16" `;
      newSvgData += `x="${newSvgWidth * blockStartPercentage + 10}" `;
      newSvgData += `y="${svgHeight}" fill="${dateColor}">`;
      newSvgData += `${months[timeBlock.startDate.getMonth()]} ${timeBlock.startDate.getFullYear()}`;
      newSvgData += `</text>`;
      newSvgData += `<text text-anchor="end" dominant-baseline="text-after-edge" font-family="Aptos,Aptos_MSFontService,sans-serif" font-weight="400" font-size="16" `;
      newSvgData += `x="${newSvgWidth * blockEndPercentage - 10}" `;
      newSvgData += `y="${svgHeight}" fill="${dateColor}">`;
      newSvgData += `${months[timeBlock.endDate.getMonth()]} ${timeBlock.endDate.getFullYear()}`;
      newSvgData += `</text>`;
      // dividers
      newSvgData += `<line x1="${newSvgWidth * blockStartPercentage}" y1="0" x2="${
        newSvgWidth * blockStartPercentage
      }" y2="${svgHeight}" stroke="#9c9c9c" />`;
      newSvgData += `<line x1="${newSvgWidth * blockEndPercentage}" y1="0" x2="${
        newSvgWidth * blockEndPercentage
      }" y2="${svgHeight}" stroke="#9c9c9c" />`;
    });
    newSvgData += "</svg>";
    return newSvgData.replace(/(>)(<)/g, "$1\n$2").trim();
  }

  function handleSave() {
    const svgData = getSvgData(timeBlocks);
    const svgBlob = new Blob([svgData], { type: "image/svg+xml" });
    const svgUrl = URL.createObjectURL(svgBlob);
    const a = document.createElement("a");
    a.href = svgUrl;
    a.download = "timeline.svg";
    a.click();
    URL.revokeObjectURL(svgUrl);
  }

  useEffect(() => {
    setSvgData(getSvgData(timeBlocks));
  }, [startDate, endDate, dateColor]);

  function timeBlockUpdate(index, timeBlock) {
    const newTimeBlocks = [...timeBlocks];
    newTimeBlocks[index] = timeBlock;
    setTimeBlocks(newTimeBlocks);
    setSvgData(getSvgData(newTimeBlocks));
  }
  function deleteBlock(index) {
    const newTimeBlocks = timeBlocks.filter((_, i) => i !== index);
    setTimeBlocks(newTimeBlocks);
  }
  function addTimeBlock() {
    const newTimeBlock = {
      startDate: getYesterday(),
      endDate: getCurrentDate(),
      name: "New Time Block",
      color: isDark ? defaultColors.dark : defaultColors.light,
      textColor: isDark ? "#FFFFFF" : "#000000",
      id: Math.random(),
    };
    setTimeBlocks([...timeBlocks, newTimeBlock]);
  }
  return (
    <ResumeCard style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
      <Typography variant="h6" sx={{ textAlign: "center" }}>
        Timeline Creator
      </Typography>
      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "1em" }}>
        <div>
          <DateSelector startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Typography>Date Color:</Typography>
          <TextField type="color" value={dateColor} onChange={(e) => setDateColor(e.target.value)} style={{ width: "3em" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Typography>Background Color:</Typography>
          <TextField type="color" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} style={{ width: "3em" }} />
        </div>
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
      <Divider />
      <Typography sx={{ textAlign: "center" }}>Preview</Typography>
      <div
        style={{
          padding: "1em",
          borderWidth: 2,
          borderRadius: "0.5em",
          borderColor: isDark ? "gray" : "black",
          borderStyle: "solid",
          backgroundColor,
          overflowX: "auto",
          height: 200,
          maxWidth: "calc(100vw - 200px)",
          alignSelf: "center",
        }}
      >
        <img src={`data:image/svg+xml,${encodeURIComponent(svgData)}`} style={{ display: "block", height: "100%" }} />
      </div>
      <Divider />
      <Button variant="outlined" color="success" onClick={handleSave}>
        Save
      </Button>
    </ResumeCard>
  );
}
