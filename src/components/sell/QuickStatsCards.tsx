import { Card, CardContent } from "@/components/ui/card";
import { Eye, Heart, MessageCircle, TrendingUp } from "lucide-react";

interface QuickStatsCardsProps {
  activeListings: number;
  totalViews?: number;
  pendingInquiries?: number;
  saves?: number;
}

const QuickStatsCards = ({ 
  activeListings, 
  totalViews = 0, 
  pendingInquiries = 0, 
  saves = 0 
}: QuickStatsCardsProps) => {
  const stats = [
    {
      title: "Active Listings",
      value: activeListings,
      icon: TrendingUp,
      color: "text-green-400",
      bgColor: "bg-green-500/20"
    },
    {
      title: "Total Views",
      value: totalViews,
      icon: Eye,
      color: "text-blue-400",
      bgColor: "bg-blue-500/20"
    },
    {
      title: "Pending Inquiries",
      value: pendingInquiries,
      icon: MessageCircle,
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/20"
    },
    {
      title: "Saves",
      value: saves,
      icon: Heart,
      color: "text-red-400",
      bgColor: "bg-red-500/20"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => {
        const IconComponent = stat.icon;
        return (
          <Card key={stat.title} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-sm font-medium">{stat.title}</p>
                  <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <IconComponent className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default QuickStatsCards;