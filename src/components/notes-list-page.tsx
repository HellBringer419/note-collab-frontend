import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { observer } from "mobx-react-lite";
import { PlusCircle } from "lucide-react";
import notesStore from "@/stores/NoteStore";
import ShareNote from "./share-note";
import { useEffect } from "react";
import userStore from "@/stores/UserStore";

const NotesList = observer(() => {
  const createNewNote = async () => {
    const newNote = await notesStore.addNote("", "");
    if (newNote && newNote.id) notesStore.selectNote(newNote.id);
  };

  useEffect(() => {
    notesStore.refreshNotes();
  }, [userStore.token]);
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Collaborative Notes</h1>
      <div className="flex mb-6">
        <Input className="mr-2" placeholder="Search notes..." />
        <Button onClick={() => createNewNote()}>
          <PlusCircle className="mr-2 h-4 w-4" /> New Note
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notesStore.notes.map((note) => (
          <Card
            key={note.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => {
              notesStore.selectNote(note.id);
            }}
          >
            <CardHeader>
              <CardTitle>Note: {note.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                {note.description?.substring(0, 15)}...
              </p>
              <div className="flex items-center space-x-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Avatar className="h-6 w-6">
                  <AvatarImage src="/placeholder-avatar-2.jpg" />
                  <AvatarFallback>AB</AvatarFallback>
                </Avatar>
                <span className="text-sm text-gray-500">+2 more</span>
              </div>
            </CardContent>
            <CardFooter
              className="justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              <ShareNote note={note} />
              <span className="text-sm text-gray-500">
                Last edited 2 hours ago
              </span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
});
export default NotesList;
