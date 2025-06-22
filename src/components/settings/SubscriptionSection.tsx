
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { CreditCard, Crown, Star, Zap } from "lucide-react";

const SubscriptionSection = () => {
  const { profile } = useAuth();

  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      features: ['Basic browsing', 'Limited listings', 'Community support'],
      icon: <Star className="h-6 w-6" />,
      color: 'from-gray-500 to-gray-600'
    },
    {
      name: 'Premium',
      price: '$29',
      period: 'month',
      features: ['Unlimited listings', 'Priority support', 'Advanced filters', 'Contact details'],
      icon: <Crown className="h-6 w-6" />,
      color: 'from-blue-500 to-purple-600'
    },
    {
      name: 'Professional',
      price: '$99',
      period: 'month',
      features: ['All Premium features', 'Commission tracking', 'Analytics', 'Bulk operations'],
      icon: <Zap className="h-6 w-6" />,
      color: 'from-purple-500 to-pink-600'
    }
  ];

  const currentPlan = profile?.subscription_plan || 'free';

  return (
    <div className="space-y-6">
      <Card className="bg-black/20 backdrop-blur-lg border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Subscription & Billing
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 bg-white/5 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium">Current Plan</h3>
                <p className="text-white/70 text-sm">
                  Your active subscription
                </p>
              </div>
              <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                {currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1)}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map((plan) => (
              <Card 
                key={plan.name} 
                className={`bg-white/5 border-white/10 ${
                  currentPlan === plan.name.toLowerCase() ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <CardContent className="p-6">
                  <div className="text-center space-y-4">
                    <div className={`inline-flex p-3 rounded-full bg-gradient-to-r ${plan.color}`}>
                      {plan.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                      <div className="text-2xl font-bold text-white mt-2">
                        {plan.price}
                        <span className="text-sm text-white/70">/{plan.period}</span>
                      </div>
                    </div>
                    <ul className="space-y-2 text-sm text-white/70">
                      {plan.features.map((feature, index) => (
                        <li key={index}>• {feature}</li>
                      ))}
                    </ul>
                    {currentPlan === plan.name.toLowerCase() ? (
                      <Badge className="bg-green-500 text-white">Current Plan</Badge>
                    ) : (
                      <Button 
                        className={`w-full bg-gradient-to-r ${plan.color} text-white hover:opacity-90`}
                      >
                        {currentPlan === 'free' ? 'Upgrade' : 'Switch Plan'}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {profile?.subscription_status === 'active' && (
            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <h3 className="text-white font-medium mb-2">Billing Information</h3>
              <div className="space-y-2 text-sm text-white/70">
                <p>Next billing date: {profile.subscription_end_date ? new Date(profile.subscription_end_date).toLocaleDateString() : 'N/A'}</p>
                <p>Billing email: {profile.billing_email || profile.email}</p>
              </div>
              <div className="mt-4 space-x-2">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  Update Payment Method
                </Button>
                <Button variant="outline" className="border-red-500/20 text-red-400 hover:bg-red-500/10">
                  Cancel Subscription
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SubscriptionSection;
