import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar, BarChart3, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function CreateCommunityContent({ communityId }) {
  const [postContent, setPostContent] = useState("");
  const [pollQuestion, setPollQuestion] = useState("");
  const [pollOptions, setPollOptions] = useState(["", ""]);
  const [pollDuration, setPollDuration] = useState("24");
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventLocation, setEventLocation] = useState("");

  const { toast } = useToast();

  const handlePostSubmit = () => {
    if (!postContent.trim()) {
      toast({
        title: "Post content required",
        description: "Post content cannot be empty.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Post created",
      description: "Your post was published successfully.",
    });

    setPostContent("");
  };

  const handlePollSubmit = () => {
    if (!pollQuestion.trim()) {
      toast({
        title: "Poll question required",
        description: "Please enter a poll question.",
        variant: "destructive",
      });
      return;
    }

    const validOptions = pollOptions.filter((opt) => opt.trim());
    if (validOptions.length < 2) {
      toast({
        title: "Invalid poll",
        description: "Poll must have at least 2 options.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Poll created",
      description: "Your poll was created successfully.",
    });

    setPollQuestion("");
    setPollOptions(["", ""]);
    setPollDuration("24");
  };

  const handleEventSubmit = () => {
    if (!eventTitle.trim() || !eventDate || !eventTime) {
      toast({
        title: "Missing required fields",
        description: "Event title, date, and time are required.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Event created",
      description: "Your event has been scheduled successfully.",
    });

    setEventTitle("");
    setEventDescription("");
    setEventDate("");
    setEventTime("");
    setEventLocation("");
  };

  const addPollOption = () => {
    if (pollOptions.length < 6) {
      setPollOptions((prev) => [...prev, ""]);
    }
  };

  const updatePollOption = (index, value) => {
    setPollOptions((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const removePollOption = (index) => {
    if (pollOptions.length > 2) {
      setPollOptions((prev) => prev.filter((_, i) => i !== index));
    }
  };

  return (
    <Card className="p-4">
      <Tabs defaultValue="post" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="post" className="gap-2">
            <MessageSquare className="w-4 h-4" />
            Post
          </TabsTrigger>
          <TabsTrigger value="poll" className="gap-2">
            <BarChart3 className="w-4 h-4" />
            Poll
          </TabsTrigger>
          <TabsTrigger value="event" className="gap-2">
            <Calendar className="w-4 h-4" />
            Event
          </TabsTrigger>
        </TabsList>

        <TabsContent value="post" className="space-y-4">
          <Textarea
            placeholder="Share something with the community..."
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            className="min-h-24 resize-none"
          />
          <Button onClick={handlePostSubmit} className="w-full">
            Post
          </Button>
        </TabsContent>

        <TabsContent value="poll" className="space-y-4">
          <Input
            placeholder="Ask a question..."
            value={pollQuestion}
            onChange={(e) => setPollQuestion(e.target.value)}
          />

          {pollOptions.map((option, index) => (
            <div key={index} className="flex gap-2">
              <Input
                placeholder={`Option ${index + 1}`}
                value={option}
                onChange={(e) => updatePollOption(index, e.target.value)}
              />
              {pollOptions.length > 2 && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removePollOption(index)}
                >
                  ×
                </Button>
              )}
            </div>
          ))}

          {pollOptions.length < 6 && (
            <Button
              variant="outline"
              onClick={addPollOption}
              className="w-full bg-transparent"
            >
              Add Option
            </Button>
          )}

          <Label>Poll Duration (hours)</Label>
          <Input
            type="number"
            min="1"
            max="168"
            value={pollDuration}
            onChange={(e) => setPollDuration(e.target.value)}
          />

          <Button onClick={handlePollSubmit} className="w-full">
            Create Poll
          </Button>
        </TabsContent>

        <TabsContent value="event" className="space-y-4">
          <Input
            placeholder="Event title"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
          />

          <Textarea
            placeholder="Event description"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              type="date"
              value={eventDate}
              onChange={(e) => setEventDate(e.target.value)}
            />
            <Input
              type="time"
              value={eventTime}
              onChange={(e) => setEventTime(e.target.value)}
            />
          </div>

          <Input
            placeholder="Location"
            value={eventLocation}
            onChange={(e) => setEventLocation(e.target.value)}
          />

          <Button onClick={handleEventSubmit} className="w-full">
            Create Event
          </Button>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
