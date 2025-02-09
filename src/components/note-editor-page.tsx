import { io, Socket } from "socket.io-client";
import { debounce } from "lodash";
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
import { ChevronLeft, LogOut, Trash2 } from "lucide-react";
import { observer } from "mobx-react-lite";
import { useCallback, useEffect, useState } from "react";
import ShareNote from "./share-note";
import { useNavigate, useParams } from "react-router-dom";
import userStore from "@/stores/UserStore";
import { Note } from "@/swagger/model";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "./ui/toaster";
import ModeToggle from "./mode-toggle";
import { Label } from "@radix-ui/react-label";

const NoteEditor = observer(() => {
  const navigate = useNavigate();
  const params = useParams();
  const { toast } = useToast();

  // const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [collabs, setCollabs] = useState<any[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (params.noteId) {
      const fetchData = async () => {
        try {
          const currentSelectedNote = await notesStore.getNoteDetails(
            parseInt(params.noteId ?? ""),
          );
          setSelectedNote(currentSelectedNote);
          const collaborators = await notesStore.getCollaborators(
            currentSelectedNote.id,
          );
          setCollabs(collaborators);
        } catch (error) {
          if (error instanceof Error) {
            toast({
              title: "Failed to fetch note",
              description: error.message,
              variant: "destructive",
            });
          }
        }
      };
      if (socket) socket.emit("subscribe-note", parseInt(params.noteId));
      fetchData();
    }
  }, [params.noteId]);

  // Initialize WebSocket connection
  useEffect(() => {
    const newSocket = io(
      import.meta.env.VITE_REACT_APP_BASE_BACKEND_URL ?? "ws://localhost:8080",
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

    newSocket.on("note_update", async (data: Note) => {
      setSelectedNote((oldNote) => {
        if (oldNote?.id === data.id) {
          notesStore.updateNote(
            data.id,
            data.title ?? "New",
            data.description,
            data.category,
            false,
          );
          return data;
        }
        return oldNote;
      });
    });

    newSocket.on("note_delete", async (noteId) => {
      const deleNote = async (currentNoteId: number) => {
        await notesStore.removeNote(currentNoteId, false);
      };
      setSelectedNote((oldNote) => {
        if (noteId === oldNote?.id) {
          if (oldNote?.id) {
            deleNote(oldNote?.id);
          }
          navigate("/dashboard");
          return null;
        }
        return oldNote;
      });
    });

    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, [userStore.token, params]);

  useEffect(() => {
    handleSubscribe();
    return () => {
      if (socket) {
        socket.emit("unsubscribe-note", selectedNote?.id);
      }
    };
  }, [socket, selectedNote?.id]);

  const handleSubscribe = () => {
    console.log("Subscribing to note", selectedNote?.id);

    if (socket)
      socket.emit(
        "subscribe-note",
        selectedNote?.id,
        (status: any, error: any) => {
          if (error) {
            console.error(error);
          }
          console.log(status);
        },
      );
  };

  const handleBackButton = () => {
    setSelectedNote(null);
    navigate("/dashboard");
  };

  const debounceChangeDescription = useCallback(
    debounce(
      async (
        id: number,
        title: string,
        description: string,
        category?: string,
      ) => {
        await notesStore.updateNote(id, title, description, category, true);
      },
      2_000,
      { trailing: true, leading: false },
    ),
    [],
  ); // 2sec debounce

  const handleChangeTitle = (title: string) => {
    if (selectedNote && selectedNote.id)
      setSelectedNote({ ...selectedNote, title });
    notesStore.updateNote(
      selectedNote?.id ?? 0,
      title,
      selectedNote?.description,
      selectedNote?.category,
      true,
    );
  };
  const handleChangeCategory = (title: string) => {
    if (selectedNote && selectedNote.id)
      setSelectedNote({ ...selectedNote, title });
    notesStore.updateNote(
      selectedNote?.id ?? 0,
      title,
      selectedNote?.description,
      selectedNote?.category,
      true,
    );
  };
  const handleChangeDescription = (description: string) => {
    if (selectedNote?.id) {
      setSelectedNote({ ...selectedNote, description });
      debounceChangeDescription(
        selectedNote.id,
        selectedNote.title!,
        description,
        selectedNote.category,
      );
    }
  };

  const handleDelete = async () => {
    if (selectedNote?.id) {
      try {
        await notesStore.removeNote(selectedNote?.id, true);
        navigate("/dashboard");
      } catch (error) {
        if (error instanceof Error)
          toast({
            title: "Failed to fetch note",
            description: error.message,
            variant: "destructive",
          });
      }
    }
  };

  return (
    <TooltipProvider>
      <Toaster />
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
                defaultValue={selectedNote?.title ?? ""}
                onBlur={(e) => handleChangeTitle(e.target.value)}
              />
            </div>
            <div className="items-center ml-0 mx-2 hidden md:flex">
              <Label htmlFor="category">Category</Label>
              <Input
                className="w-64 ml-4 text-sm md:text-md"
                id="category"
                placeholder="Note title"
                defaultValue={selectedNote?.category ?? ""}
                onBlur={(e) => handleChangeCategory(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-2 self-end">
              {collabs.slice(0, 3).map((collab) => (
                <Avatar
                  className="h-6 w-6"
                  key={collab.id}
                  title={collab.User?.name}
                >
                  <AvatarImage src={collab?.User?.avatar} />
                  <AvatarFallback>
                    {collab.User?.name
                      ?.split(" ")
                      .map((name: any) => name.charAt(0))
                      .join("")
                      .toUpperCase()
                      .slice(0, 2) ?? "User"}
                  </AvatarFallback>
                </Avatar>
              ))}
              {collabs.length && collabs.length > 3 ? (
                <span className="text-sm text-gray-500">
                  +{collabs.length - 3} more
                </span>
              ) : (
                <></>
              )}
              <Avatar className="h-6 w-6" title="This is You">
                <AvatarImage src={userStore.user?.avatar} />
                <AvatarFallback>
                  {userStore.user?.name
                    ?.split(" ")
                    .map((name: any) => name.charAt(0))
                    .join("")
                    .toUpperCase()
                    .slice(0, 2) ?? "US"}
                </AvatarFallback>
              </Avatar>

              {selectedNote ? (
                <ShareNote note={selectedNote} />
              ) : (
                <Button variant="outline" disabled>
                  Invite
                </Button>
              )}
              <ModeToggle />
              <Button
                variant="outline"
                onClick={() => {
                  userStore.logout();
                  navigate("/"); // Redirect to login page
                }}
              >
                <LogOut />
                Logout
              </Button>
            </div>
          </header>
          <main className="bg-secondary/90 flex-1 p-6">
            <Textarea
              className="min-h-[calc(100vh-200px)] max-w-full text-base border-0 focus:ring-0"
              placeholder="Start typing your note here..."
              defaultValue={selectedNote?.description ?? ""}
              onChange={(e) => handleChangeDescription(e.target.value)}
            />
          </main>
        </div>

        {/* Floating Action Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="absolute bottom-10 right-6 rounded-full h-14 w-14"
              variant="default"
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
