import Note from "@/interfaces/note";
import { makeAutoObservable } from "mobx";

class NotesStore {
  notes: Note[] = [{ id: 1, title: "Free", description: "Wow" }];
  selectedNote: Note | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  // Action to add a note
  addNote(note: Note) {
    this.notes.push(note);
  }

  // Action to select a note
  selectNote(noteId: number | null) {
    this.selectedNote =
      noteId === null
        ? null
        : this.notes.find((note) => note.id === noteId) || null;
  }

  // Action to remove a note
  removeNote(noteId: number) {
    this.notes = this.notes.filter((note) => note.id !== noteId);
  }
}

const notesStore = new NotesStore();
export default notesStore;
