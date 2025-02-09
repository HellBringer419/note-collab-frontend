import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import notesStore from "@/stores/NoteStore";
import userStore from "@/stores/UserStore";
import dayjs from "dayjs";
import { PlusCircle } from "lucide-react";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import ShareNote from "./share-note";
import { useNavigate } from "react-router-dom";
import { Note } from "@/swagger/model";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "./ui/toaster";

const NotesList = observer(() => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [notesInView, setNotesInView] = useState<Note[] | []>([]);

  const createNewNote = async () => {
    try {
      const newNote = await notesStore.addNote("New", null);
      if (newNote && newNote.id) {
        toast({
          title: 'New Note Created',
          variant: "default",
        })
        navigate(`/note/${newNote?.id}`);
      } else {
        toast({
          title: 'Failed to create note',
          variant: "destructive",
        })
      }
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: 'Failed to create note',
          description: error.message,
          variant: "destructive",
        });
      }
    }
  };

  useEffect(() => {
    try {
      notesStore.refreshNotes();
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: 'Failed to refresh notes',
          description: error.message,
          variant: "destructive",
        })
      }
    }
  }, [userStore.token]);

  useEffect(() => {
    setNotesInView(notesStore.notes);
  }, [notesStore.notes]);

  const searchNote = (searchText: string) => {
    if (!searchText || searchText == "") {
      setNotesInView(notesStore.notes);
    } else {
      setNotesInView(
        notesStore.notes.filter(
          (note) =>
            note.title?.includes(searchText) ||
            note.description?.includes(searchText),
        ),
      );
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 px-6 lg:px-12 md:w-screen">
      <Toaster />
      <h1 className="text-3xl font-bold mb-6 text-center">
        Collaborative Notes
      </h1>
      <div className="flex mb-6">
        <Input
          className="mr-2"
          placeholder="Search notes..."
          name="searchNote"
          id="searchNote"
          onChange={(e) => searchNote(e.target.value)}
        />
        <Button onClick={() => createNewNote()}>
          <PlusCircle className="mr-2 h-4 w-4" /> New Note
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notesInView.map((note) => (
          <Card
            key={note.id}
            className="cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => navigate(`/note/${note.id}`)}
          >
            <CardHeader>
              <CardTitle>Note: {note.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                {note.description?.substring(0, 15)}
                {note.description && note.description?.length > 15 ? "..." : ""}
              </p>
              <div className="flex items-center space-x-2">
                {note.Collaborations?.slice(0, 3).map((collab) => (
                  <Avatar className="h-6 w-6" key={collab.id}>
                    <AvatarImage src={collab?.User?.avatar} />
                    <AvatarFallback>
                      {collab.User?.name
                        ?.split(" ")
                        .map((name) => name.charAt(0))
                        .join("")
                        .toUpperCase() ?? "User"}
                    </AvatarFallback>
                  </Avatar>
                ))}
                {note.Collaborations?.length &&
                  note.Collaborations?.length > 3 ? (
                  <span className="text-sm text-gray-500">
                    +{note.Collaborations.length - 3} more
                  </span>
                ) : (
                  <></>
                )}
              </div>
            </CardContent>
            <CardFooter
              className="justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              <ShareNote note={note} />
              <span
                className="text-sm text-gray-500"
                title={dayjs(note.updatedAt).format("LLL").toString()}
              >
                {dayjs(note.updatedAt).fromNow()}
              </span>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
});
export default NotesList;
