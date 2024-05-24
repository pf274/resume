import { useResumeContext } from "../../contexts/ResumeContext"
import { Chip } from "@mui/material";


export function EditableSkillKeyword({keyword, chipStyle, onSelect, index}) {
  const {authToken} = useResumeContext();
  return (
    <div>
      <Chip onClick={authToken ? (event) => onSelect(event, index) : undefined} style={{...chipStyle}} label={keyword}/>
    </div>
  )
}