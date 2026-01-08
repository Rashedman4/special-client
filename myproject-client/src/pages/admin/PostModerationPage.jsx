import { Link } from "react-router-dom";

import {
  SidebarTrigger,
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockReportedPosts, mockCurrentUser } from "@/lib/dummy-data";
import { Trash2, CheckCircle, Eye } from "lucide-react";
import { AppSidebar } from "@/components/app-sidebar";

export default function PostModerationPage() {
  return (
    <SidebarProvider>
      <AppSidebar user={mockCurrentUser} isAdmin={true} />

      <SidebarInset>
        <div className="flex flex-col flex-1">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <h1 className="text-xl font-semibold">Posts Moderation</h1>
          </header>

          <div className="flex-1 overflow-auto">
            <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6">
              {/* Navigation Tabs */}
              <div className="flex items-center gap-2 border-b">
                <Link
                  to="/admin"
                  className="px-4 py-2 border-b-2 border-transparent text-sm font-medium text-muted-foreground hover:text-foreground hover:border-border"
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
                  className="px-4 py-2 border-b-2 border-primary text-sm font-medium text-primary"
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

              <Card>
                <CardHeader>
                  <CardTitle>Reported Posts</CardTitle>
                </CardHeader>

                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Type</TableHead>
                        <TableHead>Content</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead>Reported By</TableHead>
                        <TableHead>Reason</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {mockReportedPosts.map((post) => (
                        <TableRow key={post.id}>
                          <TableCell>
                            <Badge
                              variant={
                                post.type === "post"
                                  ? "outline"
                                  : post.type === "poll"
                                  ? "secondary"
                                  : "default"
                              }
                            >
                              {post.type}
                            </Badge>
                          </TableCell>

                          <TableCell className="max-w-xs">
                            {post.type === "post" && (
                              <p className="line-clamp-2 text-sm">
                                {post.content}
                              </p>
                            )}

                            {post.type === "poll" && (
                              <div>
                                <p className="font-medium text-sm">
                                  {post.question}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {post.options?.length} options,{" "}
                                  {post.total_votes} votes
                                </p>
                              </div>
                            )}

                            {post.type === "event" && (
                              <div>
                                <p className="font-medium text-sm">
                                  {post.title}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {post.location} • {post.attendees_count}{" "}
                                  attending
                                </p>
                              </div>
                            )}
                          </TableCell>

                          <TableCell>
                            <div>
                              <p className="font-medium">{post.author_name}</p>
                              <p className="text-xs text-muted-foreground">
                                @{post.author_username}
                              </p>
                            </div>
                          </TableCell>

                          <TableCell>
                            <p className="text-sm">{post.reported_by_name}</p>
                          </TableCell>

                          <TableCell>
                            <Badge variant="outline">{post.reason}</Badge>
                          </TableCell>

                          <TableCell>
                            {new Date(post.reported_at).toLocaleDateString()}
                          </TableCell>

                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="outline">
                                <Eye className="w-4 h-4 mr-1" />
                                View
                              </Button>

                              <Button size="sm" variant="destructive">
                                <Trash2 className="w-4 h-4 mr-1" />
                                Remove
                              </Button>

                              <Button size="sm" variant="default">
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Safe
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
