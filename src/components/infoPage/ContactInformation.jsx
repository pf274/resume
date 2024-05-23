import { useTheme } from "@emotion/react";
import { Facebook, LinkedIn } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { randomColor } from "../../colorGen";
import { ResumeCard } from "../ResumeCard";

const icons = {
  linkedin: LinkedIn,
  facebook: Facebook,
};

const darkColors = ["LightCoral", "LightSkyBlue", "LightGreen", "LightYellow"];

const lightColors = ["DarkRed", "DarkBlue", "DarkGreen", "DarkOrange"];

export function ContactInformation({ basics }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  return (
    <ResumeCard id="contactInfo">
      <Typography variant="h5" sx={{ paddingBottom: "1em" }}>
        Contact Information
      </Typography>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.33em" }}>
        <Typography>{basics.email}</Typography>
        <Typography>{basics.phone}</Typography>
        <Typography>{`${basics.location.city} ${basics.location.region}, United States`}</Typography>
        {basics.profiles.length > 0 && (
          <div>
            {basics.profiles.map((profile, index) => {
              const IconComponent =
                icons[
                  Object.keys(icons).find((domain) =>
                    profile.url.includes(domain)
                  )
                ];
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
