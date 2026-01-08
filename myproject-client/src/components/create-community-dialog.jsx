import { useState } from "react";
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
import { Plus, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

/**
 * Props:
 * - userId: string
 * - onCommunityCreated?: () => void   // optional: parent can refetch list
 */
export function CreateCommunityDialog({ userId, onCommunityCreated }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [minCredits, setMinCredits] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate community creation with dummy data
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Community created",
      description: `${name} has been created successfully${
        minCredits ? ` with ${minCredits} minimum credits required.` : "."
      }`,
    });

    setOpen(false);
    setName("");
    setDescription("");
    setMinCredits("");
    setIsLoading(false);

    // Vite pattern: parent re-fetch / update state
    onCommunityCreated?.();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create Community
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a Community</DialogTitle>
          <DialogDescription>
            Start a new community for people with similar interests
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Web Developers"
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell people what this community is about..."
              className="min-h-[100px] resize-none"
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="minCredits">
              Minimum Credits Required (Optional)
            </Label>
            <Input
              id="minCredits"
              type="number"
              value={minCredits}
              onChange={(e) => setMinCredits(e.target.value)}
              placeholder="e.g., 50"
              min="0"
              disabled={isLoading}
            />
            <p className="text-xs text-muted-foreground">
              Users must have this minimum balance to join (credits won't be
              deducted)
            </p>
          </div>

          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={!name.trim() || isLoading}
              className="flex-1"
            >
              {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Create
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
