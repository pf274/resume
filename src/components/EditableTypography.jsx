import { TextField } from "@mui/material";
import { useResumeContext } from "../contexts/ResumeContext";
import { useState } from "react";
import { TypographyW } from "./TypographyW";

export function EditableTypography({ value, path, placeholder, typographyStyle = {}, textFieldStyle = {}, typographyVariant, color, multiline = false }) {
  const [val, setValue] = useState(value);
  const { authToken, resume, setResume } = useResumeContext();
  function updateValue(newValue) {
    const newResume = Object.assign({}, resume);
    if (!path) {
      throw new Error("Must define a path for an editable typography component");
    }
    const pathParts = path.split(".");
    let target = newResume;
    for (let i = 0; i < pathParts.length - 1; i++) {
      let part = pathParts[i];
      if (!isNaN(part)) {
        part = Number(part);
      }
      target = target[part];
    }
    target[pathParts[pathParts.length - 1]] = newValue;
    setValue(newValue);
    setResume(newResume);
  }
  return authToken ? (
    <TextField
      value={val}
      multiline={multiline}
      onChange={(event) => updateValue(event.target.value)}
      placeholder={placeholder}
      style={{
        width: multiline ? undefined : `${Math.max(placeholder?.length || 0, val.length) + 10}ch`,
        ...textFieldStyle
      }}
      onSelect={(event) => event.stopPropagation()}
    />
  ) : (
    <TypographyW variant={typographyVariant} style={{ whiteSpace: 'pre-line', ...typographyStyle}} color={color}>{val}</TypographyW>
  )
}