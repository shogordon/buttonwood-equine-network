
import { Shield, CheckCircle, Lock, Users, Eye, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Logo from "@/components/ui/Logo";

const Trust = () => {
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
              <Link to="/trust" className="text-white font-medium transition-colors">
                Trust & Safety
              </Link>
              <Link to="/blog" className="text-white/80 hover:text-white transition-colors">
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

      {/* Hero Section */}
      <section className="hero-gradient pt-32 pb-20 px-6 relative">
        <div className="container mx-auto text-center relative z-10">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight text-shadow">
              <span className="gradient-text">Trust & Safety</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
              Your security and peace of mind are our top priorities. Learn about our comprehensive safety measures.
            </p>
          </div>
        </div>
      </section>

      {/* Trust Pillars */}
      <section className="py-20 px-6 relative">
        <div className="glass-overlay"></div>
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white text-shadow">
              Built on Trust
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Every feature is designed with your safety and security in mind.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="text-center p-8 bg-white/5 rounded-xl shadow-lg text-white/90 hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-0">
                <div className="w-16 h-16 mx-auto mb-6 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-4">Verified Users</h3>
                <p className="text-white/70">All users go through our comprehensive verification process including identity confirmation and background checks.</p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 bg-white/5 rounded-xl shadow-lg text-white/90 hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-0">
                <div className="w-16 h-16 mx-auto mb-6 bg-green-500/20 rounded-xl flex items-center justify-center">
                  <Lock className="h-8 w-8 text-green-400" />
                </div>
                <h3 className="text-xl font-bold mb-4">Secure Platform</h3>
                <p className="text-white/70">Enterprise-grade security protects your personal information and communications with end-to-end encryption.</p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 bg-white/5 rounded-xl shadow-lg text-white/90 hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-0">
                <div className="w-16 h-16 mx-auto mb-6 bg-purple-500/20 rounded-xl flex items-center justify-center">
                  <Shield className="h-8 w-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-4">Protected Transactions</h3>
                <p className="text-white/70">Our escrow service and transaction protection ensure safe, secure exchanges between buyers and sellers.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Verification Process */}
      <section className="py-20 px-6 relative">
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white text-shadow">
              Our <span className="gradient-text">Verification Process</span>
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Multi-step verification ensures every member of our community is legitimate and trustworthy.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                  <Users className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Identity Verification</h3>
                  <p className="text-white/70">Government-issued ID verification ensures all users are who they claim to be.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Professional Credentials</h3>
                  <p className="text-white/70">Trainers, agents, and professionals provide industry credentials and references.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                  <Award className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Reputation System</h3>
                  <p className="text-white/70">Community-driven ratings and reviews help build trust and accountability.</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                  <Eye className="h-6 w-6 text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Listing Verification</h3>
                  <p className="text-white/70">All horse listings are reviewed to ensure accuracy and authenticity.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                  <Lock className="h-6 w-6 text-red-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Secure Communications</h3>
                  <p className="text-white/70">All messages are monitored for safety while maintaining your privacy.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                  <Shield className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">24/7 Support</h3>
                  <p className="text-white/70">Our dedicated safety team monitors the platform and responds to concerns immediately.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Guidelines */}
      <section className="py-20 px-6 relative">
        <div className="glass-section"></div>
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white text-shadow">
            Safety Guidelines
          </h2>
          <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto">
            Follow these best practices to ensure a safe and successful experience.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
            <Card className="p-6 bg-white/5 rounded-xl shadow-lg border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">For Buyers</h3>
              <ul className="space-y-2 text-white/70">
                <li>• Always verify seller credentials and reviews</li>
                <li>• Meet horses in person before making decisions</li>
                <li>• Use our secure payment and escrow services</li>
                <li>• Get independent veterinary examinations</li>
                <li>• Report any suspicious activity immediately</li>
              </ul>
            </Card>

            <Card className="p-6 bg-white/5 rounded-xl shadow-lg border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">For Sellers</h3>
              <ul className="space-y-2 text-white/70">
                <li>• Complete full verification process</li>
                <li>• Provide accurate, honest descriptions</li>
                <li>• Allow reasonable trial periods</li>
                <li>• Use secure communication channels only</li>
                <li>• Document all interactions and agreements</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 relative">
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white text-shadow">
            Questions About Safety?
          </h2>
          <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto">
            Our safety team is here to help. Contact us anytime with questions or concerns.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl hover:scale-105 transition-all duration-300 text-lg font-semibold">
                Contact Safety Team
              </Button>
            </Link>
            <Link to="/how-it-works">
              <Button variant="outline" className="bg-white/5 border-white/20 text-white hover:bg-white/10 px-8 py-4 rounded-xl transition-all duration-300 text-lg">
                Learn How It Works
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Trust;
