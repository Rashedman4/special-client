import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function SendTokensDialog({ userId, users, currentBalance }) {
  const [open, setOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const selectedUser = users.find((u) => u.id === selectedUserId);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const amountNum = Number.parseFloat(amount);

    if (amountNum <= 0 || amountNum > currentBalance) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount within your balance.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 800));

    toast({
      title: "Tokens sent",
      description: `Successfully sent ${amountNum} TST to ${selectedUser?.display_name}`,
    });

    setOpen(false);
    setSelectedUserId("");
    setAmount("");
    setDescription("");
    setIsLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90"
        >
          <Send className="w-4 h-4 mr-2" />
          Send Tokens
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Send Tokens</DialogTitle>
          <DialogDescription>
            Transfer tokens to another user on TokenSphere
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Recipient</Label>

            <Select
              value={selectedUserId}
              onValueChange={setSelectedUserId}
              disabled={isLoading}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a user" />
              </SelectTrigger>

              <SelectContent>
                {users.map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarImage
                          src={user.avatar_url || "/placeholder.svg"}
                          alt={user.display_name}
                        />
                        <AvatarFallback>
                          {user.display_name?.[0]}
                        </AvatarFallback>
                      </Avatar>

                      <span>
                        {user.display_name} (@{user.username})
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount (TST)</Label>

            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0.01"
              max={currentBalance}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              required
              disabled={isLoading}
            />

            <p className="text-xs text-muted-foreground">
              Available balance: {Number(currentBalance).toFixed(2)} TST
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Note (optional)</Label>

            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a note..."
              className="resize-none"
              disabled={isLoading}
            />
          </div>

          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={!selectedUserId || !amount || isLoading}
              className="flex-1"
            >
              {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Send {amount || "0"} TST
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isLoading}
              className="bg-transparent"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
