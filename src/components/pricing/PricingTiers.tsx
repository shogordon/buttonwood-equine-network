
import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PricingTiers = () => {
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

  return (
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
  );
};

export default PricingTiers;
