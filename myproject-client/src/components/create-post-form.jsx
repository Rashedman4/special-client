import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, X, Calendar, MapPin, Clock } from "lucide-react";

/**
 * Props:
 * - userId: string
 * - communityId?: string
 * - onPostCreated?: () => void   // parent should refetch/update state here
 */
export function CreatePostForm({ userId, communityId, onPostCreated }) {
  const [content, setContent] = useState("");
  const [pollQuestion, setPollQuestion] = useState("");
  const [pollOptions, setPollOptions] = useState(["", ""]);
  const [pollDuration, setPollDuration] = useState("24");

  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventTime, setEventTime] = useState("");
  const [eventDuration, setEventDuration] = useState("2");
  const [eventLocation, setEventLocation] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    setContent("");
    toast({
      title: "Post created",
      description: "Your post has been published successfully.",
    });

    onPostCreated?.();
    setIsLoading(false);
  };

  const handlePollSubmit = async (e) => {
    e.preventDefault();

    const validOptions = pollOptions.filter((opt) => opt.trim());
    if (!pollQuestion.trim() || validOptions.length < 2) {
      toast({
        title: "Invalid poll",
        description: "Please provide a question and at least 2 options.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    setPollQuestion("");
    setPollOptions(["", ""]);
    setPollDuration("24");

    toast({
      title: "Poll created",
      description: "Your poll has been published successfully.",
    });

    onPostCreated?.();
    setIsLoading(false);
  };

  const handleEventSubmit = async (e) => {
    e.preventDefault();

    if (
      !eventTitle.trim() ||
      !eventDate ||
      !eventTime ||
      !eventLocation.trim()
    ) {
      toast({
        title: "Invalid event",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    setEventTitle("");
    setEventDescription("");
    setEventDate("");
    setEventTime("");
    setEventDuration("2");
    setEventLocation("");

    toast({
      title: "Event created",
      description: "Your event has been published successfully.",
    });

    onPostCreated?.();
    setIsLoading(false);
  };

  const addPollOption = () => {
    if (pollOptions.length < 6) setPollOptions((prev) => [...prev, ""]);
  };

  const removePollOption = (index) => {
    if (pollOptions.length > 2) {
      setPollOptions((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const updatePollOption = (index, value) => {
    setPollOptions((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <Tabs defaultValue="post" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="post">Post</TabsTrigger>
            <TabsTrigger value="poll">Poll</TabsTrigger>
            <TabsTrigger value="event">Event</TabsTrigger>
          </TabsList>

          {/* Post */}
          <TabsContent value="post">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Textarea
                placeholder="What's on your mind?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[100px] resize-none"
                disabled={isLoading}
              />
              <div className="flex justify-end">
                <Button type="submit" disabled={!content.trim() || isLoading}>
                  {isLoading && (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  )}
                  Post
                </Button>
              </div>
            </form>
          </TabsContent>

          {/* Poll */}
          <TabsContent value="poll">
            <form onSubmit={handlePollSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="poll-question">Question</Label>
                <Input
                  id="poll-question"
                  placeholder="Ask a question..."
                  value={pollQuestion}
                  onChange={(e) => setPollQuestion(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label>Options</Label>

                {pollOptions.map((option, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder={`Option ${index + 1}`}
                      value={option}
                      onChange={(e) => updatePollOption(index, e.target.value)}
                      disabled={isLoading}
                    />
                    {pollOptions.length > 2 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removePollOption(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}

                {pollOptions.length < 6 && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addPollOption}
                    className="w-full bg-transparent"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Option
                  </Button>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="poll-duration">Duration (hours)</Label>
                <Input
                  id="poll-duration"
                  type="number"
                  min="1"
                  max="168"
                  value={pollDuration}
                  onChange={(e) => setPollDuration(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div className="flex justify-end">
                <Button type="submit" disabled={isLoading}>
                  {isLoading && (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  )}
                  Create Poll
                </Button>
              </div>
            </form>
          </TabsContent>

          {/* Event */}
          <TabsContent value="event">
            <form onSubmit={handleEventSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="event-title">Event Title</Label>
                <Input
                  id="event-title"
                  placeholder="Enter event title..."
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="event-description">Description</Label>
                <Textarea
                  id="event-description"
                  placeholder="What's this event about?"
                  value={eventDescription}
                  onChange={(e) => setEventDescription(e.target.value)}
                  className="min-h-[80px] resize-none"
                  disabled={isLoading}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="event-date">Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="event-date"
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="pl-10"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="event-time">Time</Label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="event-time"
                      type="time"
                      value={eventTime}
                      onChange={(e) => setEventTime(e.target.value)}
                      className="pl-10"
                      disabled={isLoading}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="event-duration">Duration (hours)</Label>
                <Input
                  id="event-duration"
                  type="number"
                  min="0.5"
                  max="24"
                  step="0.5"
                  value={eventDuration}
                  onChange={(e) => setEventDuration(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="event-location">Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="event-location"
                    placeholder="Where will it be?"
                    value={eventLocation}
                    onChange={(e) => setEventLocation(e.target.value)}
                    className="pl-10"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit" disabled={isLoading}>
                  {isLoading && (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  )}
                  Create Event
                </Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
