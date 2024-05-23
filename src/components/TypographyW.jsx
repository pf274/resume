import { Typography } from "@mui/material";

export function TypographyW({ children, style, variant, color }) {
  return <Typography variant={variant} style={{ whiteSpace: 'pre-line', ...style}} color={color}>{children}</Typography>
}