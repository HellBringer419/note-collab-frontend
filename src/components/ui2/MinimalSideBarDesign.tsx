import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Menu, PlusCircle, Search } from "lucide-react";

export default function MinimalSidebarDesign() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Minimal Sidebar */}
      <div className="w-20 bg-white border-r flex flex-col items-center py-6">
        <Button variant="ghost" className="mb-6">
          <Menu className="h-6 w-6" />
        </Button>
        <Button variant="ghost" className="mb-4">
          <PlusCircle className="h-6 w-6" />
        </Button>
        <Button variant="ghost" className="mb-4">
          <Search className="h-6 w-6" />
        </Button>
        <ScrollArea className="flex-1 w-full">
          {[1, 2, 3, 4, 5].map((i) => (
            <Button key={i} variant="ghost" className="w-full mb-2">
              N{i}
            </Button>
          ))}
        </ScrollArea>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <Input className="w-1/3" placeholder="Note title" />
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
        </div>
        <Textarea
          className="min-h-[calc(100vh-200px)] text-lg"
          placeholder="Start typing your note here..."
        />
      </div>
    </div>
  );
}
