import { Tab, Tabs } from "@mui/material";
import { useResumeContext } from "../../contexts/ResumeContext";

/**
 *
 * @param {{page: string, setPage: (newPage: string) => void}} param0
 * @returns
 */
export function Navigation({ page, setPage }) {
  const { authToken } = useResumeContext();
  return (
    <Tabs
      value={page}
      onChange={(_, newValue) => setPage(newValue)}
      sx={{
        "& .MuiTabs-flexContainer": {
          flexWrap: "wrap",
          justifyContent: "center",
        },
      }}
    >
      <Tab value="info" label="Info" />
      <Tab value="experience" label="Experience" />
      <Tab value="education" label="Education" />
      <Tab value="projects" label="Projects" />
      <Tab value="references" label="References" />
      {authToken && <Tab value="tools" label="Admin Tools" />}
    </Tabs>
  );
}
