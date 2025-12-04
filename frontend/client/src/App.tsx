import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AuthProvider } from "@/contexts/AuthContext";
import { WalletProvider, useWallet } from "@/contexts/WalletContext";
import AppSidebar from "@/components/AppSidebar";
import WalletButton from "@/components/WalletButton";
import ConnectWalletDialog from "@/components/ConnectWalletDialog";
import { EmailLoginDialog } from "@/components/EmailLoginDialog";
import Dashboard from "@/pages/Dashboard";
import Pools from "@/pages/Pools";
import AIAgent from "@/pages/AIAgent";
import Compare from "@/pages/Compare";
import Profile from "@/pages/Profile";
import NotFound from "@/pages/not-found";
import { Menu } from "lucide-react";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/pools" component={Pools} />
      <Route path="/ai-agent" component={AIAgent} />
      <Route path="/compare" component={Compare} />
      <Route path="/profile" component={Profile} />
      <Route component={NotFound} />
    </Switch>
  );
}

function AppContent() {
  const { wallet } = useWallet();

  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="flex items-center justify-between gap-4 p-4 border-b border-border bg-background sticky top-0 z-10">
            <SidebarTrigger data-testid="button-sidebar-toggle">
              <Menu className="h-5 w-5" />
            </SidebarTrigger>
            <div className="flex items-center gap-3">
              {wallet ? <WalletButton /> : <ConnectWalletDialog />}
              <EmailLoginDialog />
            </div>
          </header>
          <main className="flex-1 overflow-y-auto p-6">
            <div className="max-w-7xl mx-auto">
              <Router />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <WalletProvider>
            <AppContent />
          </WalletProvider>
        </AuthProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
