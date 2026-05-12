export function Footer() {
  return (
    <footer className="bg-white border-t border-border py-12 mt-auto">
      <div className="container mx-auto px-4 max-w-5xl text-center">
        <p className="text-primary font-medium mb-1">Mykoal DeShazo | Vice President | Senior Loan Officer | NMLS #1912347</p>
        <p className="text-muted-foreground text-sm mb-4">Adaxa Home, LLC | NMLS #2380533<br />16767 N Perimeter Dr., Ste 150, Scottsdale, AZ 85260<br />Equal Housing Opportunity</p>
        <p className="text-muted-foreground text-xs mb-2">
          <a href="https://adaxahome.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">
            Full licensing and disclosures at adaxahome.com
          </a>
        </p>
        <p className="text-muted-foreground text-xs max-w-3xl mx-auto opacity-80">
          This is not a commitment to lend. All loans subject to credit approval, income verification, and property appraisal. Rates and terms subject to change.
        </p>
      </div>
    </footer>
  );
}
