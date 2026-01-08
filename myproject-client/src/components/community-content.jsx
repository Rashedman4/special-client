import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { formatDistanceToNow, format } from "date-fns";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Users, Check } from "lucide-react";
import { toast } from "sonner";

/**
 * Props:
 * - posts: Array<Post>
 * - polls: Array<Poll>
 * - events: Array<Event>
 * - currentUserId?: string (not used in your original logic)
 */
export function CommunityContent({ posts = [], polls = [], events = [] }) {
  const [pollVotes, setPollVotes] = useState({}); // { [pollId]: optionId }
  const [eventAttendance, setEventAttendance] = useState({}); // { [eventId]: boolean }

  const allContent = [
    ...posts.map((p) => ({ ...p, type: "post" })),
    ...polls.map((p) => ({ ...p, type: "poll" })),
    ...events.map((e) => ({ ...e, type: "event" })),
  ].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  const handleVote = (pollId, optionId) => {
    setPollVotes((prev) => ({ ...prev, [pollId]: optionId }));
    toast.success("Vote recorded!");
  };

  const handleAttendance = (eventId, currentStatus) => {
    setEventAttendance((prev) => ({ ...prev, [eventId]: !currentStatus }));
    toast.success(
      !currentStatus ? "You're attending!" : "Attendance cancelled"
    );
  };

  if (allContent.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">
            No content yet. Be the first to share something!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {allContent.map((item) => {
        // ---------------- POST ----------------
        if (item.type === "post") {
          const post = item;
          return (
            <Card key={post.id}>
              <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-4">
                <Link to={`/profile/${post.profiles.username}`}>
                  <Avatar className="w-10 h-10">
                    <AvatarImage
                      src={post.profiles.avatar_url || "/placeholder.svg"}
                      alt={post.profiles.display_name}
                    />
                    <AvatarFallback>
                      {post.profiles.display_name?.[0] || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Link>

                <div className="flex-1">
                  <Link
                    to={`/profile/${post.profiles.username}`}
                    className="hover:underline"
                  >
                    <p className="font-semibold">
                      {post.profiles.display_name}
                    </p>
                  </Link>
                  <p className="text-sm text-muted-foreground">
                    @{post.profiles.username} •{" "}
                    {formatDistanceToNow(new Date(post.created_at), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </CardHeader>

              <CardContent>
                <p className="whitespace-pre-wrap leading-relaxed">
                  {post.content}
                </p>
              </CardContent>
            </Card>
          );
        }

        // ---------------- POLL ----------------
        if (item.type === "poll") {
          const poll = item;
          const userVote = pollVotes[poll.id] || poll.user_vote;
          const hasVoted = !!userVote;

          return (
            <Card key={poll.id} className="border-secondary/20">
              <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-4">
                <Link to={`/profile/${poll.profiles.username}`}>
                  <Avatar className="w-10 h-10">
                    <AvatarImage
                      src={poll.profiles.avatar_url || "/placeholder.svg"}
                      alt={poll.profiles.display_name}
                    />
                    <AvatarFallback>
                      {poll.profiles.display_name?.[0] || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Link>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/profile/${poll.profiles.username}`}
                      className="hover:underline"
                    >
                      <p className="font-semibold">
                        {poll.profiles.display_name}
                      </p>
                    </Link>
                    <Badge variant="secondary" className="text-xs">
                      Poll
                    </Badge>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    @{poll.profiles.username} • Ends{" "}
                    {formatDistanceToNow(new Date(poll.ends_at), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <h3 className="font-semibold text-lg">{poll.question}</h3>

                <div className="space-y-3">
                  {poll.options.map((option) => {
                    const percentage =
                      poll.total_votes > 0
                        ? (option.votes / poll.total_votes) * 100
                        : 0;
                    const isSelected = userVote === option.id;

                    return (
                      <div key={option.id}>
                        {hasVoted ? (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span
                                className={
                                  isSelected ? "font-medium text-secondary" : ""
                                }
                              >
                                {option.text}
                                {isSelected && (
                                  <Check className="inline w-4 h-4 ml-1" />
                                )}
                              </span>
                              <span className="text-muted-foreground">
                                {option.votes} ({percentage.toFixed(0)}%)
                              </span>
                            </div>
                            <Progress value={percentage} className="h-2" />
                          </div>
                        ) : (
                          <Button
                            variant="outline"
                            className="w-full justify-start bg-transparent"
                            onClick={() => handleVote(poll.id, option.id)}
                          >
                            {option.text}
                          </Button>
                        )}
                      </div>
                    );
                  })}
                </div>

                <p className="text-sm text-muted-foreground text-center">
                  {poll.total_votes} total votes
                </p>
              </CardContent>
            </Card>
          );
        }

        // ---------------- EVENT ----------------
        if (item.type === "event") {
          const event = item;
          const isAttending = eventAttendance[event.id] ?? event.is_attending;

          return (
            <Card key={event.id} className="border-accent/20">
              <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-4">
                <Link to={`/profile/${event.profiles.username}`}>
                  <Avatar className="w-10 h-10">
                    <AvatarImage
                      src={event.profiles.avatar_url || "/placeholder.svg"}
                      alt={event.profiles.display_name}
                    />
                    <AvatarFallback>
                      {event.profiles.display_name?.[0] || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Link>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Link
                      to={`/profile/${event.profiles.username}`}
                      className="hover:underline"
                    >
                      <p className="font-semibold">
                        {event.profiles.display_name}
                      </p>
                    </Link>
                    <Badge className="text-xs bg-accent text-accent-foreground">
                      Event
                    </Badge>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    @{event.profiles.username} •{" "}
                    {formatDistanceToNow(new Date(event.created_at), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {event.description}
                  </p>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {format(new Date(event.start_date), "PPP")} at{" "}
                      {format(new Date(event.start_date), "p")}
                    </span>
                  </div>

                  {event.location && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>
                      {event.attendees_count + (isAttending ? 1 : 0)} attending
                    </span>
                  </div>
                </div>

                <Button
                  variant={isAttending ? "secondary" : "default"}
                  className="w-full"
                  onClick={() => handleAttendance(event.id, isAttending)}
                >
                  {isAttending ? "Attending ✓" : "Attend Event"}
                </Button>
              </CardContent>
            </Card>
          );
        }

        return null;
      })}
    </div>
  );
}
