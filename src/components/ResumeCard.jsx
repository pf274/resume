import { Card } from "@mui/material"


export function ResumeCard({children, style}) {
  return <Card style={{padding: '1.5em', ...style}}>{children}</Card>
}