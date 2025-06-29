
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings, User, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import Logo from "@/components/ui/Logo";
import { useAuth } from "@/hooks/useAuth";

interface AppNavigationProps {
  onSignOut?: () => void;
}

const AppNavigation = ({ onSignOut }: AppNavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, profile } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    if (onSignOut) {
      await onSignOut();
    }
  };

  // Common navigation items
  const publicNavItems = [
    { to: "/how-it-works", label: "How It Works" },
    { to: "/trust", label: "Trust & Safety" },
    { to: "/blog", label: "Blog" },
  ];

  const aboutNavItems = [
    { to: "/about", label: "About" },
    { to: "/pricing", label: "Pricing" },
  ];

  // Get display name from profile
  const getDisplayName = () => {
    if (profile?.first_name && profile?.last_name) {
      return `${profile.first_name} ${profile.last_name}`;
    }
    if (profile?.first_name) {
      return profile.first_name;
    }
    return 'User';
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/5 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center">
              <Logo />
            </div>
            <span className="text-xl font-semibold text-white">
              The Aisle
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {/* Public nav items - always visible */}
            {!user && aboutNavItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`transition-colors ${
                  isActive(item.to) 
                    ? "text-blue-400 font-medium" 
                    : "text-white/70 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}

            {/* Authenticated user nav items */}
            {user && (
              <Link
                to="/browse"
                className={`transition-colors ${
                  isActive("/browse") 
                    ? "text-blue-400 font-medium" 
                    : "text-white/70 hover:text-white"
                }`}
              >
                Browse
              </Link>
            )}

            {/* Common nav items */}
            {publicNavItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`transition-colors ${
                  isActive(item.to) 
                    ? "text-blue-400 font-medium" 
                    : "text-white/70 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {/* List Horse Button - Primary Action */}
                <Link to="/sell" className="hidden md:block">
                  <Button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-xl hover:scale-105 transition-all duration-300 font-medium">
                    List Your Horse
                  </Button>
                </Link>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      className="flex items-center space-x-3 hover:bg-white/10 rounded-xl px-3 py-2"
                    >
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                          <User className="h-4 w-4 text-white" />
                        </div>
                        <div className="hidden md:block text-left">
                          <p className="text-white font-medium text-sm">
                            {getDisplayName()}
                          </p>
                          {profile?.verification_status === 'verified' ? (
                            <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                              ✓ Verified
                            </Badge>
                          ) : (
                            <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30 text-xs">
                              Pending
                            </Badge>
                          )}
                        </div>
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    align="end" 
                    className="w-56 bg-slate-800/95 backdrop-blur-xl border-white/10 text-white"
                  >
                    <div className="md:hidden">
                      <DropdownMenuItem asChild>
                        <Link to="/sell" className="flex items-center">
                          List Your Horse
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-white/10" />
                    </div>
                    
                    <DropdownMenuItem asChild>
                      <Link to="/settings" className="flex items-center">
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    
                    <DropdownMenuSeparator className="bg-white/10" />
                    
                    <DropdownMenuItem 
                      onClick={handleSignOut}
                      className="flex items-center text-red-400 hover:text-red-300 hover:bg-red-500/10"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Link to="/auth">
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:scale-105 transition-all duration-300 px-6 py-2.5 font-semibold">
                  Sign In
                </Button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-white hover:bg-white/10"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-white/10 pt-4">
            <div className="flex flex-col space-y-3">
              {/* Navigation Items */}
              {!user && aboutNavItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`text-white/70 hover:text-white transition-colors py-2 ${
                    isActive(item.to) ? "text-blue-400 font-medium" : ""
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              {user && (
                <Link
                  to="/browse"
                  className={`text-white/70 hover:text-white transition-colors py-2 ${
                    isActive("/browse") ? "text-blue-400 font-medium" : ""
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Browse
                </Link>
              )}

              {publicNavItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`text-white/70 hover:text-white transition-colors py-2 ${
                    isActive(item.to) ? "text-blue-400 font-medium" : ""
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default AppNavigation;
