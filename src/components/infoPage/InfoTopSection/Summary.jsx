import { ResumeCard } from "../../ResumeCard";
import { ProfilePic } from "./Summary/ProfilePic";
import { LongDescription } from "./Summary/LongDescription";

export function Summary() {
  return (
    <ResumeCard
      style={{
        flex: 1,
        minWidth: "300px",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      <ProfilePic />
      <LongDescription />
    </ResumeCard>
  );
}
