import { Card } from "@mui/material";
import { Page } from "../components/Page";
import { TimelineCreator } from "../components/adminToolsPage/TimelineCreator";

export function AdminToolsPage() {
  return (
    <Page>
      <Card>
        <TimelineCreator />
      </Card>
    </Page>
  );
}
