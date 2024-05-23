import { useTheme } from "@emotion/react";
import { ResumeCard } from "../ResumeCard";
import { TypographyW } from "../TypographyW";

export function Reference({info}) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const hasReference = info.reference && info.reference.trim().length > 0;
  return (
    <ResumeCard>
      {hasReference && <TypographyW sx={{paddingBottom: '2em'}}>{info.reference}</TypographyW>}
      <TypographyW color={isDark ? "plum" : "#CC00BB"}>{`${info.name}`}</TypographyW>
    </ResumeCard>
  );
}