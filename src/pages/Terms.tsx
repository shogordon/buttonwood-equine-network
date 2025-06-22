
import { Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Terms = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-ivory-50 to-french-blue-50">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 bg-white/5 backdrop-blur-md shadow-md">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-xl bg-white/5 backdrop-blur-md flex items-center justify-center">
                <Shield className="h-6 w-6 text-blue-400" />
              </div>
              <span className="text-xl font-semibold text-slate-gray-800">
                Buttonwood Bluebook
              </span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/about" className="text-slate-gray-600 hover:text-slate-gray-800 transition-colors">
                About
              </Link>
              <Link to="/pricing" className="text-slate-gray-600 hover:text-slate-gray-800 transition-colors">
                Pricing
              </Link>
              <Link to="/trust" className="text-slate-gray-600 hover:text-slate-gray-800 transition-colors">
                How It Works
              </Link>
              <Link to="/trust" className="text-slate-gray-600 hover:text-slate-gray-800 transition-colors">
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

      <div className="flex items-center justify-center p-6 pt-32">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-slate-gray-800 mb-4">Terms of Service - Coming Soon</h1>
          <p className="text-lg text-slate-gray-600">
            We're working on bringing you our terms of service information.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
