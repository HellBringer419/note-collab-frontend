import "./App.css";
import { ThemeProvider } from "./components/theme-provider";
import ModeToggle from "./components/mode-toggle";
import CardBasedDesign from "./components/ui2/CardBasedDesign";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <ModeToggle />

        <CardBasedDesign />
      </ThemeProvider>
    </>
  );
}

/**
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <CardBasedDesign />
        <ImmersiveDesign />
        <NoteEditor />
        */
export default App;
