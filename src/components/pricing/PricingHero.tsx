
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const PricingHero = () => {
  return (
    <section className="relative py-20 pt-32">
      <div className="hero-gradient absolute inset-0" />
      <div className="glass-overlay" />
      <div className="container mx-auto px-6 text-center relative z-10">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 text-shadow">
          Simple Pricing. <span className="gradient-text">Powerful Tools.</span>
        </h1>
        <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
          Whether you're casually browsing or managing top sales horses, The Aisle gives you the tools to connect with confidence.
        </p>
        <Link to="/auth">
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:scale-105 transition-all duration-300 px-8 py-3 text-lg font-semibold">
            Get Started
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default PricingHero;
