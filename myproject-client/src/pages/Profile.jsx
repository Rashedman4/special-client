import {
  SidebarTrigger,
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import {
  mockCurrentUser,
  mockUsers,
  mockPosts,
  mockWallet,
} from "@/lib/dummy-data";
import { AppSidebar } from "@/components/app-sidebar";

export default function Profile() {
  const { username } = useParams();

  const profile = [mockCurrentUser, ...mockUsers].find(
    (u) => u.username === username
  );

  if (!profile) {
    return (
      <SidebarProvider>
        <AppSidebar user={mockCurrentUser} isAdmin={false} />
        <SidebarInset>
          <div className="flex flex-col flex-1">
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <h1 className="text-xl font-semibold">Profile</h1>
            </header>

            <div className="flex-1 overflow-auto">
              <div className="max-w-3xl mx-auto p-4 md:p-6">
                <Card>
                  <CardContent className="py-12 text-center">
                    <p className="text-muted-foreground">User not found.</p>
                    <div className="mt-4">
                      <Button
                        asChild
                        variant="outline"
                        className="bg-transparent"
                      >
                        <Link to="/dashboard">Go to Feed</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  const isOwnProfile = mockCurrentUser.id === profile.id;
  const userPosts = mockPosts.filter((p) => p.author_id === profile.id);

  return (
    <SidebarProvider>
      <AppSidebar user={mockCurrentUser} isAdmin={false} />
      <SidebarInset>
        <div className="flex flex-col flex-1">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <h1 className="text-xl font-semibold">Profile</h1>
          </header>

          <div className="flex-1 overflow-auto">
            <div className="max-w-3xl mx-auto p-4 md:p-6 space-y-6">
              {/* Profile Header */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <Avatar className="w-24 h-24">
                      <AvatarImage
                        src={profile.avatar_url || "/placeholder.svg"}
                        alt={profile.display_name}
                      />
                      <AvatarFallback className="text-3xl">
                        {profile.display_name?.[0] || "U"}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 space-y-4">
                      <div>
                        <h2 className="text-2xl font-bold">
                          {profile.display_name}
                        </h2>
                        <p className="text-muted-foreground">
                          @{profile.username}
                        </p>
                      </div>

                      {profile.bio && (
                        <p className="text-base leading-relaxed">
                          {profile.bio}
                        </p>
                      )}

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>
                            Joined{" "}
                            {formatDistanceToNow(new Date(profile.created_at), {
                              addSuffix: true,
                            })}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-sm">
                          <span className="font-semibold text-foreground">
                            {userPosts.length}
                          </span>{" "}
                          <span className="text-muted-foreground">Posts</span>
                        </div>
                        <div className="text-sm">
                          <span className="font-semibold text-foreground">
                            {mockWallet.balance}
                          </span>{" "}
                          <span className="text-muted-foreground">Tokens</span>
                        </div>
                      </div>

                      {isOwnProfile && (
                        <Button
                          asChild
                          variant="outline"
                          className="bg-transparent"
                        >
                          <Link to="/settings">Edit Profile</Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Posts */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Posts</h3>

                {userPosts.length > 0 ? (
                  userPosts.map((post) => (
                    <Card key={post.id}>
                      <CardContent className="pt-6">
                        <p className="whitespace-pre-wrap leading-relaxed mb-4">
                          {post.content}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{post.likes_count} likes</span>
                          <span>{post.comments_count} comments</span>
                          <span>
                            {formatDistanceToNow(new Date(post.created_at), {
                              addSuffix: true,
                            })}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card>
                    <CardContent className="py-12 text-center">
                      <p className="text-muted-foreground">No posts yet</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
