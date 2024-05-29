import { TextField } from "@mui/material";
import { useResumeContext } from "../contexts/ResumeContext";
import { useState } from "react";
import { TypographyW } from "./TypographyW";

export function EditableTypography({
  value,
  path,
  placeholder,
  typographyStyle = {},
  textFieldStyle = {},
  typographyVariant,
  color,
  multiline = false,
  onUpdated = () => {},
}) {
  const [val, setValue] = useState(value);
  const { authToken, replace } = useResumeContext();
  function updateValue(newValue) {
    replace(newValue, path);
    setValue(newValue);
    onUpdated(newValue);
  }
  return authToken ? (
    <TextField
      value={val}
      multiline={multiline}
      onChange={(event) => updateValue(event.target.value)}
      placeholder={placeholder}
      style={{
        // width: multiline ? undefined : `${Math.max(placeholder?.length || 0, val.length) + 1}ch`,
        ...textFieldStyle,
      }}
      onClick={(event) => event.stopPropagation()}
    />
  ) : (
    <TypographyW
      variant={typographyVariant}
      style={{ whiteSpace: "pre-line", ...typographyStyle }}
      color={color}
    >
      {val}
    </TypographyW>
  );
}
