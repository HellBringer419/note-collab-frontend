import "./App.css";
import notesStore from "@/stores/NoteStore";
import NoteEditor from "./note-editor-page";
import NotesList from "./notes-list-page";
import { observer } from "mobx-react-lite";

const DashBoard = observer(() => {
  return <>{notesStore.selectedNote ? <NoteEditor /> : <NotesList />}</>;
});

export default DashBoard;
