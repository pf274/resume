import { useResumeContext } from "../../../../contexts/ResumeContext";
import { EditableTypography } from "../../../EditableTypography";

export function Phone() {
  const { resume } = useResumeContext();
  const basics = resume.basics;
  if (!basics.phone) {
    return null;
  }
  return <EditableTypography value={basics.phone} path="basics.phone" placeholder="phone number" textFieldStyle={{ width: "100%" }} />;
}
