import { useTheme } from "@emotion/react";
import { Facebook, LinkedIn } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { randomColor } from "../../colorGen";
import { ResumeCard } from "../ResumeCard";
import { EditableTypography } from "../EditableTypography";
import { useResumeContext } from "../../contexts/ResumeContext";

const icons = {
  linkedin: LinkedIn,
  facebook: Facebook,
};

const darkColors = ["LightCoral", "LightSkyBlue", "LightGreen", "LightYellow"];

const lightColors = ["DarkRed", "DarkBlue", "DarkGreen", "DarkOrange"];

export function ContactInformation({ basics }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const { authToken } = useResumeContext();
  return (
    <ResumeCard id="contactInfo">
      <Typography variant="h5" sx={{ paddingBottom: "1em" }}>
        Contact Information
      </Typography>
      <div
        style={{ display: "flex", flexDirection: "column", gap: "0.33em", alignItems: "center" }}
      >
        <EditableTypography
          value={basics.email}
          path="basics.email"
          placeholder="email address"
          textFieldStyle={{ width: "100%" }}
        />
        <EditableTypography
          value={basics.phone}
          path="basics.phone"
          placeholder="phone"
          textFieldStyle={{ width: "100%" }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            alignSelf: "center",
            flexWrap: "wrap",
            gap: authToken ? "0.33em" : undefined,
          }}
        >
          <EditableTypography
            value={basics.location.city}
            path="basics.location.city"
            placeholder="city"
          />
          <div style={{ width: "0.6ch" }} />
          <EditableTypography
            value={basics.location.region}
            path="basics.location.region"
            placeholder="state"
          />
          <Typography>{`, United States`}</Typography>
        </div>
        {basics.profiles.length > 0 && (
          <div>
            {basics.profiles.map((profile, index) => {
              const IconComponent =
                icons[Object.keys(icons).find((domain) => profile.url.includes(domain))];
              return (
                <IconComponent
                  key={index}
                  onClick={() => window.open(profile.url)}
                  sx={{ cursor: "pointer" }}
                  fontSize="large"
                  htmlColor={
                    index < darkColors.length
                      ? isDark
                        ? darkColors[index]
                        : lightColors[index]
                      : randomColor()
                  }
                />
              );
            })}
          </div>
        )}
      </div>
    </ResumeCard>
  );
}
