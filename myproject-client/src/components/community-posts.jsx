import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";

/**
 * Props:
 * - posts: Array of { id, content, created_at, profiles: { username, display_name, avatar_url? } }
 * - currentUserId?: string (not used in your original component)
 */
export function CommunityPosts({ posts }) {
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
                <p className="font-semibold">{post.profiles.display_name}</p>
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
      ))}
    </div>
  );
}
