import {
  SidebarTrigger,
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { CreateCommunityDialog } from "@/components/create-community-dialog";
import { mockCommunities, mockCurrentUser } from "@/lib/dummy-data";
import { Badge } from "@/components/ui/badge";
import { AppSidebar } from "@/components/app-sidebar";

export default function Communities() {
  const myCommunities = mockCommunities.filter((c) => c.is_member);
  const discoverCommunities = mockCommunities.filter((c) => !c.is_member);

  return (
    <SidebarProvider>
      <AppSidebar user={mockCurrentUser} isAdmin={false} />

      <SidebarInset>
        <div className="flex flex-col flex-1">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <h1 className="text-xl font-semibold">Communities</h1>
            <div className="ml-auto">
              <CreateCommunityDialog userId={mockCurrentUser.id} />
            </div>
          </header>

          <div className="flex-1 overflow-auto">
            <div className="max-w-5xl mx-auto p-4 md:p-6 space-y-6">
              {/* My Communities */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">My Communities</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {myCommunities.map((community) => (
                    <Link
                      key={community.id}
                      to={`/communities/${community.id}`}
                      className="block"
                    >
                      <Card className="hover:border-primary transition-colors cursor-pointer h-full">
                        <CardHeader className="pb-3">
                          <div className="flex items-start gap-3">
                            <Avatar className="w-12 h-12">
                              <AvatarImage
                                src="/placeholder.svg"
                                alt={community.name}
                              />
                              <AvatarFallback>
                                {community.name?.[0] || "C"}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold truncate">
                                {community.name}
                              </h3>
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {community.description}
                              </p>
                            </div>
                          </div>
                        </CardHeader>

                        <CardContent>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              <span>{community.members_count} members</span>
                            </div>

                            {community.min_credits_required > 0 && (
                              <Badge variant="secondary" className="text-xs">
                                <Lock className="w-3 h-3 mr-1" />
                                {community.min_credits_required} min
                              </Badge>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Discover Communities */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Discover</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {discoverCommunities.map((community) => (
                    <Link
                      key={community.id}
                      to={`/communities/${community.id}`}
                      className="block"
                    >
                      <Card className="hover:border-primary transition-colors cursor-pointer h-full">
                        <CardHeader className="pb-3">
                          <div className="flex items-start gap-3">
                            <Avatar className="w-12 h-12">
                              <AvatarImage
                                src="/placeholder.svg"
                                alt={community.name}
                              />
                              <AvatarFallback>
                                {community.name?.[0] || "C"}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold truncate">
                                {community.name}
                              </h3>
                              <p className="text-sm text-muted-foreground line-clamp-2">
                                {community.description}
                              </p>
                            </div>
                          </div>
                        </CardHeader>

                        <CardContent>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              <span>{community.members_count} members</span>
                            </div>

                            {community.min_credits_required > 0 && (
                              <Badge variant="secondary" className="text-xs">
                                <Lock className="w-3 h-3 mr-1" />
                                {community.min_credits_required} min
                              </Badge>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
