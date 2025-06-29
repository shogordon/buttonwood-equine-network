
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "@/components/ui/Logo";

const SettingsNavigation = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/5 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center">
              <Logo />
            </div>
            <span className="text-xl font-semibold text-white">
              The Aisle
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            <span className="text-white/70 text-sm">Settings</span>
            <Link to="/browse">
              <Button 
                variant="outline" 
                size="sm"
                className="bg-white/5 border-white/20 text-white hover:bg-white/10"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Browse
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SettingsNavigation;
