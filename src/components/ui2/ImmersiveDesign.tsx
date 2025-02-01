import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Search,
  Settings,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ImmersiveDesign() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <TooltipProvider>
      <div className="flex h-screen bg-gray-100 relative">
        {/* Collapsible Sidebar */}
        <div
          className={`bg-white border-r transition-all duration-300 ease-in-out ${sidebarOpen ? "w-64" : "w-0"}`}
        >
          <div className="p-4">
            <Input className="mb-4" placeholder="Search notes..." />
            <ScrollArea className="h-[calc(100vh-120px)]">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="p-2 mb-2 hover:bg-gray-100 rounded cursor-pointer"
                >
                  <h3 className="font-semibold">Note {i}</h3>
                  <p className="text-sm text-gray-500 truncate">
                    This is a preview of Note {i}...
                  </p>
                </div>
              ))}
            </ScrollArea>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col">
          <header className="bg-white border-b p-4 flex justify-between items-center">
            <div className="flex items-center">
              <Button
                variant="ghost"
                onClick={() => setSidebarOpen(!sidebarOpen)}
              >
                {sidebarOpen ? <ChevronLeft /> : <ChevronRight />}
              </Button>
              <Input className="w-64 ml-4" placeholder="Note title" />
            </div>
            <div className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder-avatar-2.jpg" />
                <AvatarFallback>AB</AvatarFallback>
              </Avatar>
              <Button variant="outline">Invite</Button>
            </div>
          </header>
          <main className="flex-1 p-6 overflow-auto">
            <Textarea
              className="min-h-[calc(100vh-200px)] text-lg border-0 focus:ring-0"
              placeholder="Start typing your note here..."
            />
          </main>
        </div>

        {/* Floating Action Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="absolute bottom-6 right-6 rounded-full h-14 w-14"
              size="icon"
            >
              <Plus className="h-6 w-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Create new note</p>
          </TooltipContent>
        </Tooltip>

        {/* Quick access toolbar */}
        <div className="absolute top-1/2 transform -translate-y-1/2 left-4 space-y-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Search className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Search notes</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Settings className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Settings</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
}
