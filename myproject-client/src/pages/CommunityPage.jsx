import {
  SidebarTrigger,
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Lock } from "lucide-react";
import { CreateCommunityContent } from "../components/create-communnity-content";
import { CommunityContent } from "@/components/community-content";
import { JoinCommunityButton } from "@/components/join-community-button";
import {
  mockCommunities,
  mockCurrentUser,
  mockPosts,
  mockWallet,
  mockPolls,
  mockEvents,
} from "@/lib/dummy-data";
import { Badge } from "@/components/ui/badge";
import { AppSidebar } from "@/components/app-sidebar";
import { useParams } from "react-router-dom";

export default function CommunityPage() {
  const { id } = useParams();

  const community = mockCommunities.find((c) => c.id === id);

  if (!community) {
    return (
      <SidebarProvider>
        <AppSidebar user={mockCurrentUser} isAdmin={false} />
        <SidebarInset>
          <div className="flex flex-col flex-1">
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <h1 className="text-xl font-semibold">Community</h1>
            </header>

            <div className="flex-1 overflow-auto">
              <div className="max-w-3xl mx-auto p-4 md:p-6 space-y-6">
                <Card>
                  <CardContent className="py-12 text-center">
                    <p className="text-muted-foreground">
                      Community not found.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  const isMember = community.is_member;
  const communityPosts = isMember ? mockPosts.slice(0, 2) : [];
  const communityPolls = isMember
    ? mockPolls.filter((p) => p.community_id === id)
    : [];
  const communityEvents = isMember
    ? mockEvents.filter((e) => e.community_id === id)
    : [];

  return (
    <SidebarProvider>
      <AppSidebar user={mockCurrentUser} isAdmin={false} />
      <SidebarInset>
        <div className="flex flex-col flex-1">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <h1 className="text-xl font-semibold">{community.name}</h1>
          </header>

          <div className="flex-1 overflow-auto">
            <div className="max-w-3xl mx-auto p-4 md:p-6 space-y-6">
              {/* Community Header */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <Avatar className="w-20 h-20">
                      <AvatarImage
                        src="/placeholder.svg"
                        alt={community.name}
                      />
                      <AvatarFallback className="text-2xl">
                        {community.name?.[0] || "C"}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 space-y-4">
                      <div>
                        <h2 className="text-2xl font-bold">{community.name}</h2>
                        <p className="text-muted-foreground mt-2 leading-relaxed">
                          {community.description}
                        </p>
                      </div>

                      <div className="flex items-center gap-4 text-sm flex-wrap">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium">
                            {community.members_count}
                          </span>
                          <span className="text-muted-foreground">members</span>
                        </div>

                        {community.min_credits_required > 0 && (
                          <Badge variant="secondary" className="text-sm">
                            <Lock className="w-3 h-3 mr-1" />
                            {community.min_credits_required} credits required
                          </Badge>
                        )}
                      </div>

                      <JoinCommunityButton
                        communityId={id}
                        userId={mockCurrentUser.id}
                        isMember={isMember}
                        communityName={community.name}
                        minCreditsRequired={community.min_credits_required}
                        userBalance={mockWallet.balance}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Community Content */}
              {isMember ? (
                <div className="space-y-6">
                  <CreateCommunityContent
                    userId={mockCurrentUser.id}
                    communityId={id}
                  />
                  <CommunityContent
                    posts={communityPosts}
                    polls={communityPolls}
                    events={communityEvents}
                    currentUserId={mockCurrentUser.id}
                  />
                </div>
              ) : (
                <Card>
                  <CardContent className="py-12 text-center">
                    <p className="text-lg font-medium mb-2">
                      Join to see posts
                    </p>
                    <p className="text-muted-foreground">
                      You need to be a member to view community posts
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
