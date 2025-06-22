
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Shield, Home, ArrowLeft } from "lucide-react";
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
        <div className="text-center max-w-md">
          <Card className="glass-card shadow-2xl">
            <CardContent className="p-12">
              <div className="mb-8">
                <div className="text-8xl font-bold text-french-blue-600 mb-4">404</div>
                <h1 className="text-3xl font-bold text-slate-gray-800 mb-4">Page Not Found</h1>
                <p className="text-lg text-slate-gray-600 mb-8">
                  Sorry, we couldn't find the page you're looking for. The page may have been moved or doesn't exist.
                </p>
              </div>
              
              <div className="space-y-4">
                <Link to="/">
                  <Button className="w-full bg-french-blue-600 hover:bg-french-blue-700 text-white">
                    <Home className="h-4 w-4 mr-2" />
                    Return to Home
                  </Button>
                </Link>
                
                <Button
                  variant="outline"
                  onClick={() => window.history.back()}
                  className="w-full"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Go Back
                </Button>
              </div>
              
              <div className="mt-8 pt-8 border-t border-slate-200">
                <p className="text-sm text-slate-gray-500">
                  Attempted to access: <code className="bg-slate-100 px-2 py-1 rounded text-xs">{location.pathname}</code>
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
