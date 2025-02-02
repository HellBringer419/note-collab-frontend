import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import notesStore from "@/stores/NoteStore";
import { ChevronLeft, Plus } from "lucide-react";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import ShareNote from "./share-note";

const NoteEditor = observer(() => {
  // const [sidebarOpen, setSidebarOpen] = useState(false);
  const [title, setTitle] = useState(notesStore.selectedNote?.title || "");
  const [description, setDescription] = useState(
    notesStore.selectedNote?.description || "",
  );

  return (
    <TooltipProvider>
      <div className="container mx-auto p-6 flex w-screen">
        {/* Collapsible Sidebar */}
        {/* <div */}
        {/*   className={`bg-white border-r transition-all duration-300 ease-in-out ${sidebarOpen ? "w-64" : "w-0"}`} */}
        {/* > */}
        {/*   <div className="p-4"> */}
        {/*     <Input className="mb-4" placeholder="Search notes..." /> */}
        {/*     <ScrollArea className="h-[calc(100vh-120px)]"> */}
        {/*       {[1, 2, 3, 4, 5].map((i) => ( */}
        {/*         <div */}
        {/*           key={i} */}
        {/*           className="p-2 mb-2 hover:bg-gray-100 rounded cursor-pointer" */}
        {/*         > */}
        {/*           <h3 className="font-semibold">Note {i}</h3> */}
        {/*           <p className="text-sm text-gray-500 truncate"> */}
        {/*             This is a preview of Note {i}... */}
        {/*           </p> */}
        {/*         </div> */}
        {/*       ))} */}
        {/*     </ScrollArea> */}
        {/*   </div> */}
        {/* </div> */}

        {/* Main content */}
        <div className="flex-1 flex flex-col">
          <header className="border-b p-4 flex justify-between items-center">
            <div className="flex items-center">
              <Button
                variant="outline"
                onClick={() => notesStore.selectNote(null)}
                // onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {/* {sidebarOpen ? <ChevronLeft /> : <ChevronRight />} */}
                <ChevronLeft />
              </Button>
              <Input
                className="w-64 ml-4"
                placeholder="Note title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="../assets/react.svg" />
                <AvatarFallback>JE</AvatarFallback>
              </Avatar>
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-avatar-2.jpg" />
                <AvatarFallback>AB</AvatarFallback>
              </Avatar>
              {notesStore.selectedNote ? (
                <ShareNote note={notesStore.selectedNote} />
              ) : (
                <Button variant="outline" disabled>
                  Invite
                </Button>
              )}
            </div>
          </header>
          <main className="bg-secondary/90 flex-1 p-6">
            <Textarea
              className="min-h-[calc(100vh-200px)] w-auto max-w-full text-lg border-0 focus:ring-0"
              placeholder="Start typing your note here..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </main>
        </div>

        {/* Floating Action Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="absolute bottom-10 right-6 rounded-full h-14 w-14"
              size="icon"
            >
              <Plus className="h-6 w-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Create new item</p>
          </TooltipContent>
        </Tooltip>

        {/* Quick access toolbar */}
        {/* <div className="absolute top-1/2 transform -translate-y-1/2 left-4 space-y-4"> */}
        {/*   <Tooltip> */}
        {/*     <TooltipTrigger asChild> */}
        {/*       <Button variant="ghost" size="icon" className="rounded-full"> */}
        {/*         <Search className="h-5 w-5" /> */}
        {/*       </Button> */}
        {/*     </TooltipTrigger> */}
        {/*     <TooltipContent side="right"> */}
        {/*       <p>Search notes</p> */}
        {/*     </TooltipContent> */}
        {/*   </Tooltip> */}
        {/*   <Tooltip> */}
        {/*     <TooltipTrigger asChild> */}
        {/*       <Button variant="ghost" size="icon" className="rounded-full"> */}
        {/*         <Settings className="h-5 w-5" /> */}
        {/*       </Button> */}
        {/*     </TooltipTrigger> */}
        {/*     <TooltipContent side="right"> */}
        {/*       <p>Settings</p> */}
        {/*     </TooltipContent> */}
        {/*   </Tooltip> */}
        {/* </div> */}
      </div>
    </TooltipProvider>
  );
});

export default NoteEditor;
