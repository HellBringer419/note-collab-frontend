import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";

// Mock data for notes
const initialNotes = [
  { id: 1, title: "Meeting Notes", content: "Discuss project timeline" },
  { id: 2, title: "Shopping List", content: "Milk, eggs, bread" },
];

const NoteList = () => {
  const [notes, setNotes] = useState(initialNotes);
  const [newNoteTitle, setNewNoteTitle] = useState("");

  const addNote = () => {
    if (newNoteTitle.trim()) {
      const newNote = {
        id: Date.now(),
        title: newNoteTitle,
        content: "",
      };
      setNotes([...notes, newNote]);
      setNewNoteTitle("");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <Input
          type="text"
          placeholder="New note title"
          value={newNoteTitle}
          onChange={(e) => setNewNoteTitle(e.target.value)}
        />
        <Button onClick={addNote}>Add Note</Button>
      </div>
      {notes.map((note) => (
        <Card key={note.id}>
          <CardHeader>
            <CardTitle>{note.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="truncate">{note.content}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default NoteList;
