import "./App.css";
import { ThemeProvider } from "@/components/theme-provider";
import ModeToggle from "@/components/mode-toggle";
import NotesList from "@/components/notes-list";
import NoteEditor from "@/components/note-editor";
import notesStore from "@/stores/NoteStore";
import { observer } from "mobx-react-lite";

const App = observer(() => {
  return (
    <>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <ModeToggle />
        {notesStore.selectedNote ? <NoteEditor /> : <NotesList />}
      </ThemeProvider>
    </>
  );
});

export default App;
