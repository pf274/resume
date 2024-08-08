import { Card } from "@mui/material";

export function ResumeCard({ children, style, variant = "elevation" }) {
  return (
    <Card variant={variant} style={{ padding: "1.5em", ...style }}>
      {children}
    </Card>
  );
}
