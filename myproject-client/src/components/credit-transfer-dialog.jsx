import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Send, HandCoins } from "lucide-react";

/**
 * Props:
 * - open: boolean
 * - onOpenChange: (open: boolean) => void
 * - currentUserId: string
 * - recipientUser: { id: string, username: string, display_name: string }
 * - currentBalance: number
 */
export function CreditTransferDialog({
  open,
  onOpenChange,
  currentUserId, // kept for parity, even if not used yet
  recipientUser,
  currentBalance,
}) {
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("send"); // "send" | "request"
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const parsedAmount = Number.parseInt(amount, 10);

    if (Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount greater than 0.",
        variant: "destructive",
      });
      return;
    }

    if (activeTab === "send" && parsedAmount > currentBalance) {
      toast({
        title: "Insufficient balance",
        description: "You don't have enough credits to send this amount.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (activeTab === "send") {
      toast({
        title: "Credits sent!",
        description: `Successfully sent ${parsedAmount} credits to ${recipientUser.display_name}.`,
      });
    } else {
      toast({
        title: "Request sent!",
        description: `Credit request for ${parsedAmount} credits sent to ${recipientUser.display_name}.`,
      });
    }

    setIsLoading(false);
    setAmount("");
    onOpenChange(false);
  };

  const handleTabChange = (v) => {
    // keep it strict-ish even in JS
    if (v === "send" || v === "request") setActiveTab(v);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Credit Transfer</DialogTitle>
          <DialogDescription>
            Send credits or request credits from {recipientUser.display_name}
          </DialogDescription>
        </DialogHeader>

        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="send">Send</TabsTrigger>
            <TabsTrigger value="request">Request</TabsTrigger>
          </TabsList>

          <TabsContent value="send" className="space-y-4 mt-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Your balance:</span>
                <span className="font-semibold">{currentBalance} credits</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="send-amount">Amount to send</Label>
                <Input
                  id="send-amount"
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="1"
                  max={currentBalance}
                  disabled={isLoading}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading || !amount}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send {amount || "0"} Credits
                  </>
                )}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="request" className="space-y-4 mt-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="request-amount">Amount to request</Label>
                <Input
                  id="request-amount"
                  type="number"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="1"
                  disabled={isLoading}
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading || !amount}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Requesting...
                  </>
                ) : (
                  <>
                    <HandCoins className="w-4 h-4 mr-2" />
                    Request {amount || "0"} Credits
                  </>
                )}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
