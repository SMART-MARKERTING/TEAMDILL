import React, { useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function ThankYou() {
  useEffect(() => {
    // Add noindex meta tag
    let meta = document.querySelector('meta[name="robots"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'robots');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', 'noindex, nofollow');

    return () => {
      // Cleanup on unmount
      if (meta && meta.getAttribute('content') === 'noindex, nofollow') {
        document.head.removeChild(meta);
      }
    };
  }, []);

  return (
    <div className="min-h-[100dvh] flex flex-col bg-background">
      <Header />

      <main className="flex-1 flex flex-col items-center justify-start pt-20 pb-12 px-4 container mx-auto max-w-4xl text-center">
        <div className="animate-in fade-in zoom-in duration-500 max-w-2xl w-full">
          <div className="h-16 w-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary mb-6">
            Got it. Let's talk.
          </h1>
          
          <p className="text-xl text-muted-foreground leading-relaxed mb-12">
            I'll review what you sent and reach out within a few hours. If you want to lock in a time now, grab a slot below. While you wait, save my number: <a href="tel:9494185486" className="font-semibold text-primary hover:underline">(949) 418-5486</a>. Text me anytime.
          </p>

          <div 
            className="w-full min-h-[500px] border border-border rounded-xl bg-card shadow-sm flex items-center justify-center p-8 text-muted-foreground"
            data-testid="calcom-placeholder"
          >
            <div className="text-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto mb-4 opacity-50">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
              <p>Cal.com scheduling will appear here — add your Cal.com embed URL to enable booking</p>
              {/* TODO: Replace with Cal.com embed script */}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
