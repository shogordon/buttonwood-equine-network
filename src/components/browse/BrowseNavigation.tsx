
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LogOut, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "@/components/ui/Logo";

interface BrowseNavigationProps {
  user: any;
  profile: any;
  onSignOut: () => void;
}

const BrowseNavigation = ({ user, profile, onSignOut }: BrowseNavigationProps) => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/5 backdrop-blur-md shadow-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center">
              <Logo />
            </div>
            <span className="text-xl font-semibold text-white">
              The Aisle
            </span>
          </Link>
          
          <div className="flex items-center space-x-4">
            {profile && (
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-white font-medium">
                    Welcome, {profile.display_name || profile.full_name || 'User'}
                  </p>
                  <div className="flex items-center gap-2">
                    {profile.verification_status === 'verified' ? (
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                        ✓ Verified
                      </Badge>
                    ) : (
                      <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                        Pending Verification
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            <Link to="/settings">
              <Button
                variant="outline"
                size="sm"
                className="bg-white/5 border-white/20 text-white hover:bg-white/10 hover:scale-105 transition-all duration-300"
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </Link>
            
            <Link to="/sell">
              <Button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-xl hover:scale-105 transition-all duration-300">
                List Your Horse
              </Button>
            </Link>
            
            <Button
              onClick={onSignOut}
              variant="outline"
              size="sm"
              className="bg-white/5 border-white/20 text-white hover:bg-white/10"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default BrowseNavigation;
