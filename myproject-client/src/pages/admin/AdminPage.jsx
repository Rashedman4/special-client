import {
  SidebarTrigger,
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, MessageSquare, Building2, Coins } from "lucide-react";
import { Link } from "react-router-dom";
import {
  mockAdminStats,
  mockUsers,
  mockPosts,
  mockCommunities,
  mockCurrentUser,
} from "@/lib/dummy-data";
import { AppSidebar } from "@/components/app-sidebar";

export default function AdminPage() {
  const recentUsers = mockUsers.slice(0, 3);
  const recentPosts = mockPosts.slice(0, 3);
  const recentCommunities = mockCommunities.slice(0, 3);

  return (
    <SidebarProvider>
      <AppSidebar user={mockCurrentUser} isAdmin={true} />

      <SidebarInset>
        <div className="flex flex-col flex-1">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <h1 className="text-xl font-semibold">Admin Dashboard</h1>
          </header>

          <div className="flex-1 overflow-auto">
            <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
              <div className="flex items-center gap-2 border-b">
                <Link
                  to="/admin"
                  className="px-4 py-2 border-b-2 border-primary text-sm font-medium text-primary"
                >
                  Overview
                </Link>

                <Link
                  to="/admin/users"
                  className="px-4 py-2 border-b-2 border-transparent text-sm font-medium text-muted-foreground hover:text-foreground hover:border-border"
                >
                  Users
                </Link>

                <Link
                  to="/admin/posts"
                  className="px-4 py-2 border-b-2 border-transparent text-sm font-medium text-muted-foreground hover:text-foreground hover:border-border"
                >
                  Posts Moderation
                </Link>

                <Link
                  to="/admin/communities"
                  className="px-4 py-2 border-b-2 border-transparent text-sm font-medium text-muted-foreground hover:text-foreground hover:border-border"
                >
                  Communities
                </Link>

                <Link
                  to="/admin/airdrop"
                  className="px-4 py-2 border-b-2 border-transparent text-sm font-medium text-muted-foreground hover:text-foreground hover:border-border"
                >
                  Airdrop
                </Link>
              </div>

              {/* Stats Cards */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Users
                    </CardTitle>
                    <Users className="w-4 h-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {mockAdminStats.totalUsers}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Registered users
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Posts
                    </CardTitle>
                    <MessageSquare className="w-4 h-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {mockAdminStats.totalPosts}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Posts created
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Communities
                    </CardTitle>
                    <Building2 className="w-4 h-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {mockAdminStats.totalCommunities}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Active communities
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Transactions
                    </CardTitle>
                    <Coins className="w-4 h-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {mockAdminStats.totalTransactions}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Token transactions
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Recent Users */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Users</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentUsers.map((user) => (
                        <div
                          key={user.id}
                          className="flex items-center justify-between"
                        >
                          <div>
                            <p className="font-medium">{user.display_name}</p>
                            <p className="text-sm text-muted-foreground">
                              @{user.username}
                            </p>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {new Date(user.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Communities */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Communities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentCommunities.map((community) => (
                        <div
                          key={community.id}
                          className="flex items-center justify-between"
                        >
                          <div>
                            <p className="font-medium">{community.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {community.members_count} members
                            </p>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {new Date(
                              community.created_at
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Posts */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Posts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentPosts.map((post) => (
                      <div
                        key={post.id}
                        className="flex items-start justify-between py-3 border-b last:border-0"
                      >
                        <div className="flex-1 mr-4">
                          <p className="font-medium">
                            {post.profiles?.display_name}
                          </p>
                          <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                            {post.content}
                          </p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                            <span>{post.likes_count} likes</span>
                            <span>{post.comments_count} comments</span>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground whitespace-nowrap">
                          {new Date(post.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
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
