import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

/**
 * Props:
 * - communityId: string
 * - userId: string
 * - isMember: boolean
 * - communityName: string
 * - minCreditsRequired?: number
 * - userBalance: number
 * - onRefresh?: () => void   // replaces Next.js router.refresh()
 */
export function JoinCommunityButton({
  communityId,
  userId,
  isMember,
  communityName,
  minCreditsRequired = 0,
  userBalance,
  onRefresh,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleJoin = async () => {
    if (
      !isMember &&
      minCreditsRequired > 0 &&
      userBalance < minCreditsRequired
    ) {
      toast({
        title: "Insufficient credits",
        description: `You need at least ${minCreditsRequired} credits to join this community. Your current balance: ${userBalance}`,
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate join/leave action with dummy data
    await new Promise((resolve) => setTimeout(resolve, 800));

    if (isMember) {
      toast({
        title: "Left community",
        description: `You have left ${communityName}.`,
      });
    } else {
      toast({
        title: "Joined community",
        description: `Welcome to ${communityName}!`,
      });
    }

    setIsLoading(false);

    // In Vite/React, refresh should be handled by parent state re-fetching
    if (typeof onRefresh === "function") onRefresh();
  };

  return (
    <Button
      onClick={handleJoin}
      disabled={isLoading}
      variant={isMember ? "outline" : "default"}
    >
      {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {isMember ? "Leave Community" : "Join Community"}
    </Button>
  );
}
