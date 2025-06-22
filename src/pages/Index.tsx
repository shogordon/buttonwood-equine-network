
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Shield, Heart, Search, CheckCircle, Users, Star, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { AIPromptInterface } from "@/components/AIPromptInterface";

const Index = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 -z-10">
        <div className="floating-element top-20 left-20 w-64 h-64 animate-float opacity-20" />
        <div className="floating-element top-40 right-32 w-32 h-32 animate-float opacity-15" style={{ animationDelay: '2s' }} />
        <div className="floating-element bottom-32 left-40 w-48 h-48 animate-float opacity-10" style={{ animationDelay: '4s' }} />
        <div className="floating-element bottom-20 right-20 w-40 h-40 animate-float opacity-12" style={{ animationDelay: '6s' }} />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-nav">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-xl glass-medium flex items-center justify-center">
                <Shield className="h-6 w-6 text-blue-400" />
              </div>
              <span className="text-xl font-semibold text-white">
                Buttonwood Bluebook
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/about" className="text-slate-300 hover:text-blue-400 transition-colors">
                About
              </Link>
              <Link to="/pricing" className="text-slate-300 hover:text-blue-400 transition-colors">
                Pricing
              </Link>
              <Link to="/trust" className="text-slate-300 hover:text-blue-400 transition-colors">
                Trust & Safety
              </Link>
              <Link to="/auth">
                <Button className="glass-button text-blue-300 hover:text-blue-200 border-blue-400/30 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 px-6 py-2.5 font-semibold">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-gradient pt-32 pb-20 px-6 relative">
        <div className="container mx-auto text-center relative z-10">
          <div className="animate-fade-in-up">
            <Badge 
              className="mb-6 glass-medium text-blue-300 border-blue-400/30 hover:glass-strong transition-all duration-300"
            >
              ✨ Verified Equestrian Connections
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight text-shadow">
              <span className="gradient-text">Premium Sporthorses.</span>
              <br />
              <span className="text-white">Zero Confusion.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              The exclusive matchmaking platform for hunter/jumper enthusiasts. 
              <strong className="text-blue-400"> No commissions. No gatekeeping.</strong> 
              Just verified connections between serious buyers and trusted sellers.
            </p>
          </div>

          {/* AI Prompt Interface */}
          <div className="max-w-4xl mx-auto mb-16">
            <div className="glass-strong rounded-2xl p-1">
              <AIPromptInterface />
            </div>
          </div>

          {/* CTA Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto animate-fade-in">
            <Card 
              className="group cursor-pointer transform transition-all duration-500 hover:scale-105 glass-card hover:glass-strong border-0"
              onMouseEnter={() => setHoveredCard('buyer')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 glass-medium rounded-2xl flex items-center justify-center group-hover:glass-strong transition-all duration-300">
                    <Search className="h-8 w-8 text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-2">
                    I'm a Buyer
                  </h3>
                  <p className="text-slate-300 mb-6">
                    Find your perfect partner with verified listings, transparent pricing, and direct access to quality horses.
                  </p>
                </div>
                
                <div className="space-y-3 mb-8 text-left">
                  <div className="flex items-center text-sm text-slate-300">
                    <CheckCircle className="h-4 w-4 text-blue-400 mr-2" />
                    No commission fees or hidden costs
                  </div>
                  <div className="flex items-center text-sm text-slate-300">
                    <CheckCircle className="h-4 w-4 text-blue-400 mr-2" />
                    Verified seller backgrounds & references
                  </div>
                  <div className="flex items-center text-sm text-slate-300">
                    <CheckCircle className="h-4 w-4 text-blue-400 mr-2" />
                    Professional preview scheduling
                  </div>
                </div>

                <Button 
                  className="w-full glass-button text-blue-300 hover:text-blue-200 border-blue-400/30 group-hover:border-blue-300/50 transition-all duration-300"
                  size="lg"
                >
                  Start Browsing Horses
                  <ArrowRight className={`ml-2 h-5 w-5 transition-transform duration-300 ${hoveredCard === 'buyer' ? 'translate-x-1' : ''}`} />
                </Button>
              </CardContent>
            </Card>

            <Card 
              className="group cursor-pointer transform transition-all duration-500 hover:scale-105 glass-card hover:glass-strong border-0"
              onMouseEnter={() => setHoveredCard('seller')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 glass-medium rounded-2xl flex items-center justify-center group-hover:glass-strong transition-all duration-300">
                    <Heart className="h-8 w-8 text-purple-400" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-2">
                    I'm a Seller
                  </h3>
                  <p className="text-slate-300 mb-6">
                    Showcase your horses to verified buyers with professional listings and zero commission fees.
                  </p>
                </div>
                
                <div className="space-y-3 mb-8 text-left">
                  <div className="flex items-center text-sm text-slate-300">
                    <CheckCircle className="h-4 w-4 text-purple-400 mr-2" />
                    Keep 100% of your sale price
                  </div>
                  <div className="flex items-center text-sm text-slate-300">
                    <CheckCircle className="h-4 w-4 text-purple-400 mr-2" />
                    Verified buyer qualification system
                  </div>
                  <div className="flex items-center text-sm text-slate-300">
                    <CheckCircle className="h-4 w-4 text-purple-400 mr-2" />
                    Professional listing concierge
                  </div>
                </div>

                <Button 
                  className="w-full glass-button text-purple-300 hover:text-purple-200 border-purple-400/30 group-hover:border-purple-300/50 transition-all duration-300"
                  size="lg"
                >
                  List Your Horses
                  <ArrowRight className={`ml-2 h-5 w-5 transition-transform duration-300 ${hoveredCard === 'seller' ? 'translate-x-1' : ''}`} />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Problem/Solution Section */}
      <section className="py-20 px-6 relative">
        <div className="glass-overlay"></div>
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white text-shadow">
              The Equestrian Market <span className="gradient-text">Reimagined</span>
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              No more gatekeeping. No more fake pricing. No more tire-kicking. 
              Just transparent, verified connections in the premium sportshorse market.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="text-center p-8 glass-card border-red-400/20 hover:glass-medium transition-all duration-300">
              <div className="w-16 h-16 mx-auto mb-4 glass-light rounded-2xl flex items-center justify-center">
                <span className="text-2xl">❌</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-red-400">Traditional Market</h3>
              <ul className="space-y-2 text-red-300">
                <li>• Hidden commission fees</li>
                <li>• Unverified seller claims</li>
                <li>• Endless tire-kickers</li>
                <li>• Price manipulation</li>
                <li>• Gatekeeping by dealers</li>
              </ul>
            </Card>

            <Card className="text-center p-8 glass-strong border-blue-400/30 transform scale-105 shadow-2xl">
              <div className="w-16 h-16 mx-auto mb-4 glass-medium rounded-2xl flex items-center justify-center">
                <Shield className="h-8 w-8 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-blue-400">Buttonwood Bluebook</h3>
              <ul className="space-y-2 text-blue-300">
                <li>• Zero commission model</li>
                <li>• Verified seller credentials</li>
                <li>• Qualified buyer network</li>
                <li>• Transparent pricing</li>
                <li>• Direct access to quality</li>
              </ul>
            </Card>

            <Card className="text-center p-8 glass-card border-green-400/20 hover:glass-medium transition-all duration-300">
              <div className="w-16 h-16 mx-auto mb-4 glass-light rounded-2xl flex items-center justify-center">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-green-400">Your Result</h3>
              <ul className="space-y-2 text-green-300">
                <li>• Keep more money</li>
                <li>• Save valuable time</li>
                <li>• Build trusted relationships</li>
                <li>• Make informed decisions</li>
                <li>• Ride smarter, not harder</li>
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
              <div className="w-20 h-20 mb-4 glass-card rounded-2xl flex items-center justify-center group-hover:glass-strong transition-all duration-300">
                <Users className="h-10 w-10 text-blue-400" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">500+</h3>
              <p className="text-slate-300">Verified Members</p>
            </div>
            
            <div className="flex flex-col items-center group">
              <div className="w-20 h-20 mb-4 glass-card rounded-2xl flex items-center justify-center group-hover:glass-strong transition-all duration-300">
                <Heart className="h-10 w-10 text-purple-400" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">150+</h3>
              <p className="text-slate-300">Successful Matches</p>
            </div>
            
            <div className="flex flex-col items-center group">
              <div className="w-20 h-20 mb-4 glass-card rounded-2xl flex items-center justify-center group-hover:glass-strong transition-all duration-300">
                <Star className="h-10 w-10 text-green-400" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">4.9/5</h3>
              <p className="text-slate-300">Member Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/40 to-purple-600/40 backdrop-blur-sm"></div>
        <div className="absolute inset-0 glass-strong opacity-30"></div>
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white text-shadow">
            Ready to Transform Your Equestrian Experience?
          </h2>
          <p className="text-xl mb-8 text-slate-200 max-w-2xl mx-auto">
            Join the exclusive network of verified buyers and sellers who demand excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="glass-strong text-blue-300 hover:text-blue-200 border-white/30 px-8 py-4 text-lg font-semibold hover:scale-105 transition-all duration-300"
            >
              Get Started Today
            </Button>
            <Button 
              size="lg" 
              className="glass-medium border-white/30 text-white hover:text-white hover:glass-strong px-8 py-4 text-lg font-semibold transition-all duration-300"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 relative">
        <div className="absolute inset-0 glass-strong bg-slate-900/20"></div>
        <div className="container mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 glass-light rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-blue-400" />
              </div>
              <span className="text-lg font-semibold text-white">Buttonwood Bluebook</span>
            </div>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-slate-300 hover:text-blue-400 transition-colors">
                Privacy
              </Link>
              <Link to="/terms" className="text-slate-300 hover:text-blue-400 transition-colors">
                Terms
              </Link>
              <Link to="/contact" className="text-slate-300 hover:text-blue-400 transition-colors">
                Contact
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 text-center text-slate-400">
            <p>&copy; 2024 Buttonwood Bluebook. Premium equestrian connections, reimagined.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
