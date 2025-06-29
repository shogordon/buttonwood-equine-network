
import { Shield, Search, Users, Heart, CheckCircle, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Logo from "@/components/ui/Logo";

const HowItWorks = () => {
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
              <Link to="/how-it-works" className="text-white font-medium transition-colors">
                How It Works
              </Link>
              <Link to="/trust" className="text-white/80 hover:text-white transition-colors">
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
              <span className="gradient-text">How The Aisle Works</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
              A simple, transparent process designed to connect serious buyers with quality horses.
            </p>
          </div>
        </div>
      </section>

      {/* Step-by-Step Process */}
      <section className="py-20 px-6 relative">
        <div className="glass-overlay"></div>
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white text-shadow">
              Simple, Transparent Process
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              From listing to purchase, every step is designed for clarity and trust.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <Card className="text-center p-8 bg-white/5 rounded-xl shadow-lg text-white/90 hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-0">
                <div className="w-16 h-16 mx-auto mb-6 bg-blue-500/20 rounded-xl flex items-center justify-center">
                  <Search className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-4">1. Create Your Listing</h3>
                <p className="text-white/70">Upload photos, videos, and detailed information about your horse. Our platform guides you through every step.</p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 bg-white/5 rounded-xl shadow-lg text-white/90 hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-0">
                <div className="w-16 h-16 mx-auto mb-6 bg-purple-500/20 rounded-xl flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-4">2. Get Verified</h3>
                <p className="text-white/70">Complete our verification process to build trust with potential buyers and access premium features.</p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 bg-white/5 rounded-xl shadow-lg text-white/90 hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-0">
                <div className="w-16 h-16 mx-auto mb-6 bg-green-500/20 rounded-xl flex items-center justify-center">
                  <Users className="h-8 w-8 text-green-400" />
                </div>
                <h3 className="text-xl font-bold mb-4">3. Connect Directly</h3>
                <p className="text-white/70">Communicate directly with verified buyers through our secure messaging system. No middlemen, no commissions.</p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 bg-white/5 rounded-xl shadow-lg text-white/90 hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-0">
                <div className="w-16 h-16 mx-auto mb-6 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                  <Heart className="h-8 w-8 text-yellow-400" />
                </div>
                <h3 className="text-xl font-bold mb-4">4. Complete the Sale</h3>
                <p className="text-white/70">Arrange trials, vet checks, and finalize your transaction with complete transparency and support.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose The Aisle */}
      <section className="py-20 px-6 relative">
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white text-shadow">
              Why Choose <span className="gradient-text">The Aisle</span>?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Zero Commission Fees</h3>
                  <p className="text-white/70">Keep 100% of your sale price. No hidden fees, no commission cuts - just transparent pricing.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                  <Shield className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Verified Community</h3>
                  <p className="text-white/70">All users go through our verification process, ensuring serious buyers and legitimate sellers.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                  <Users className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Direct Communication</h3>
                  <p className="text-white/70">Connect directly with buyers and sellers without intermediaries affecting your negotiations.</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                  <Star className="h-6 w-6 text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Premium Experience</h3>
                  <p className="text-white/70">Professional listings with high-quality photos, videos, and detailed horse information.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                  <Heart className="h-6 w-6 text-red-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Built for Equestrians</h3>
                  <p className="text-white/70">Created by horse people, for horse people. We understand your needs and priorities.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Ongoing Support</h3>
                  <p className="text-white/70">Get help throughout your buying or selling journey with our dedicated support team.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 relative">
        <div className="glass-section"></div>
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white text-shadow">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto">
            Join our community of verified horse enthusiasts and experience the difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl hover:scale-105 transition-all duration-300 text-lg font-semibold">
                Sign Up Now
              </Button>
            </Link>
            <Link to="/browse">
              <Button variant="outline" className="bg-white/5 border-white/20 text-white hover:bg-white/10 px-8 py-4 rounded-xl transition-all duration-300 text-lg">
                Browse Horses
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
