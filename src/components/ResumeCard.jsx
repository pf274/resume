import { Card } from "@mui/material";

export function ResumeCard({ children, style, variant = "elevation" }) {
  return (
    <Card variant={variant} style={style} className="resumeCard">
      {children}
    </Card>
  );
}
