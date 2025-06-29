
import { Shield, FileCheck, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AddOnsSection = () => {
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
                <Button variant="outline" className="w-full text-white font-semibold">
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AddOnsSection;
