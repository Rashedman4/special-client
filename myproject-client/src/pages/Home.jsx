import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Coins,
  MessageSquare,
  Users,
  Wallet,
  Shield,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col min-h-svh">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-6 flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary">
              <Coins className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold">TokenSphere</span>
          </div>
          <nav className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link to="/auth/login">Sign in</Link>
            </Button>
            <Button asChild>
              <Link to="/auth/sign-up">Get Started</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="mx-auto w-full max-w-7xl px-4 md:px-6 py-24 md:py-32">
        <div className="flex flex-col items-center text-center gap-8 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent-foreground text-sm font-medium">
            <TrendingUp className="w-4 h-4" />
            Join 10,000+ users on TokenSphere
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance">
            Social networking meets{" "}
            <span className="text-primary">token economy</span>
          </h1>
          <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
            Connect with friends, join vibrant communities, and manage your
            digital tokens all in one secure platform. Get rewarded for your
            engagement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild className="text-lg px-8">
              <Link to="/auth/sign-up">Start for Free</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="text-lg px-8 bg-transparent"
            >
              <Link to="/auth/login">Sign In</Link>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Get 100 tokens when you sign up
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/30">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything you need in one place
            </h2>
            <p className="text-lg text-muted-foreground">
              Built for the next generation of social networking
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Social Feed</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Share your thoughts, photos, and updates with your network.
                  Engage with posts through likes and comments.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 text-accent mb-4">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Communities</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Create or join communities around your interests. Share
                  content and connect with like-minded people.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">
                  <Wallet className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Token Wallet</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Manage your tokens with our built-in wallet. Send tokens to
                  friends and track your transaction history.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 text-accent mb-4">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Direct Messaging</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Private conversations with your connections. Stay in touch
                  with real-time messaging.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Your data is protected with enterprise-grade security. Full
                  control over your privacy settings.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 text-accent mb-4">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Earn Rewards</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Get rewarded for your engagement. Earn tokens by creating
                  quality content and helping the community.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto w-full max-w-7xl px-4 md:px-6 py-24">
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="py-16 px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to join TokenSphere?
            </h2>
            <p className="text-lg mb-8 text-primary-foreground/90 max-w-2xl mx-auto">
              Sign up today and get 100 tokens to start your journey. Connect,
              share, and grow with our community.
            </p>
            <Button
              size="lg"
              variant="secondary"
              asChild
              className="text-lg px-8"
            >
              <Link to="/auth/sign-up">Create Your Account</Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-muted/30 mt-auto">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary">
                <Coins className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">TokenSphere</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 TokenSphere. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
