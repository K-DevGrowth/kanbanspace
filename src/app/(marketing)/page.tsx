import { MarketingHeader } from "@/components/marketing/marketing-header";
import { HeroSection } from "@/components/marketing/hero-section";
import { MarketingFooter } from "@/components/marketing/marketing-footer";

export default function MarketingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground antialiased">
      <MarketingHeader />
      <main className="flex-1">
        <HeroSection />
      </main>
      <MarketingFooter />
    </div>
  );
}
