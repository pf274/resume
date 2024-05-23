import { Card, Typography } from "@mui/material";
import { ContactInformation } from "../components/infoPage/ContactInformation";
import { Summary } from "../components/infoPage/Summary";
import { Skills } from "../components/infoPage/Skills";

export function InfoPage({ resume }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "2em",
        flexWrap: "wrap",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "2em",
          textAlign: "center",
          flexWrap: "wrap-reverse",
          justifyContent: "center",
        }}
      >
        <ContactInformation resume={resume} />
        <Summary resume={resume} />
      </div>
      <Skills resume={resume} />
    </div>
  );
}
