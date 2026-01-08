import { useState } from "react";
import { Link } from "react-router-dom";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Heart,
  MessageCircle,
  MoreVertical,
  Calendar,
  MapPin,
  Clock,
  CheckCircle,
} from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

export function PostsList({ posts, currentUserId, onPostDeleted }) {
  if (!posts || posts.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <p className="text-muted-foreground">
            No posts yet. Be the first to share something!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          currentUserId={currentUserId}
          onPostDeleted={onPostDeleted}
        />
      ))}
    </div>
  );
}

function PostCard({ post, currentUserId, onPostDeleted }) {
  const { toast } = useToast();
  const [isLiking, setIsLiking] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes_count);
  const [isLiked, setIsLiked] = useState(
    Array.isArray(post.likes) &&
      post.likes.some((like) => like.user_id === currentUserId)
  );

  const isAuthor = post?.profiles?.id === currentUserId;

  const handleLike = async () => {
    setIsLiking(true);
    await new Promise((resolve) => setTimeout(resolve, 300));

    if (isLiked) {
      setLikesCount((prev) => prev - 1);
      setIsLiked(false);
    } else {
      setLikesCount((prev) => prev + 1);
      setIsLiked(true);
    }

    setIsLiking(false);
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    toast({
      title: "Post deleted",
      description: "Your post has been deleted successfully.",
    });

    onPostDeleted?.(post.id);
  };

  return (
    <Card>
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
            <p className="font-semibold">{post.profiles.display_name}</p>
          </Link>
          <p className="text-sm text-muted-foreground">
            @{post.profiles.username}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {post.type === "poll" && (
            <Badge
              variant="secondary"
              className="bg-accent text-accent-foreground"
            >
              Poll
            </Badge>
          )}
          {post.type === "event" && (
            <Badge
              variant="secondary"
              className="bg-secondary text-secondary-foreground"
            >
              Event
            </Badge>
          )}

          <span className="text-sm text-muted-foreground">
            {formatDistanceToNow(new Date(post.created_at), {
              addSuffix: true,
            })}
          </span>

          {isAuthor && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={handleDelete}
                  className="text-destructive"
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </CardHeader>

      <CardContent className="pb-4">
        {post.type === "post" && (
          <p className="whitespace-pre-wrap leading-relaxed">{post.content}</p>
        )}
        {post.type === "poll" && <PollContent post={post} />}
        {post.type === "event" && <EventContent post={post} />}
      </CardContent>

      <CardFooter className="flex gap-4 pt-4 border-t">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLike}
          disabled={isLiking}
          className={isLiked ? "text-red-500" : ""}
        >
          <Heart className={`w-4 h-4 mr-2 ${isLiked ? "fill-current" : ""}`} />
          {likesCount}
        </Button>

        <Button variant="ghost" size="sm">
          <MessageCircle className="w-4 h-4 mr-2" />
          {post.comments_count}
        </Button>
      </CardFooter>
    </Card>
  );
}

function PollContent({ post }) {
  const { toast } = useToast();
  const [selectedOption, setSelectedOption] = useState(post.user_vote || null);
  const [votes, setVotes] = useState(post.options || []);
  const [totalVotes, setTotalVotes] = useState(post.total_votes || 0);

  const handleVote = async (optionId) => {
    if (selectedOption) {
      toast({
        title: "Already voted",
        description: "You've already voted in this poll.",
        variant: "destructive",
      });
      return;
    }

    setSelectedOption(optionId);
    setVotes((prev) =>
      prev.map((opt) =>
        opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
      )
    );
    setTotalVotes((prev) => prev + 1);

    toast({
      title: "Vote recorded",
      description: "Your vote has been recorded successfully.",
    });
  };

  const hasEnded = post.ends_at ? new Date(post.ends_at) < new Date() : false;

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold text-lg mb-4">{post.question}</h3>

        <div className="space-y-2">
          {votes.map((option) => {
            const percentage =
              totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
            const isSelected = selectedOption === option.id;

            return (
              <button
                key={option.id}
                onClick={() => handleVote(option.id)}
                disabled={!!selectedOption || hasEnded}
                className="w-full text-left"
              >
                <div
                  className={`p-3 rounded-lg border transition-colors ${
                    isSelected
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/50 hover:bg-accent/50"
                  } ${
                    selectedOption || hasEnded
                      ? "cursor-default"
                      : "cursor-pointer"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={isSelected ? "font-medium" : ""}>
                      {option.text}
                    </span>
                    {(selectedOption || hasEnded) && (
                      <span className="text-sm text-muted-foreground">
                        {option.votes} ({percentage.toFixed(1)}%)
                      </span>
                    )}
                  </div>

                  {(selectedOption || hasEnded) && (
                    <Progress value={percentage} className="h-2" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{totalVotes} votes</span>
        {post.ends_at && (
          <span>
            {hasEnded
              ? "Poll ended"
              : `Ends ${formatDistanceToNow(new Date(post.ends_at), {
                  addSuffix: true,
                })}`}
          </span>
        )}
      </div>
    </div>
  );
}

function EventContent({ post }) {
  const { toast } = useToast();
  const [isAttending, setIsAttending] = useState(post.is_attending || false);
  const [attendeesCount, setAttendeesCount] = useState(
    post.attendees_count || 0
  );

  const handleAttendance = async () => {
    if (isAttending) {
      setIsAttending(false);
      setAttendeesCount((prev) => prev - 1);
      toast({
        title: "Removed from event",
        description: "You're no longer attending this event.",
      });
    } else {
      setIsAttending(true);
      setAttendeesCount((prev) => prev + 1);
      toast({
        title: "Added to event",
        description: "You're now attending this event!",
      });
    }
  };

  const startDate = post.start_date ? new Date(post.start_date) : new Date();
  const endDate = post.end_date ? new Date(post.end_date) : new Date();

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
        {post.description && (
          <p className="text-muted-foreground leading-relaxed mb-4">
            {post.description}
          </p>
        )}

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span>{format(startDate, "EEEE, MMMM d, yyyy")}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <span>
              {format(startDate, "h:mm a")} - {format(endDate, "h:mm a")}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span>{post.location}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t">
        <span className="text-sm text-muted-foreground">
          {attendeesCount} attending
        </span>
        <Button
          size="sm"
          variant={isAttending ? "secondary" : "default"}
          onClick={handleAttendance}
          className="gap-2"
        >
          {isAttending && <CheckCircle className="w-4 h-4" />}
          {isAttending ? "Attending" : "Attend"}
        </Button>
      </div>
    </div>
  );
}
