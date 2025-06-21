
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
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-glass bg-white/80 border-b border-white/20">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-french-blue-600" />
              <span className="text-xl font-semibold text-slate-gray-800">
                Buttonwood Bluebook
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/about" className="text-slate-gray-600 hover:text-french-blue-600 transition-colors">
                About
              </Link>
              <Link to="/pricing" className="text-slate-gray-600 hover:text-french-blue-600 transition-colors">
                Pricing
              </Link>
              <Link to="/trust" className="text-slate-gray-600 hover:text-french-blue-600 transition-colors">
                Trust & Safety
              </Link>
              <Link to="/auth">
                <Button className="bg-gradient-to-r from-french-blue-600 to-french-blue-700 hover:from-french-blue-700 hover:to-french-blue-800 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 px-6 py-2.5 font-semibold">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-gradient animate-gradient-flow pt-24 pb-16 px-6 relative overflow-hidden">
        <div className="container mx-auto text-center relative z-10">
          <div className="animate-fade-in-up">
            <Badge 
              variant="secondary" 
              className="mb-6 bg-white/20 backdrop-blur-sm text-french-blue-700 border-french-blue-200"
            >
              ✨ Verified Equestrian Connections
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="gradient-text">Premium Sporthorses.</span>
              <br />
              <span className="text-slate-gray-800">Zero Confusion.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              The exclusive matchmaking platform for hunter/jumper enthusiasts. 
              <strong className="text-french-blue-600"> No commissions. No gatekeeping.</strong> 
              Just verified connections between serious buyers and trusted sellers.
            </p>
          </div>

          {/* AI Prompt Interface */}
          <div className="max-w-4xl mx-auto mb-16">
            <AIPromptInterface />
          </div>

          {/* CTA Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto animate-fade-in">
            <Card 
              className="group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl glass-card"
              onMouseEnter={() => setHoveredCard('buyer')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-french-blue-500 to-french-blue-600 rounded-full flex items-center justify-center">
                    <Search className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-slate-gray-800 mb-2">
                    I'm a Buyer
                  </h3>
                  <p className="text-slate-gray-600 mb-6">
                    Find your perfect partner with verified listings, transparent pricing, and direct access to quality horses.
                  </p>
                </div>
                
                <div className="space-y-3 mb-8 text-left">
                  <div className="flex items-center text-sm text-slate-gray-600">
                    <CheckCircle className="h-4 w-4 text-french-blue-500 mr-2" />
                    No commission fees or hidden costs
                  </div>
                  <div className="flex items-center text-sm text-slate-gray-600">
                    <CheckCircle className="h-4 w-4 text-french-blue-500 mr-2" />
                    Verified seller backgrounds & references
                  </div>
                  <div className="flex items-center text-sm text-slate-gray-600">
                    <CheckCircle className="h-4 w-4 text-french-blue-500 mr-2" />
                    Professional preview scheduling
                  </div>
                </div>

                <Button 
                  className="w-full bg-french-blue-600 hover:bg-french-blue-700 text-white group-hover:bg-french-blue-700 transition-all duration-300"
                  size="lg"
                >
                  Start Browsing Horses
                  <ArrowRight className={`ml-2 h-5 w-5 transition-transform duration-300 ${hoveredCard === 'buyer' ? 'translate-x-1' : ''}`} />
                </Button>
              </CardContent>
            </Card>

            <Card 
              className="group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl glass-card"
              onMouseEnter={() => setHoveredCard('seller')}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-burnt-orange-500 to-burnt-orange-600 rounded-full flex items-center justify-center">
                    <Heart className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-slate-gray-800 mb-2">
                    I'm a Seller
                  </h3>
                  <p className="text-slate-gray-600 mb-6">
                    Showcase your horses to verified buyers with professional listings and zero commission fees.
                  </p>
                </div>
                
                <div className="space-y-3 mb-8 text-left">
                  <div className="flex items-center text-sm text-slate-gray-600">
                    <CheckCircle className="h-4 w-4 text-burnt-orange-500 mr-2" />
                    Keep 100% of your sale price
                  </div>
                  <div className="flex items-center text-sm text-slate-gray-600">
                    <CheckCircle className="h-4 w-4 text-burnt-orange-500 mr-2" />
                    Verified buyer qualification system
                  </div>
                  <div className="flex items-center text-sm text-slate-gray-600">
                    <CheckCircle className="h-4 w-4 text-burnt-orange-500 mr-2" />
                    Professional listing concierge
                  </div>
                </div>

                <Button 
                  className="w-full bg-burnt-orange-500 hover:bg-burnt-orange-600 text-white group-hover:bg-burnt-orange-600 transition-all duration-300"
                  size="lg"
                >
                  List Your Horses
                  <ArrowRight className={`ml-2 h-5 w-5 transition-transform duration-300 ${hoveredCard === 'seller' ? 'translate-x-1' : ''}`} />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-french-blue-200/30 rounded-full blur-xl animate-float" />
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-burnt-orange-200/30 rounded-full blur-xl animate-float" style={{ animationDelay: '1s' }} />
      </section>

      {/* Problem/Solution Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-soft-ivory-50 to-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-gray-800">
              The Equestrian Market <span className="gradient-text">Reimagined</span>
            </h2>
            <p className="text-xl text-slate-gray-600 max-w-3xl mx-auto">
              No more gatekeeping. No more fake pricing. No more tire-kicking. 
              Just transparent, verified connections in the premium sportshorse market.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="text-center p-8 border-2 border-red-200 bg-red-50/50">
              <div className="w-16 h-16 mx-auto mb-4 bg-red-500/10 rounded-full flex items-center justify-center">
                <span className="text-2xl">❌</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-red-700">Traditional Market</h3>
              <ul className="space-y-2 text-red-600">
                <li>• Hidden commission fees</li>
                <li>• Unverified seller claims</li>
                <li>• Endless tire-kickers</li>
                <li>• Price manipulation</li>
                <li>• Gatekeeping by dealers</li>
              </ul>
            </Card>

            <Card className="text-center p-8 border-2 border-french-blue-200 bg-french-blue-50/50 transform scale-105 shadow-lg">
              <div className="w-16 h-16 mx-auto mb-4 bg-french-blue-500/10 rounded-full flex items-center justify-center">
                <Shield className="h-8 w-8 text-french-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-french-blue-700">Buttonwood Bluebook</h3>
              <ul className="space-y-2 text-french-blue-600">
                <li>• Zero commission model</li>
                <li>• Verified seller credentials</li>
                <li>• Qualified buyer network</li>
                <li>• Transparent pricing</li>
                <li>• Direct access to quality</li>
              </ul>
            </Card>

            <Card className="text-center p-8 border-2 border-green-200 bg-green-50/50">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-500/10 rounded-full flex items-center justify-center">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-green-700">Your Result</h3>
              <ul className="space-y-2 text-green-600">
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
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-slate-gray-800">
            Trusted by the <span className="gradient-text">Equestrian Community</span>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 mb-4 bg-french-blue-100 rounded-full flex items-center justify-center">
                <Users className="h-8 w-8 text-french-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-gray-800 mb-2">500+</h3>
              <p className="text-slate-gray-600">Verified Members</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 mb-4 bg-burnt-orange-100 rounded-full flex items-center justify-center">
                <Heart className="h-8 w-8 text-burnt-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-gray-800 mb-2">150+</h3>
              <p className="text-slate-gray-600">Successful Matches</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <Star className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-gray-800 mb-2">4.9/5</h3>
              <p className="text-slate-gray-600">Member Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-french-blue-600 to-burnt-orange-500 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Equestrian Experience?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join the exclusive network of verified buyers and sellers who demand excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-white text-french-blue-600 hover:bg-soft-ivory-100 px-8 py-4 text-lg font-semibold"
            >
              Get Started Today
            </Button>
            <Button 
              size="lg" 
              className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/20 hover:border-white/50 px-8 py-4 text-lg font-semibold transition-all duration-300"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-slate-gray-900 text-white">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Shield className="h-6 w-6 text-french-blue-400" />
              <span className="text-lg font-semibold">Buttonwood Bluebook</span>
            </div>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-slate-gray-400 hover:text-white transition-colors">
                Privacy
              </Link>
              <Link to="/terms" className="text-slate-gray-400 hover:text-white transition-colors">
                Terms
              </Link>
              <Link to="/contact" className="text-slate-gray-400 hover:text-white transition-colors">
                Contact
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-gray-700 text-center text-slate-gray-400">
            <p>&copy; 2024 Buttonwood Bluebook. Premium equestrian connections, reimagined.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
