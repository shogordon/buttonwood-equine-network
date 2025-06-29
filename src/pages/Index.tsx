import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Heart, Search, CheckCircle, Users, Star, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { AIPromptInterface } from "@/components/AIPromptInterface";
import AppNavigation from "@/components/navigation/AppNavigation";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const { user } = useAuth();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 -z-10">
        <div className="floating-element top-20 left-20 w-64 h-64 animate-float opacity-20" />
        <div className="floating-element top-40 right-32 w-32 h-32 animate-float opacity-15" style={{ animationDelay: '2s' }} />
        <div className="floating-element bottom-32 left-40 w-48 h-48 animate-float opacity-10" style={{ animationDelay: '4s' }} />
        <div className="floating-element bottom-20 right-20 w-40 h-40 animate-float opacity-12" style={{ animationDelay: '6s' }} />
      </div>

      {/* Unified Navigation */}
      <AppNavigation />

      {/* Hero Section */}
      <section className="hero-gradient pt-32 pb-20 px-6 relative">
        <div className="container mx-auto text-center relative z-10">
          <div className="animate-fade-in-up">            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-shadow">
              <span className="gradient-text">Premium Sporthorses.</span>
              <br />
              <span className="text-white">Zero Confusion.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-xl mx-auto leading-relaxed">
              The curated marketplace built to eliminate the noise. 
              <strong className="text-blue-400"> No gatekeeping. No commissions. No hidden fees—just real horses and real connections.</strong>
            </p>
          </div>

          {/* AI Prompt Interface - Main CTA */}
          <div className="max-w-4xl mx-auto mb-16">
            <AIPromptInterface />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 relative">
        <div className="glass-overlay"></div>
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white text-shadow">
              How It Works
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Simple, transparent, and trusted connections in the premium sportshorse market.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <Card className="text-center p-4 bg-white/5 rounded-xl shadow-lg text-white/90 hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-4">
                <div className="w-12 h-12 mx-auto mb-4 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <Search className="h-6 w-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-bold mb-2">List Your Horse</h3>
                <p className="text-sm text-white/70">Create professional listings with verified credentials</p>
              </CardContent>
            </Card>

            <Card className="text-center p-4 bg-white/5 rounded-xl shadow-lg text-white/90 hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-4">
                <div className="w-12 h-12 mx-auto mb-4 bg-purple-500/20 rounded-xl flex items-center justify-center">
                  <Users className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-lg font-bold mb-2">Connect Directly</h3>
                <p className="text-sm text-white/70">Match with verified buyers and sellers instantly</p>
              </CardContent>
            </Card>

            <Card className="text-center p-4 bg-white/5 rounded-xl shadow-lg text-white/90 hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-4">
                <div className="w-12 h-12 mx-auto mb-4 bg-green-500/20 rounded-xl flex items-center justify-center">
                  <Shield className="h-6 w-6 text-green-400" />
                </div>
                <h3 className="text-lg font-bold mb-2">Safe Transaction</h3>
                <p className="text-sm text-white/70">Secure, transparent deals with zero commissions</p>
              </CardContent>
            </Card>

            <Card className="text-center p-4 bg-white/5 rounded-xl shadow-lg text-white/90 hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-4">
                <div className="w-12 h-12 mx-auto mb-4 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                  <Heart className="h-6 w-6 text-yellow-400" />
                </div>
                <h3 className="text-lg font-bold mb-2">Find Your Partner</h3>
                <p className="text-sm text-white/70">Discover the perfect horse for your riding goals</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 px-6 relative">
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white text-shadow">
              Traditional Sales vs <span className="gradient-text">the Bluebook Approach</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="p-8 bg-red-900/20 text-red-200 rounded-xl shadow-md">
              <h3 className="text-2xl font-bold mb-6 text-red-400">Traditional Sales</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="text-red-400 mr-3">❌</span>
                  Hidden commission fees up to 10%
                </li>
                <li className="flex items-center">
                  <span className="text-red-400 mr-3">❌</span>
                  Unverified seller backgrounds
                </li>
                <li className="flex items-center">
                  <span className="text-red-400 mr-3">❌</span>
                  Price manipulation by dealers
                </li>
                <li className="flex items-center">
                  <span className="text-red-400 mr-3">❌</span>
                  Endless tire-kickers and time wasters
                </li>
              </ul>
            </Card>

            <Card className="p-8 bg-green-900/20 text-green-200 rounded-xl shadow-md">
              <h3 className="text-2xl font-bold mb-6 text-green-400">Bluebook Approach</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="text-green-400 mr-3">✅</span>
                  Zero commission fees - keep 100%
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-3">✅</span>
                  Verified seller credentials & history
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-3">✅</span>
                  Transparent, honest pricing
                </li>
                <li className="flex items-center">
                  <span className="text-green-400 mr-3">✅</span>
                  Qualified, serious buyers only
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-20 px-6 relative">
        <div className="glass-section"></div>
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-white text-shadow">
            Trusted by the <span className="gradient-text">Equestrian Community</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center group">
              <div className="w-20 h-20 mb-4 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-white/10 transition-all duration-300">
                <Users className="h-10 w-10 text-blue-400" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">500+</h3>
              <p className="text-white/70">Verified Members</p>
            </div>
            
            <div className="flex flex-col items-center group">
              <div className="w-20 h-20 mb-4 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-white/10 transition-all duration-300">
                <Heart className="h-10 w-10 text-purple-400" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">150+</h3>
              <p className="text-white/70">Successful Matches</p>
            </div>
            
            <div className="flex flex-col items-center group">
              <div className="w-20 h-20 mb-4 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-white/10 transition-all duration-300">
                <Star className="h-10 w-10 text-green-400" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">4.9/5</h3>
              <p className="text-white/70">Member Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-8 relative bg-white/5 text-white/60">
        <div className="container mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center">
                <Logo size="sm" />
              </div>
              <span className="text-lg font-semibold text-white">The Aisle</span>
            </div>
            <div className="flex space-x-6 mb-4 md:mb-0">
              <Link to="/about" className="hover:text-white transition-colors">About</Link>
              <Link to="/contact" className="hover:text-white transition-colors">Support</Link>
              <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
              <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <p>&copy; 2025 The Aisle — The trusted way to buy and sell premium sporthorses.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
