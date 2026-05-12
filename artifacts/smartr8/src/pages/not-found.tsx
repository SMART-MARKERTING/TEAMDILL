import { Link } from "wouter";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-9xl font-bold text-primary/10 mb-4">404</h1>
          <h2 className="text-2xl font-bold text-primary mb-6">Page not found. Let's get you home.</h2>
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white">
            <Link href="/">
              Return to Homepage
            </Link>
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
