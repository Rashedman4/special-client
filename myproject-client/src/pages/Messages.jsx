import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { MessagesInterface } from "@/components/messages-interface";
import {
  mockCurrentUser,
  mockUsers,
  mockMessages,
  mockConversations,
  mockWallet,
} from "@/lib/dummy-data";

export default function Messages() {
  const otherUsers = mockUsers.filter((u) => u.id !== mockCurrentUser.id);

  return (
    <SidebarProvider>
      <AppSidebar user={mockCurrentUser} isAdmin={false} />

      <SidebarInset>
        <div className="flex flex-col flex-1">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <h1 className="text-xl font-semibold">Messages</h1>
          </header>

          <MessagesInterface
            currentUserId={mockCurrentUser.id}
            users={otherUsers}
            conversations={mockConversations}
            allMessages={mockMessages}
            currentUserBalance={mockWallet.balance}
          />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
