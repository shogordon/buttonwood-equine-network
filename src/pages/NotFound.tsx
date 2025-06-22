
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

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
                <img src="/lovable-uploads/the-aisle-logo.png" alt="The Aisle" className="h-6 w-6" />
              </div>
              <span className="text-xl font-semibold text-white">
                The Aisle
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
        <div className="text-center max-w-md relative z-10">
          <Card className="bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl">
            <CardContent className="p-12">
              <div className="mb-8">
                <div className="text-8xl font-bold gradient-text mb-4">404</div>
                <h1 className="text-3xl font-bold text-white mb-4 text-shadow">Page Not Found</h1>
                <p className="text-lg text-white/80 mb-8">
                  Sorry, we couldn't find the page you're looking for. The page may have been moved or doesn't exist.
                </p>
              </div>
              
              <div className="space-y-4">
                <Link to="/">
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
                    <Home className="h-4 w-4 mr-2" />
                    Return to Home
                  </Button>
                </Link>
                
                <Button
                  variant="outline"
                  onClick={() => window.history.back()}
                  className="w-full bg-white/5 border-white/20 text-white hover:bg-white/10"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Go Back
                </Button>
              </div>
              
              <div className="mt-8 pt-8 border-t border-white/20">
                <p className="text-sm text-white/60">
                  Attempted to access: <code className="bg-white/10 px-2 py-1 rounded text-xs">{location.pathname}</code>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
