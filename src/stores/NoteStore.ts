import { getNotesCollaborationAPI } from "@/swagger/apis/notesCollaborationAPI";
import { Note } from "@/swagger/model";
import { makeAutoObservable, runInAction } from "mobx";
import userStore from "./UserStore";

const api = getNotesCollaborationAPI();
class NotesStore {
  notes: Note[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async refreshNotes(): Promise<Note[]> {
    const token = userStore.token;
    const response = await api.getNotes({
      headers: { Authorization: `Bearer ${token}` },
    });
    runInAction(() => {
      this.notes = response.data;
    });
    return response.data;
  }

  // Action to add a note
  async addNote(
    title: string,
    description?: string | null,
  ): Promise<Note | null> {
    const token = userStore.token;
    const newNote = await api.createNote(
      { title, description },
      { headers: { Authorization: `Bearer ${token}` } },
    );
    if (newNote) {
      runInAction(() => {
        this.notes.push(newNote.data);
      });
      return newNote.data;
    }
    return null;
  }

  async getNoteDetails(noteId: number): Promise<Note | null> {
    const token = userStore.token;
    const noteResponse = await api.getNote(noteId, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (noteResponse.data) {
      runInAction(() => {
        const idx = this.notes.findIndex((note) => note.id);
        this.notes[idx] = noteResponse.data;
      });
      return noteResponse.data;
    }
    return null;
  }

  // Action to remove a note
  async removeNote(noteId: number, isMine: boolean = true) {
    if (isMine) {
      const token = userStore.token;

      await api.deleteNote(noteId, {
        headers: { Authorization: `Bearer ${token}` },
      });
      runInAction(() => {
        this.notes = this.notes.filter((note) => note.id !== noteId);
      });
    } else {
      this.notes = this.notes.filter((note) => note.id !== noteId);
    }
  }

  async updateNote(
    noteId: number,
    title: string,
    description?: string | null,
    isMine: boolean = true,
  ) {
    // should addd debounce
    if (isMine) {
      const token = userStore.token;
      const updatedNote = await api.updateNote(
        noteId,
        {
          title,
          description,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (updatedNote.data) {
        runInAction(() => {
          this.notes[this.notes.findIndex((note) => note.id === noteId)] =
            updatedNote.data;
        });
      }
    } else {
      this.notes[this.notes.findIndex((note) => note.id === noteId)] = {
        id: noteId,
        title,
        description: description || undefined,
      };
    }
  }

  // Action to share a Note
  async shareNote(noteId: number, collaborator: string) {
    const token = userStore.token;
    const response = await api.inviteCollaborator(
      {
        noteId,
        email: collaborator,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    if (response && response.status === 200) return response.data;
    else return null;
  }

  // Action to get collaborators for a Note
  async getCollaborators(noteId: number) {
    const token = userStore.token;
    const response = await api.getCollaborators(noteId, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response && response.status === 200) return response.data;
    else return null;
  }
}

const notesStore = new NotesStore();
export default notesStore;
