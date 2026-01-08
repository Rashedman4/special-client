import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { CreatePostForm } from "@/components/create-post-form";
import { PostsList } from "@/components/posts-list";
import { mockPosts, mockCurrentUser } from "@/lib/dummy-data";

export default function Dashboard() {
  return (
    <SidebarProvider>
      <AppSidebar user={mockCurrentUser} isAdmin={false} />

      <SidebarInset>
        <div className="flex flex-col flex-1">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <h1 className="text-xl font-semibold">Home Feed</h1>
          </header>

          <div className="flex-1 overflow-auto">
            <div className="max-w-2xl mx-auto p-4 md:p-6 space-y-6">
              <CreatePostForm userId={mockCurrentUser.id} />
              <PostsList posts={mockPosts} currentUserId={mockCurrentUser.id} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
