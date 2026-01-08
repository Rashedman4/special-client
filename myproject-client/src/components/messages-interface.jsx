import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Search, CircleDollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { formatDistanceToNow } from "date-fns";
import { CreditTransferDialog } from "./credit-transfer-dialog";

export function MessagesInterface({
  currentUserId,
  users,
  conversations,
  allMessages,
  currentUserBalance,
}) {
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showCreditDialog, setShowCreditDialog] = useState(false);

  const messagesEndRef = useRef(null);
  const { toast } = useToast();

  const selectedUser = users.find((u) => u.id === selectedUserId);

  const filteredConversations = conversations.filter((conv) => {
    const q = searchQuery.toLowerCase();
    return (
      conv.display_name.toLowerCase().includes(q) ||
      conv.username.toLowerCase().includes(q)
    );
  });

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (selectedUserId && allMessages?.[selectedUserId]) {
      setMessages(allMessages[selectedUserId]);
    } else if (selectedUserId) {
      setMessages([]);
    }
  }, [selectedUserId, allMessages]);

  useEffect(() => {
    scrollToBottom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedUserId) return;

    const newMsg = {
      id: `msg-${Date.now()}`,
      sender_id: currentUserId,
      content: newMessage.trim(),
      created_at: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, newMsg]);
    setNewMessage("");

    toast({
      title: "Message sent",
      description: "Your message has been sent successfully.",
    });
  };

  return (
    <div className="flex-1 flex overflow-hidden">
      {/* Contacts List */}
      <div className="w-full md:w-80 border-r flex flex-col">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search contacts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-2 space-y-1">
            {filteredConversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedUserId(conv.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors ${
                  selectedUserId === conv.id ? "bg-accent" : ""
                }`}
              >
                <Avatar className="w-10 h-10">
                  <AvatarImage
                    src={conv.avatar_url || "/placeholder.svg"}
                    alt={conv.display_name}
                  />
                  <AvatarFallback>
                    {conv.display_name?.[0] || "U"}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0 text-left">
                  <p className="font-medium truncate">{conv.display_name}</p>
                  <p className="text-sm text-muted-foreground truncate">
                    {conv.last_message}
                  </p>
                </div>

                {conv.unread_count > 0 && (
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                    {conv.unread_count}
                  </div>
                )}
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Conversation Area */}
      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage
                  src={selectedUser.avatar_url || "/placeholder.svg"}
                  alt={selectedUser.display_name}
                />
                <AvatarFallback>
                  {selectedUser.display_name?.[0] || "U"}
                </AvatarFallback>
              </Avatar>

              <div>
                <p className="font-semibold">{selectedUser.display_name}</p>
                <p className="text-sm text-muted-foreground">
                  @{selectedUser.username}
                </p>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.length === 0 ? (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-muted-foreground">
                      No messages yet. Start the conversation!
                    </p>
                  </div>
                ) : (
                  messages.map((msg) => {
                    const isOwnMessage = msg.sender_id === currentUserId;
                    return (
                      <div
                        key={msg.id}
                        className={`flex ${
                          isOwnMessage ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[70%] space-y-1 ${
                            isOwnMessage ? "items-end" : "items-start"
                          }`}
                        >
                          <Card
                            className={`p-3 ${
                              isOwnMessage
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-foreground"
                            }`}
                          >
                            <p className="text-sm leading-relaxed break-words">
                              {msg.content}
                            </p>
                          </Card>
                          <p className="text-xs text-muted-foreground px-2">
                            {formatDistanceToNow(new Date(msg.created_at), {
                              addSuffix: true,
                            })}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}

                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Composer */}
            <div className="p-4 border-t">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />

                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => setShowCreditDialog(true)}
                  title="Send or request credits"
                >
                  <CircleDollarSign className="w-4 h-4" />
                </Button>

                <Button type="submit" disabled={!newMessage.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>

            {selectedUser && (
              <CreditTransferDialog
                open={showCreditDialog}
                onOpenChange={setShowCreditDialog}
                currentUserId={currentUserId}
                recipientUser={selectedUser}
                currentBalance={currentUserBalance}
              />
            )}
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <p className="text-lg font-medium mb-2">Select a contact</p>
              <p className="text-muted-foreground">
                Choose someone from your contacts to start messaging
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
