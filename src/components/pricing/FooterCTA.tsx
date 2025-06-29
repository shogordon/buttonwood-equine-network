
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const FooterCTA = () => {
  return (
    <section className="py-20 relative">
      <div className="hero-gradient absolute inset-0" />
      <div className="glass-overlay" />
      <div className="container mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl font-bold text-white mb-6 text-shadow">
          Ready to Transform Your Horse Trading Experience?
        </h2>
        <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
          Join The Aisle today and connect with the equestrian community like never before.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/auth">
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:scale-105 transition-all duration-300 px-8 py-3 text-lg font-semibold">
              Start Free Trial
            </Button>
          </Link>
          <Link to="/contact">
            <Button className="glass-button text-white rounded-xl hover:scale-105 transition-all duration-300 px-8 py-3 text-lg font-semibold">
              Contact Sales
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FooterCTA;
