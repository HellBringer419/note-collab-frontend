import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";

export default function SplitViewDesign() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/3 bg-white p-6 border-r">
        <h1 className="text-2xl font-bold mb-6">My Notes</h1>
        <div className="flex mb-4">
          <Input className="mr-2" placeholder="Search notes..." />
          <Button>New</Button>
        </div>
        <ScrollArea className="h-[calc(100vh-180px)]">
          {[1, 2, 3, 4, 5].map((i) => (
            <Card
              key={i}
              className="mb-4 cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <CardHeader>
                <CardTitle>Note {i}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">Last edited 2 hours ago</p>
              </CardContent>
            </Card>
          ))}
        </ScrollArea>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Note Title</h2>
          <div className="flex items-center space-x-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder-avatar.jpg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder-avatar-2.jpg" />
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
            <Button variant="outline">Share</Button>
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
