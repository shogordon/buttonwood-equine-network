
import { Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Privacy = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 -z-10">
        <div className="floating-element top-20 left-20 w-64 h-64 animate-float opacity-20" />
        <div className="floating-element top-40 right-32 w-32 h-32 animate-float opacity-15" style={{ animationDelay: '2s' }} />
        <div className="floating-element bottom-32 left-40 w-48 h-48 animate-float opacity-10" style={{ animationDelay: '4s' }} />
        <div className="floating-element bottom-20 right-20 w-40 h-40 animate-float opacity-12" style={{ animationDelay: '6s' }} />
      </div>

      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 bg-white/5 backdrop-blur-md shadow-md">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-xl bg-white/5 backdrop-blur-md flex items-center justify-center">
                <Shield className="h-6 w-6 text-blue-400" />
              </div>
              <span className="text-xl font-semibold text-white">
                Buttonwood Bluebook
              </span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/about" className="text-white/80 hover:text-white transition-colors">
                About
              </Link>
              <Link to="/pricing" className="text-white/80 hover:text-white transition-colors">
                Pricing
              </Link>
              <Link to="/trust" className="text-white/80 hover:text-white transition-colors">
                How It Works
              </Link>
              <Link to="/trust" className="text-white/80 hover:text-white transition-colors">
                Trust & Safety
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

      <div className="flex items-center justify-center p-6 pt-32 relative">
        <div className="glass-overlay"></div>
        <div className="text-center relative z-10">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-12 shadow-lg border border-white/10">
            <h1 className="text-4xl font-bold text-white mb-4 text-shadow">Privacy Policy - Coming Soon</h1>
            <p className="text-lg text-white/80">
              We're working on bringing you our privacy policy information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
