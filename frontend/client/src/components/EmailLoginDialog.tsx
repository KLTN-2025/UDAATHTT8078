import { useState } from "react";
import { Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";

export function EmailLoginDialog() {
  const { session, loginWithEmail, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  if (session) {
    return (
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1">
          <Mail className="h-3 w-3" />
          {session.user.email || session.user.id}
        </span>
        <Button variant="ghost" size="xs" onClick={logout} className="h-6 px-2">
          Logout
        </Button>
      </div>
    );
  }

  const handleSubmit = async () => {
    if (!email) return;
    setLoading(true);
    try {
      await loginWithEmail(email);
      setOpen(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1" data-testid="button-email-login">
          <Mail className="h-4 w-4" />
          <span className="hidden sm:inline">Sign in with Email</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Email Sign In</DialogTitle>
          <DialogDescription>
            Enter your email to sign in and link it to your DeFAI account.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <Input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button onClick={handleSubmit} disabled={loading || !email} className="w-full">
            {loading ? "Signing in..." : "Continue"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}