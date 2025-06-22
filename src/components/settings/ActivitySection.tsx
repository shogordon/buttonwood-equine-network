
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, MessageSquare, Heart, Eye } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const ActivitySection = () => {
  const { user } = useAuth();

  const { data: inquiries = [], isLoading: inquiriesLoading } = useQuery({
    queryKey: ['user-inquiries', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('horse_inquiries')
        .select(`
          *,
          horse_profiles(horse_name)
        `)
        .eq('buyer_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'responded': return 'bg-green-500';
      case 'new': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  if (inquiriesLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-black/20 backdrop-blur-lg border-white/10">
          <CardContent className="p-6 text-center">
            <Eye className="h-8 w-8 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">0</div>
            <div className="text-white/70 text-sm">Profile Views</div>
          </CardContent>
        </Card>
        
        <Card className="bg-black/20 backdrop-blur-lg border-white/10">
          <CardContent className="p-6 text-center">
            <MessageSquare className="h-8 w-8 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">{inquiries.length}</div>
            <div className="text-white/70 text-sm">Inquiries Sent</div>
          </CardContent>
        </Card>
        
        <Card className="bg-black/20 backdrop-blur-lg border-white/10">
          <CardContent className="p-6 text-center">
            <Heart className="h-8 w-8 text-red-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">0</div>
            <div className="text-white/70 text-sm">Favorites</div>
          </CardContent>
        </Card>
        
        <Card className="bg-black/20 backdrop-blur-lg border-white/10">
          <CardContent className="p-6 text-center">
            <BarChart3 className="h-8 w-8 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-white">0</div>
            <div className="text-white/70 text-sm">Matches</div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-black/20 backdrop-blur-lg border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          {inquiries.length === 0 ? (
            <div className="text-center py-8">
              <BarChart3 className="h-12 w-12 text-white/30 mx-auto mb-4" />
              <h3 className="text-white font-medium mb-2">No activity yet</h3>
              <p className="text-white/70 text-sm">Your account activity will appear here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {inquiries.map((inquiry) => (
                <div key={inquiry.id} className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <MessageSquare className="h-5 w-5 text-blue-400" />
                      <div>
                        <h3 className="text-white font-medium">
                          Inquiry sent for {inquiry.horse_profiles?.horse_name}
                        </h3>
                        <p className="text-white/70 text-sm">
                          {new Date(inquiry.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Badge className={`${getStatusColor(inquiry.status)} text-white`}>
                      {inquiry.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivitySection;
