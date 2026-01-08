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

import { mockUsersManagement, mockCurrentUser } from "@/lib/dummy-data";
import { Ban, ShieldCheck, AlertTriangle, CheckCircle } from "lucide-react";
import { AppSidebar } from "@/components/app-sidebar";

export default function UsersManagementPage() {
  return (
    <SidebarProvider>
      <AppSidebar user={mockCurrentUser} isAdmin={true} />

      <SidebarInset>
        <div className="flex flex-col flex-1">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <h1 className="text-xl font-semibold">Users Management</h1>
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
                  className="px-4 py-2 border-b-2 border-primary text-sm font-medium text-primary"
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

              <Card>
                <CardHeader>
                  <CardTitle>All Users</CardTitle>
                </CardHeader>

                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Username</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Joined</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {mockUsersManagement.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              @{user.username}
                              {user.verified && (
                                <CheckCircle className="w-4 h-4 text-primary" />
                              )}
                            </div>
                          </TableCell>

                          <TableCell>{user.email}</TableCell>

                          <TableCell>
                            <Badge
                              variant={
                                user.status === "active"
                                  ? "default"
                                  : user.status === "banned"
                                  ? "destructive"
                                  : "secondary"
                              }
                            >
                              {user.status}
                            </Badge>
                          </TableCell>

                          <TableCell>
                            {new Date(user.created_at).toLocaleDateString()}
                          </TableCell>

                          <TableCell>
                            <div className="flex items-center gap-2">
                              {user.status === "banned" ? (
                                <Button size="sm" variant="outline">
                                  <ShieldCheck className="w-4 h-4 mr-1" />
                                  Unban
                                </Button>
                              ) : (
                                <Button size="sm" variant="outline">
                                  <Ban className="w-4 h-4 mr-1" />
                                  Ban
                                </Button>
                              )}

                              <Button size="sm" variant="outline">
                                <AlertTriangle className="w-4 h-4 mr-1" />
                                Warn
                              </Button>

                              {!user.verified && (
                                <Button size="sm" variant="default">
                                  <CheckCircle className="w-4 h-4 mr-1" />
                                  Verify
                                </Button>
                              )}
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
