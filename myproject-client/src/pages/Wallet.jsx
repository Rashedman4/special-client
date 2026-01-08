import {
  SidebarTrigger,
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  WalletIcon,
  TrendingUp,
  ArrowUpRight,
  ArrowDownLeft,
} from "lucide-react";
import { SendTokensDialog } from "../components/send-token-dialog";
import { formatDistanceToNow } from "date-fns";
import {
  mockCurrentUser,
  mockUsers,
  mockWallet,
  mockTransactions,
} from "@/lib/dummy-data";
import { AppSidebar } from "@/components/app-sidebar";

export default function WalletPage() {
  const otherUsers = mockUsers.filter((u) => u.id !== mockCurrentUser.id);

  const tokensSent = mockTransactions
    .filter((t) => t.from_user_id === mockCurrentUser.id)
    .reduce((sum, t) => sum + t.amount, 0);

  const tokensReceived = mockTransactions
    .filter((t) => t.to_user_id === mockCurrentUser.id)
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <SidebarProvider>
      <AppSidebar user={mockCurrentUser} isAdmin={false} />

      <SidebarInset>
        <div className="flex flex-col flex-1">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <h1 className="text-xl font-semibold">Wallet</h1>
          </header>

          <div className="flex-1 overflow-auto">
            <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
              {/* Balance Card */}
              <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-sm opacity-90">Total Balance</p>
                      <p className="text-4xl font-bold mt-2">
                        {mockWallet.balance} TST
                      </p>
                      <p className="text-xs opacity-75 mt-1">
                        TokenSphere Tokens
                      </p>
                    </div>
                    <div className="w-16 h-16 rounded-full bg-primary-foreground/10 flex items-center justify-center">
                      <WalletIcon className="w-8 h-8" />
                    </div>
                  </div>

                  <SendTokensDialog
                    userId={mockCurrentUser.id}
                    users={otherUsers}
                    currentBalance={mockWallet.balance}
                  />
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Tokens Sent
                    </CardTitle>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{tokensSent}</div>
                    <p className="text-xs text-muted-foreground">All time</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Tokens Received
                    </CardTitle>
                    <ArrowDownLeft className="w-4 h-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{tokensReceived}</div>
                    <p className="text-xs text-muted-foreground">All time</p>
                  </CardContent>
                </Card>
              </div>

              {/* Transaction History */}
              <Card>
                <CardHeader>
                  <CardTitle>Transaction History</CardTitle>
                  <CardDescription>
                    Your recent token transactions
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  {mockTransactions.length > 0 ? (
                    <div className="space-y-4">
                      {mockTransactions.map((transaction) => {
                        const isSent =
                          transaction.from_user_id === mockCurrentUser.id;
                        const otherUser = isSent
                          ? transaction.to_user
                          : transaction.from_user;

                        return (
                          <div
                            key={transaction.id}
                            className="flex items-center justify-between py-3 border-b last:border-0"
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                  isSent
                                    ? "bg-destructive/10 text-destructive"
                                    : "bg-accent/10 text-accent"
                                }`}
                              >
                                {isSent ? (
                                  <ArrowUpRight className="w-5 h-5" />
                                ) : (
                                  <ArrowDownLeft className="w-5 h-5" />
                                )}
                              </div>

                              <div>
                                <p className="font-medium">
                                  {isSent ? "Sent to" : "Received from"}{" "}
                                  {otherUser?.display_name || "System"}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                  {formatDistanceToNow(
                                    new Date(transaction.created_at),
                                    { addSuffix: true }
                                  )}
                                </p>
                              </div>
                            </div>

                            <div className="text-right">
                              <p
                                className={`font-semibold ${
                                  isSent ? "text-destructive" : "text-accent"
                                }`}
                              >
                                {isSent ? "-" : "+"}
                                {transaction.amount} TST
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="py-12 text-center">
                      <TrendingUp className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">
                        No transactions yet
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Start by sending tokens to your friends or earning
                        rewards
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
