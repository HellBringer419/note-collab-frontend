import { getNotesCollaborationAPI } from "@/swagger/apis/notesCollaborationAPI";
import { Collaboration, GetCollaborators200Item, InviteCollaborator200, Note } from "@/swagger/model";
import { makeAutoObservable, runInAction } from "mobx";
import userStore from "./UserStore";
import { AxiosError } from "axios";

const api = getNotesCollaborationAPI();
class NotesStore {
  notes: Note[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async refreshNotes(): Promise<Note[]> {
    const token = userStore.token;
    try {
    const response = await api.getNotes({
      headers: { Authorization: `Bearer ${token}` },
    });
    runInAction(() => {
      this.notes = response.data;
    });
    return response.data;
    } catch (error) {
    if (error instanceof AxiosError) {
      switch (error.status) {
        case 200:
          break;
        case 400:
          throw new Error(error.response?.data.message ?? "Note creation failed");
        case 401:
          throw new Error("Invalid credentials");
        case 403:
          throw new Error("Access denied");
        case 404:
          throw new Error("User not found");
        default:
          throw new Error("Server error");
      }
    }
    throw new Error("Unknown Error");
  }
  }

  // Action to add a note
  async addNote(
    title: string,
    description?: string | null,
    category?: string | null
  ): Promise<Note> {
    const token = userStore.token;
    try {
      const newNote = await api.createNote(
        { title, description, category },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (newNote) {
        runInAction(() => {
          this.notes.push(newNote.data);
        });
        return newNote.data;
      }
      throw new Error("Failed to create note");
    } catch (error) {
      if (error instanceof AxiosError) {
        switch (error.status) {
          case 200:
            break;
          case 400:
            throw new Error(error.response?.data.message ?? "Note creation failed");
          case 401:
            throw new Error("Invalid credentials");
          case 403:
            throw new Error("Access denied");
          case 404:
            throw new Error("User not found");
          default:
            throw new Error("Server error");
        }
      }
      throw new Error("Unknown Error");
    }
  }

  async getNoteDetails(noteId: number): Promise<Note> {
    const token = userStore.token;
    try {
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
      throw new Error("Failed to get note");
    } catch (error) {
      if (error instanceof AxiosError) {
        switch (error.status) {
          case 200:
            break;
          case 400:
            throw new Error(error.response?.data.message ?? "Could not get note");
          case 401:
            throw new Error("Invalid credentials");
          case 403:
            throw new Error("Access denied");
          case 404:
            throw new Error("User not found");
          default:
            throw new Error("Server error");
        }
      }
      throw new Error("Unknown Error");
    }
  }

  // Action to remove a note
  async removeNote(noteId: number, isMine: boolean = true) {
    if (isMine) {
      const token = userStore.token;

      try {
        await api.deleteNote(noteId, {
          headers: { Authorization: `Bearer ${token}` },
        });
        runInAction(() => {
          this.notes = this.notes.filter((note) => note.id !== noteId);
        });  
      } catch (error) {
        if (error instanceof AxiosError) {
          switch (error.status) {
            case 200:
              break;
            case 400:
              throw new Error(error.response?.data.message ?? "Note deletion failed");
            case 401:
              throw new Error("Invalid credentials");
            case 403:
              throw new Error("Access denied");
            case 404:
              throw new Error("User not found");
            default:
              throw new Error("Server error");
          }
        }
        throw new Error("Unknown Error");
      }
      
    } else {
      this.notes = this.notes.filter((note) => note.id !== noteId);
    }
  }

  async updateNote(
    noteId: number,
    title: string,
    description?: string | null,
    category?: string | null,
    isMine: boolean = true,
  ) {
    // should addd debounce
    if (isMine) {
      const token = userStore.token;
      try { 
        const updatedNote = await api.updateNote(
        noteId,
        {
          title,
          description,
          category
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      if (updatedNote.data) {
        runInAction(() => {
          this.notes[this.notes.findIndex((note) => note.id === noteId)] =
            updatedNote.data;
        });
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        switch (error.status) {
          case 200:
            break;
          case 400:
            throw new Error(error.response?.data.message ?? "Note update failed");
          case 401:
            throw new Error("Invalid credentials");
          case 403:
            throw new Error("Access denied");
          case 404:
            throw new Error("User not found");
          default:
            throw new Error("Server error");
        }
      }
      throw new Error("Unknown Error");
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
  async shareNote(noteId: number, collaborator: string): Promise<Collaboration[]> {
    const token = userStore.token;
    try {

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
    else throw new Error("Note sharing failed");
  } catch (error) {
    if (error instanceof AxiosError) {
      switch (error.status) {
        case 200:
          break;
        case 400:
          throw new Error(error.response?.data.message ?? "Note sharing failed");
        case 401:
          throw new Error("Invalid credentials");
        case 403:
          throw new Error("Access denied");
        case 404:
          throw new Error("User not found");
        default:
          throw new Error("Server error");
      }
    }
    throw new Error("Unknown Error");
  }
  }

  // Action to get collaborators for a Note
  async getCollaborators(noteId: number): Promise<Collaboration[]> {
    const token = userStore.token;
    try {
      
    const response = await api.getCollaborators(noteId, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response && response.status === 200) return response.data;
    else throw new Error("Could not get collaborators");
  } catch (error) {
    if (error instanceof AxiosError) {
      switch (error.status) {
        case 200:
          break;
        case 400:
          throw new Error(error.response?.data.message ?? "Could not get collaborators");
        case 401:
          throw new Error("Invalid credentials");
        case 403:
          throw new Error("Access denied");
        case 404:
          throw new Error("User not found");
        default:
          throw new Error("Server error");
      }
    }
    throw new Error("Unknown Error");
  }
  }
}

const notesStore = new NotesStore();
export default notesStore;
