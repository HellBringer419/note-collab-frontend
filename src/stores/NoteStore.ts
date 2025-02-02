import { getNotesCollaborationAPI } from "@/swagger/apis/notesCollaborationAPI";
import { Note } from "@/swagger/model";
import { makeAutoObservable } from "mobx";

const api = getNotesCollaborationAPI();
const token = localStorage.getItem("token") || null; // Load token from localStorage if available
class NotesStore {
  notes: Note[] = [];
  selectedNote: Note | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async refreshNotes(): Promise<Note[]> {
    const response = await api.getNotes({
      headers: { Authorization: `Bearer ${token}` },
    });
    this.notes = response.data;
    return response.data;
  }

  // Action to add a note
  async addNote(title: string, description: string): Promise<Note | null> {
    const newNote = await api.createNote(
      { title, description, createdBy: 0 },
      { headers: { Authorization: `Bearer ${token}` } },
    );
    if (newNote) {
      this.selectNote(newNote.data.id);
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
    await api.deleteNote(noteId, {
      headers: { Authorization: `Bearer ${token}` },
    });
    this.notes = this.notes.filter((note) => note.id !== noteId);
  }

  async updateNote(noteId: number, title: string, description: string) {
    // should addd debounce
    const updatedNote = await api.updateNote(
      noteId,
      {
        title,
        description,
      },
      { headers: { Authorization: `Bearer ${token}` } },
    );
    if (updatedNote.data) {
      this.notes[this.notes.findIndex((note) => note.id === noteId)] =
        updatedNote.data;
    }
  }
}

const notesStore = new NotesStore();
export default notesStore;
