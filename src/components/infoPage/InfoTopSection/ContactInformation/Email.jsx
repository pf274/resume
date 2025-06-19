import { useResumeContext } from "../../../../contexts/ResumeContext";
import { EditableTypography } from "../../../EditableTypography";

export function Email() {
  const { resume } = useResumeContext();
  const basics = resume.basics;
  if (!basics.email) {
    return null;
  }
  return <EditableTypography value={basics.email} path="basics.email" placeholder="email address" textFieldStyle={{ width: "100%" }} />;
}
