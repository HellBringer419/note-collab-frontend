import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogContent,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const NoteEditor = () => {
  const [content, setContent] = useState("");
  const [collaborators, setCollaborators] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSave = () => {
    // Here you would implement the logic to save the note
    console.log("Saving note:", content);
  };

  const handleShare = () => {
    // Here you would implement the logic to share the note
    console.log("Sharing note with:", collaborators);
    setIsDialogOpen(false);
  };

  return (
    <div className="space-y-4">
      <Textarea
        placeholder="Start typing your note here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-h-[300px]"
      />
      <div className="flex justify-between">
        <Button onClick={handleSave}>Save</Button>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline">Share</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Share Note</DialogTitle>
            </DialogHeader>
            <Input
              placeholder="Enter collaborator emails"
              value={collaborators}
              onChange={(e) => setCollaborators(e.target.value)}
            />

            <Button onClick={handleShare}>Send Invites</Button>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default NoteEditor;
