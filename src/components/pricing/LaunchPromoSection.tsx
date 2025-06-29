
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const LaunchPromoSection = () => {
  return (
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
                <Star className="w-8 h-8 text-yellow-400 mr-2" />
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
  );
};

export default LaunchPromoSection;
