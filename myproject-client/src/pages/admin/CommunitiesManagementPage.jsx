import { Link, useNavigate } from "react-router-dom";

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

import { mockCommunitiesManagement, mockCurrentUser } from "@/lib/dummy-data";
import { Ban, Lock, Coins } from "lucide-react";
import { AppSidebar } from "@/components/app-sidebar";

export default function CommunitiesManagementPage() {
  const navigate = useNavigate();

  return (
    <SidebarProvider>
      <AppSidebar user={mockCurrentUser} isAdmin={true} />

      <SidebarInset>
        <div className="flex flex-col flex-1">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <h1 className="text-xl font-semibold">Community Management</h1>
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
                  className="px-4 py-2 border-b-2 border-transparent text-sm font-medium text-muted-foreground hover:text-foreground hover:border-border"
                >
                  Posts Moderation
                </Link>

                <Link
                  to="/admin/communities"
                  className="px-4 py-2 border-b-2 border-primary text-sm font-medium text-primary"
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
                  <CardTitle>All Communities</CardTitle>
                </CardHeader>

                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Community Name</TableHead>
                        <TableHead>Owner</TableHead>
                        <TableHead>Members</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {mockCommunitiesManagement.map((community) => (
                        <TableRow key={community.id}>
                          <TableCell className="font-medium">
                            {community.name}
                          </TableCell>
                          <TableCell>{community.creator_name}</TableCell>
                          <TableCell>{community.members_count}</TableCell>

                          <TableCell>
                            <Badge
                              variant={
                                community.status === "active"
                                  ? "default"
                                  : community.status === "locked"
                                  ? "destructive"
                                  : "secondary"
                              }
                            >
                              {community.status}
                            </Badge>
                          </TableCell>

                          <TableCell>
                            {new Date(
                              community.created_at
                            ).toLocaleDateString()}
                          </TableCell>

                          <TableCell>
                            <div className="flex items-center gap-2">
                              {community.status === "locked" ? (
                                <Button size="sm" variant="outline">
                                  <Lock className="w-4 h-4 mr-1" />
                                  Unlock
                                </Button>
                              ) : (
                                <>
                                  <Button size="sm" variant="outline">
                                    <Ban className="w-4 h-4 mr-1" />
                                    Disable
                                  </Button>
                                  <Button size="sm" variant="outline">
                                    <Lock className="w-4 h-4 mr-1" />
                                    Lock
                                  </Button>
                                </>
                              )}

                              <Button
                                size="sm"
                                variant="default"
                                onClick={() =>
                                  navigate(
                                    `/admin/airdrop?community=${community.id}`
                                  )
                                }
                              >
                                <Coins className="w-4 h-4 mr-1" />
                                Airdrop
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
