import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import {
  Home,
  Users,
  MessageSquare,
  Wallet,
  User,
  Settings,
  LogOut,
  Coins,
  Shield,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

/**
 * Props:
 * - user?: { id, email, display_name, avatar_url?, username }
 * - isAdmin?: boolean
 */
export function AppSidebar({ user, isAdmin }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setOpenMobile } = useSidebar();

  const pathname = location.pathname;

  const handleSignOut = async () => {
    toast({
      title: "Signed out",
      description: "You've been successfully signed out.",
    });
    navigate("/");
  };

  const navItems = [
    { icon: Home, label: "Feed", href: "/dashboard" },
    { icon: Users, label: "Communities", href: "/communities" },
    { icon: MessageSquare, label: "Messages", href: "/messages" },
    { icon: Wallet, label: "Wallet", href: "/wallet" },
  ];

  const bottomItems = [
    {
      icon: User,
      label: "Profile",
      href: user?.username ? `/profile/${user.username}` : "/profile",
    },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  if (isAdmin) {
    bottomItems.unshift({ icon: Shield, label: "Admin", href: "/admin" });
  }

  return (
    <Sidebar>
      <SidebarHeader className="border-b px-6 py-4">
        <Link
          to="/dashboard"
          className="flex items-center gap-2"
          onClick={() => setOpenMobile(false)}
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary">
            <Coins className="w-6 h-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">TokenSphere</span>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    onClick={() => setOpenMobile(false)}
                  >
                    <Link to={item.href}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {bottomItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    onClick={() => setOpenMobile(false)}
                  >
                    <Link to={item.href}>
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        {user && (
          <div className="flex items-center gap-3 mb-3">
            <Avatar className="w-10 h-10">
              <AvatarImage
                src={user.avatar_url || "/placeholder.svg"}
                alt={user.display_name}
              />
              <AvatarFallback>{user.display_name?.[0] || "U"}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {user.display_name}
              </p>
              <p className="text-xs text-muted-foreground truncate">
                @{user.username}
              </p>
            </div>
          </div>
        )}

        <Button
          variant="outline"
          size="sm"
          onClick={handleSignOut}
          className="w-full bg-transparent"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
