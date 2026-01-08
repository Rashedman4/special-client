import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

import {
  SidebarTrigger,
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  mockCommunities,
  mockAirdropHistory,
  mockCurrentUser,
} from "@/lib/dummy-data";
import { AppSidebar } from "@/components/app-sidebar";

export default function AirdropPage() {
  const [searchParams] = useSearchParams();

  const [selectedCommunity, setSelectedCommunity] = useState("");
  const [activityLevel, setActivityLevel] = useState("all");
  const [membershipDuration, setMembershipDuration] = useState("0");
  const [role, setRole] = useState("all");
  const [minCredits, setMinCredits] = useState("0");
  const [amount, setAmount] = useState("");

  // Support: /admin/airdrop?community=<id>
  useEffect(() => {
    const communityFromQuery = searchParams.get("community");
    if (!communityFromQuery) return;

    const exists = mockCommunities.some((c) => c.id === communityFromQuery);
    if (exists) setSelectedCommunity(communityFromQuery);
  }, [searchParams]);

  const handleAirdrop = () => {
    if (!selectedCommunity || !amount) {
      toast.error("Please fill in all required fields");
      return;
    }

    toast.success(
      `Airdrop of ${amount} tokens sent to eligible members of the community!`
    );

    setSelectedCommunity("");
    setActivityLevel("all");
    setMembershipDuration("0");
    setRole("all");
    setMinCredits("0");
    setAmount("");
  };

  return (
    <SidebarProvider>
      <AppSidebar user={mockCurrentUser} isAdmin={true} />

      <SidebarInset>
        <div className="flex flex-col flex-1">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <h1 className="text-xl font-semibold">Airdrop Management</h1>
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
                  className="px-4 py-2 border-b-2 border-transparent text-sm font-medium text-muted-foreground hover:text-foreground hover:border-border"
                >
                  Communities
                </Link>

                <Link
                  to="/admin/airdrop"
                  className="px-4 py-2 border-b-2 border-primary text-sm font-medium text-primary"
                >
                  Airdrop
                </Link>
              </div>

              {/* Airdrop Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Create Airdrop</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="community">Select Community</Label>
                      <Select
                        value={selectedCommunity}
                        onValueChange={setSelectedCommunity}
                      >
                        <SelectTrigger id="community">
                          <SelectValue placeholder="Choose a community" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockCommunities.map((community) => (
                            <SelectItem key={community.id} value={community.id}>
                              {community.name} ({community.members_count}{" "}
                              members)
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="activity">Activity Level</Label>
                      <Select
                        value={activityLevel}
                        onValueChange={setActivityLevel}
                      >
                        <SelectTrigger id="activity">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Members</SelectItem>
                          <SelectItem value="high">High Activity</SelectItem>
                          <SelectItem value="medium">
                            Medium Activity
                          </SelectItem>
                          <SelectItem value="low">Low Activity</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="duration">
                        Minimum Membership Duration (days)
                      </Label>
                      <Input
                        id="duration"
                        type="number"
                        min="0"
                        value={membershipDuration}
                        onChange={(e) => setMembershipDuration(e.target.value)}
                        placeholder="0"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Select value={role} onValueChange={setRole}>
                        <SelectTrigger id="role">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Roles</SelectItem>
                          <SelectItem value="admin">Admins Only</SelectItem>
                          <SelectItem value="mod">Moderators</SelectItem>
                          <SelectItem value="user">Regular Users</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="minCredits">
                        Minimum Credits Required
                      </Label>
                      <Input
                        id="minCredits"
                        type="number"
                        min="0"
                        value={minCredits}
                        onChange={(e) => setMinCredits(e.target.value)}
                        placeholder="0"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="amount">
                        Airdrop Amount (total tokens)
                      </Label>
                      <Input
                        id="amount"
                        type="number"
                        min="1"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter amount"
                      />
                    </div>
                  </div>

                  <Button onClick={handleAirdrop} className="w-full md:w-auto">
                    Confirm Airdrop
                  </Button>
                </CardContent>
              </Card>

              {/* Airdrop History */}
              <Card>
                <CardHeader>
                  <CardTitle>Airdrop History</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Community</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Recipients</TableHead>
                        <TableHead>Conditions</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {mockAirdropHistory.map((airdrop) => (
                        <TableRow key={airdrop.id}>
                          <TableCell className="font-medium">
                            {airdrop.community_name}
                          </TableCell>
                          <TableCell>
                            {airdrop.amount.toLocaleString()} tokens
                          </TableCell>
                          <TableCell>
                            {airdrop.recipients_count} users
                          </TableCell>
                          <TableCell>
                            <div className="text-xs space-y-1">
                              <p>
                                Activity: {airdrop.conditions.activity_level}
                              </p>
                              <p>
                                Duration:{" "}
                                {airdrop.conditions.membership_duration} days
                              </p>
                              <p>Role: {airdrop.conditions.role}</p>
                              <p>
                                Min Credits: {airdrop.conditions.min_credits}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            {new Date(airdrop.created_at).toLocaleDateString()}
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
