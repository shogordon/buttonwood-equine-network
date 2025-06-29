
import { Shield, Mail, Bell, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo from "@/components/ui/Logo";

const Blog = () => {
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
              <Link to="/pricing" className="text-white/80 hover:text-white transition-colors">
                Pricing
              </Link>
              <Link to="/how-it-works" className="text-white/80 hover:text-white transition-colors">
                How It Works
              </Link>
              <Link to="/trust" className="text-white/80 hover:text-white transition-colors">
                Trust & Safety
              </Link>
              <Link to="/blog" className="text-white font-medium transition-colors">
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

      <div className="flex items-center justify-center p-6 pt-32 relative min-h-screen">
        <div className="glass-overlay"></div>
        <div className="text-center relative z-10 max-w-4xl mx-auto">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl p-16 shadow-lg border border-white/10">
            <div className="w-20 h-20 mx-auto mb-8 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl flex items-center justify-center">
              <Calendar className="h-10 w-10 text-blue-400" />
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 text-shadow">
              <span className="gradient-text">The Aisle Blog</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 mb-8 leading-relaxed">
              Insights, stories, and expert advice from the equestrian world.
            </p>
            
            <div className="bg-white/5 rounded-xl p-8 mb-12 border border-white/10">
              <div className="flex items-center justify-center mb-4">
                <Bell className="h-6 w-6 text-yellow-400 mr-2" />
                <h2 className="text-2xl font-bold text-white">Coming Soon</h2>
              </div>
              
              <p className="text-white/70 mb-8 max-w-2xl mx-auto">
                We're crafting amazing content about horse buying, selling, training tips, 
                market insights, and success stories from our community. Be the first to know when we launch!
              </p>
              
              <div className="max-w-md mx-auto">
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/50" />
                    <Input 
                      placeholder="Enter your email address"
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-xl"
                    />
                  </div>
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 rounded-xl hover:scale-105 transition-all duration-300 font-semibold">
                    Notify Me
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-bold text-white mb-3">Market Insights</h3>
                <p className="text-white/70 text-sm">
                  Stay updated on market trends, pricing analysis, and buying/selling strategies.
                </p>
              </div>
              
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-bold text-white mb-3">Success Stories</h3>
                <p className="text-white/70 text-sm">
                  Real stories from buyers and sellers who found their perfect match through The Aisle.
                </p>
              </div>
              
              <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-bold text-white mb-3">Expert Tips</h3>
                <p className="text-white/70 text-sm">
                  Professional advice on horse care, training, and making informed purchase decisions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
