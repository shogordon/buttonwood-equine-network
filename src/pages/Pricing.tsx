
import { Check, Shield, FileCheck, TrendingUp, Star, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Logo from "@/components/ui/Logo";

const Pricing = () => {
  const pricingTiers = [
    {
      name: "Free",
      price: "$0",
      period: "/month",
      description: "Perfect for casual browsing",
      features: [
        "View limited listings",
        "Save 1 ISO ad",
        "Limited profile access",
        "3 in-app messages/month"
      ],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Premium",
      price: "$29",
      period: "/month",
      yearlyPrice: "$299/year",
      description: "For serious buyers and sellers",
      features: [
        "Unlimited verified listings",
        "Post up to 3 ISO ads",
        "AI horse matching",
        "Direct messaging",
        "Saved searches and alerts",
        "Up to 5 active listings",
        "Listing analytics"
      ],
      cta: "Start Premium",
      popular: true
    },
    {
      name: "Concierge",
      price: "5% commission",
      period: "OR $199/month + 2.5%",
      description: "White-glove service for professionals",
      features: [
        "White-glove listing creation",
        "Radiograph and vet record support",
        "Admin-managed communication",
        "Contract and commission documentation help",
        "Priority support",
        "Dedicated account manager"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  const addOns = [
    {
      name: "Vet Record Review",
      price: "$79",
      description: "Professional veterinary record analysis and summary",
      icon: Shield,
      color: "bg-blue-500"
    },
    {
      name: "Ownership Verification",
      price: "$49",
      description: "Complete ownership history verification service",
      icon: FileCheck,
      color: "bg-green-500"
    },
    {
      name: "Listing Boost",
      price: "$29",
      description: "7-day spotlight featuring for maximum visibility",
      icon: TrendingUp,
      color: "bg-purple-500"
    }
  ];

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
              <Link to="/pricing" className="text-white font-medium transition-colors">
                Pricing
              </Link>
              <Link to="/how-it-works" className="text-white/80 hover:text-white transition-colors">
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
      <section className="relative py-20 pt-32">
        <div className="hero-gradient absolute inset-0" />
        <div className="glass-overlay" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 text-shadow">
            Simple Pricing. <span className="gradient-text">Powerful Tools.</span>
          </h1>
          <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
            Whether you're casually browsing or managing top sales horses, The Aisle gives you the tools to connect with confidence.
          </p>
          <Link to="/auth">
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:scale-105 transition-all duration-300 px-8 py-3 text-lg font-semibold">
              Get Started
            </Button>
          </Link>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-20 relative">
        <div className="glass-overlay" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4 text-shadow">Choose Your Plan</h2>
            <p className="text-lg text-white/80">Find the perfect plan for your equestrian journey</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <Card key={tier.name} className={`glass-card relative ${tier.popular ? 'ring-2 ring-blue-500' : ''}`}>
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1">
                      <Star className="w-4 h-4 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl font-bold text-white mb-2">{tier.name}</CardTitle>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-white">{tier.price}</span>
                    <span className="text-white/60">{tier.period}</span>
                    {tier.yearlyPrice && (
                      <div className="text-sm text-blue-400 mt-1">Save 15% yearly: {tier.yearlyPrice}</div>
                    )}
                  </div>
                  <p className="text-white/80">{tier.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-white/90">
                        <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full ${tier.popular ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700' : 'glass-button'} text-white font-semibold py-3`}>
                    {tier.cta}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Add-Ons Section */}
      <section className="py-20 relative">
        <div className="glass-section absolute inset-0" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4 text-shadow">Premium Add-Ons</h2>
            <p className="text-lg text-white/80">Enhance your experience with professional services</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {addOns.map((addon, index) => (
              <Card key={addon.name} className="glass-card hover:glass-medium transition-all duration-300">
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 ${addon.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <addon.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-white mb-2">{addon.name}</CardTitle>
                  <div className="text-3xl font-bold text-white mb-4">{addon.price}</div>
                </CardHeader>
                <CardContent>
                  <p className="text-white/80 text-center mb-6">{addon.description}</p>
                  <Button className="w-full glass-button text-white font-semibold">
                    Add to Cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Launch Promo Section */}
      <section className="py-20 relative">
        <div className="glass-overlay" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4 text-shadow">Launch Specials</h2>
            <p className="text-lg text-white/80">Limited-time offers for early adopters</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="glass-strong border-2 border-yellow-500/30">
              <CardHeader className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <Zap className="w-8 h-8 text-yellow-400 mr-2" />
                  <Badge className="bg-yellow-500 text-black px-3 py-1 font-semibold">
                    Founding Member Deal
                  </Badge>
                </div>
                <CardTitle className="text-2xl font-bold text-white mb-4">
                  Lifetime Premium for <span className="text-yellow-400">$199</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-white/90 mb-4">
                  Get lifetime access to all Premium features for a one-time payment. 
                  Limited to the first 50 users only.
                </p>
                <div className="text-sm text-yellow-400 mb-6">
                  🎯 Only 23 spots remaining
                </div>
                <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-bold py-3 px-6">
                  Claim Your Spot
                </Button>
              </CardContent>
            </Card>

            <Card className="glass-strong border-2 border-green-500/30">
              <CardHeader className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <Star className="w-8 h-8 text-green-400 mr-2" />
                  <Badge className="bg-green-500 text-white px-3 py-1 font-semibold">
                    Early Seller Bonus
                  </Badge>
                </div>
                <CardTitle className="text-2xl font-bold text-white mb-4">
                  3 Free Concierge Listings
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-white/90 mb-4">
                  List your first 3 horses with full white-glove service including 
                  professional photos and vet record support.
                </p>
                <div className="text-sm text-green-400 mb-6">
                  💎 $597 value - completely free
                </div>
                <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold py-3 px-6">
                  Start Selling
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 relative">
        <div className="hero-gradient absolute inset-0" />
        <div className="glass-overlay" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl font-bold text-white mb-6 text-shadow">
            Ready to Transform Your Horse Trading Experience?
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Join The Aisle today and connect with the equestrian community like never before.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:scale-105 transition-all duration-300 px-8 py-3 text-lg font-semibold">
                Start Free Trial
              </Button>
            </Link>
            <Link to="/contact">
              <Button className="glass-button text-white rounded-xl hover:scale-105 transition-all duration-300 px-8 py-3 text-lg font-semibold">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
