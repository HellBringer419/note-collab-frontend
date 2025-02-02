import { getNotesCollaborationAPI } from "@/swagger/apis/notesCollaborationAPI";
import { Note } from "@/swagger/model";
import axios from "axios";
import { makeAutoObservable } from "mobx";

const api = getNotesCollaborationAPI();
class NotesStore {
  notes: Note[] = [{ id: 1, title: "Free", description: "Wow" }];
  selectedNote: Note | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  // Action to add a note
  async addNote(note: Note): Promise<Note | null> {
    console.log(note);
    const testCall = await axios.get("/");
    console.log(testCall);

    const newNote = await api.createNote(note);
    if (newNote) {
      this.notes.push(newNote.data);
      return newNote.data;
    }
    return null;
  }

  // Action to select a note
  selectNote(noteId: number | null) {
    this.selectedNote =
      noteId === null
        ? null
        : this.notes.find((note) => note.id === noteId) || null;
  }

  // Action to remove a note
  async removeNote(noteId: number) {
    await api.deleteNote(noteId);
    this.notes = this.notes.filter((note) => note.id !== noteId);
  }
}

const notesStore = new NotesStore();
export default notesStore;
