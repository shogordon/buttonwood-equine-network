
import PricingNavigation from "@/components/pricing/PricingNavigation";
import PricingHero from "@/components/pricing/PricingHero";
import PricingTiers from "@/components/pricing/PricingTiers";
import AddOnsSection from "@/components/pricing/AddOnsSection";
import LaunchPromoSection from "@/components/pricing/LaunchPromoSection";
import FooterCTA from "@/components/pricing/FooterCTA";

const Pricing = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 -z-10">
        <div className="floating-element top-20 left-20 w-64 h-64 animate-float opacity-20" />
        <div className="floating-element top-40 right-32 w-32 h-32 animate-float opacity-15" style={{ animationDelay: '2s' }} />
        <div className="floating-element bottom-32 left-40 w-48 h-48 animate-float opacity-10" style={{ animationDelay: '4s' }} />
        <div className="floating-element bottom-20 right-20 w-40 h-40 animate-float opacity-12" style={{ animationDelay: '6s' }} />
      </div>

      <PricingNavigation />
      <PricingHero />
      <PricingTiers />
      <AddOnsSection />
      <LaunchPromoSection />
      <FooterCTA />
    </div>
  );
};

export default Pricing;
