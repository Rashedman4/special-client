import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { EditProfileForm } from "@/components/edit-profile-form";
import { mockCurrentUser } from "@/lib/dummy-data";

export default function Settings() {
  return (
    <SidebarProvider>
      <AppSidebar user={mockCurrentUser} isAdmin={false} />

      <SidebarInset>
        <div className="flex flex-col flex-1">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <h1 className="text-xl font-semibold">Settings</h1>
          </header>

          <div className="flex-1 overflow-auto">
            <div className="max-w-2xl mx-auto p-4 md:p-6 space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Edit Profile</h2>
                <p className="text-muted-foreground">
                  Update your profile information
                </p>
              </div>

              <EditProfileForm profile={mockCurrentUser} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
