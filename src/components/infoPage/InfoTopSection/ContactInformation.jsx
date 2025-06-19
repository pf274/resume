import { Typography } from "@mui/material";
import { ResumeCard } from "../../ResumeCard";
import { SocialMedia } from "./ContactInformation/SocialMedia";
import { Email } from "./ContactInformation/Email";
import { Phone } from "./ContactInformation/Phone";
import { Address } from "./ContactInformation/Address";

export function ContactInformation() {
  return (
    <ResumeCard style={{ alignItems: "center" }}>
      <Typography variant="h5">Contact Information</Typography>
      <Email />
      <Phone />
      <Address />
      <SocialMedia />
    </ResumeCard>
  );
}
