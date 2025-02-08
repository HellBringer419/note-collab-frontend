import { io, Socket } from "socket.io-client";
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
import { ChevronLeft, Trash2 } from "lucide-react";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import ShareNote from "./share-note";
import { useNavigate, useParams } from "react-router-dom";
import userStore from "@/stores/UserStore";
import { Note } from "@/swagger/model";

const NoteEditor = observer(() => {
  const navigate = useNavigate();
  const params = useParams();

  // const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [title, setTitle] = useState(selectedNote?.title || "");
  const [description, setDescription] = useState(
    selectedNote?.description || "",
  );
  const [socket, setSocket] = useState<Socket | null>(null);

  // Initialize WebSocket connection
  useEffect(() => {
    const newSocket = io(
      import.meta.env.REACT_APP_BASE_BACKEND_URL ?? "ws://localhost:8080",
      {
        auth: {
          token: userStore.token, // Use the token from the user store
        },
      },
    );

    newSocket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    newSocket.on("disconnect", () => {
      console.log("Disconnected from WebSocket server");
    });

    newSocket.on("note_update", (data: Note) => {
      if (data.id === parseInt(params.noteId!)) {
        if (data.title) setTitle(data.title);
        if (data.description) setDescription(data.description);
      }
    });

    newSocket.on("note_delete", (noteId) => {
      if (noteId === parseInt(params.noteId!)) {
        setSelectedNote(null);
        navigate("/dashboard");
      }
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [params.noteId, userStore.token, navigate]);

  useEffect(() => {
    if (selectedNote?.id)
      notesStore.updateNote(selectedNote?.id, title, description);
  }, [title, description]);

  useEffect(() => {
    if (params.noteId) {
      const fetchData = async () => {
        const currentSelectedNote = await notesStore.getNoteDetails(
          parseInt(params.noteId ?? ""),
        );
        setSelectedNote(currentSelectedNote);
      };
      if (socket) socket.emit("subscribe-note", parseInt(params.noteId));
      fetchData();
    }
  }, [params.noteId]);

  const handleBackButton = () => {
    setSelectedNote(null);
    navigate("/dashboard");
  };

  const handleDelete = async () => {
    if (selectedNote?.id) {
      await notesStore.removeNote(selectedNote?.id);
      if (socket) {
        socket.emit("note_delete", selectedNote?.id); // Emit delete event to server
      }
      navigate("/dashboard");
    }
  };

  return (
    <TooltipProvider>
      <div className="min-h-screen flex flex-col justify-center py-12 px-6 lg:px-12 md:w-screen">
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
          <header className="border-b p-4 flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-2 md:mb-0">
              <Button
                variant="outline"
                onClick={handleBackButton}
                // onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {/* {sidebarOpen ? <ChevronLeft /> : <ChevronRight />} */}
                <ChevronLeft />
              </Button>
              <Input
                className="w-64 ml-4 text-lg md:text-2xl"
                placeholder="Note title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2 self-end">
              {selectedNote?.Collaborations?.slice(0, 3).map((collab) => (
                <Avatar
                  className="h-6 w-6"
                  key={collab.id}
                  title={collab.User?.name}
                >
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
              {selectedNote?.Collaborations?.length &&
              selectedNote?.Collaborations?.length > 3 ? (
                <span className="text-sm text-gray-500">
                  +{selectedNote?.Collaborations.length - 3} more
                </span>
              ) : (
                <></>
              )}
              {selectedNote ? (
                <ShareNote note={selectedNote} />
              ) : (
                <Button variant="outline" disabled>
                  Invite
                </Button>
              )}
            </div>
          </header>
          <main className="bg-secondary/90 flex-1 p-6">
            <Textarea
              className="min-h-[calc(100vh-200px)] max-w-full text-base border-0 focus:ring-0"
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
              onClick={handleDelete}
            >
              <Trash2 className="h-6 w-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Delete</p>
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
