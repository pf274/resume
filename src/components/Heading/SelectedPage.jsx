import { AdminToolsPage } from "../../pages/AdminToolsPage";
import { ConfirmChangesPage } from "../../pages/ConfirmChangesPage";
import { EducationPage } from "../../pages/EducationPage";
import { ExperiencePage } from "../../pages/ExperiencePage";
import { InfoPage } from "../../pages/InfoPage";
import { LoginPage } from "../../pages/LoginPage";
import { ProjectsPage } from "../../pages/ProjectsPage";
import { ReferencesPage } from "../../pages/ReferencesPage";

export function SelectedPage({ page }) {
  return (
    <div>
      {page == "info" && <InfoPage />}
      {page == "education" && <EducationPage />}
      {page == "experience" && <ExperiencePage />}
      {page == "projects" && <ProjectsPage />}
      {page == "references" && <ReferencesPage />}
      {page == "login" && <LoginPage />}
      {page == "confirmChanges" && <ConfirmChangesPage />}
      {page == "tools" && <AdminToolsPage />}
    </div>
  );
}
