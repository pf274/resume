import { useResumeContext } from "./contexts/ResumeContext";
import { Navigation } from "./components/Heading/Navigation";
import { SelectedPage } from "./components/Heading/SelectedPage";
import { Name } from "./components/Heading/Name";
import { ShortTitle } from "./components/Heading/ShortTitle";
import { ThemeToggle } from "./components/Heading/ThemeToggle";
import { DevControls } from "./components/Heading/DevControls";

export function Resume() {
  const { resume, page, setPage } = useResumeContext();
  if (Object.keys(resume).length == 0) {
    return <div />;
  }
  return (
    <main>
      <Name />
      <ShortTitle />
      <ThemeToggle />
      <DevControls setPage={setPage} />
      <Navigation page={page} setPage={setPage} />
      <SelectedPage page={page} />
    </main>
  );
}
