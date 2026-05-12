import { Link } from "wouter";
import { Phone } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-white shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between max-w-5xl">
        <Link href="/" className="flex items-center gap-3">
          <img src="/adaxa-logo.jpg" alt="Adaxa Home" className="h-9 w-auto object-contain" />
          <div className="hidden sm:flex flex-col">
            <span className="font-semibold text-primary leading-tight text-sm">Mykoal DeShazo</span>
            <span className="text-muted-foreground text-[10px] leading-tight">Vice President | Senior Loan Officer at Adaxa Home</span>
          </div>
        </Link>
        <a 
          href="tel:9494185486" 
          className="flex items-center gap-2 text-primary font-medium hover:text-accent transition-colors"
          data-testid="header-phone"
        >
          <Phone className="h-4 w-4" />
          <span>(949) 418-5486</span>
        </a>
      </div>
    </header>
  );
}
