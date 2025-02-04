import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Share2 } from "lucide-react";
import { Note } from "@/swagger/model";
import notesStore from "@/stores/NoteStore";

interface ShareNoteProps {
  note: Note;
}
const ShareNote = ({ note }: ShareNoteProps) => {
  const [collaborators, setCollaborators] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleShare = async (e: FormEvent) => {
    e.preventDefault();
    // Here you would implement the logic to share the note
    console.log("Sharing note", note.id, " with:", collaborators);
    await notesStore.shareNote(note.id, collaborators);
    setIsDialogOpen(false);
  };
  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" /> Share
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Share Note: {note.title} </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleShare}>
            <Input
              placeholder="Enter collaborator emails"
              type="email"
              value={collaborators}
              onChange={(e) => setCollaborators(e.target.value)}
            />

            <Button type="submit"> Send Invites </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ShareNote;
