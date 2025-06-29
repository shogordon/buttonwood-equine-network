
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/Logo";

const PricingNavigation = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/5 backdrop-blur-md shadow-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-xl bg-white/5 backdrop-blur-md flex items-center justify-center">
              <Logo />
            </div>
            <span className="text-xl font-semibold text-white">
              The Aisle
            </span>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/about" className="text-white/80 hover:text-white transition-colors">
              About
            </Link>
            <Link to="/pricing" className="text-white font-medium transition-colors">
              Pricing
            </Link>
            <Link to="/how-it-works" className="text-white/80 hover:text-white transition-colors">
              How It Works
            </Link>
            <Link to="/trust" className="text-white/80 hover:text-white transition-colors">
              Trust & Safety
            </Link>
            <Link to="/blog" className="text-white/80 hover:text-white transition-colors">
              Blog
            </Link>
            <Link to="/auth">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:scale-105 transition-all duration-300 px-6 py-2.5 font-semibold">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default PricingNavigation;
