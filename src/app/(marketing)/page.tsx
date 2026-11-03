import { MarketingHeader } from "@/components/marketing/marketing-header";
import { HeroSection } from "@/components/marketing/hero-section";
import { DesignSystemShowcase } from "@/components/marketing/design-system-showcase";
import { MarketingFooter } from "@/components/marketing/marketing-footer";

export default function MarketingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground antialiased selection:bg-blue-500/15 selection:text-foreground">
      <MarketingHeader />
      <main className="flex-1">
        <HeroSection />
        <DesignSystemShowcase />
      </main>
      <MarketingFooter />
    </div>
  );
}
