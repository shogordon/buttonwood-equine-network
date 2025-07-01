
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { PlayCircle, Trash2, Clock } from "lucide-react";
import { toast } from "sonner";

interface DraftListing {
  id: string;
  horse_name: string;
  created_at: string;
  updated_at: string;
  breed: string | null;
  age: number;
  price: number | null;
  images: string[] | null;
}

const DraftManager = () => {
  const { user } = useAuth();
  const [drafts, setDrafts] = useState<DraftListing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDrafts = async () => {
      if (!user) return;
      
      try {
        const { data, error } = await supabase
          .from('horse_profiles')
          .select('id, horse_name, created_at, updated_at, breed, age, price, images')
          .eq('user_id', user.id)
          .eq('listing_status', 'draft')
          .order('updated_at', { ascending: false });

        if (error) throw error;
        setDrafts(data || []);
      } catch (error) {
        console.error('Error fetching drafts:', error);
        toast.error('Failed to load drafts');
      } finally {
        setLoading(false);
      }
    };

    fetchDrafts();
  }, [user]);

  const handleDeleteDraft = async (draftId: string) => {
    try {
      const { error } = await supabase
        .from('horse_profiles')
        .delete()
        .eq('id', draftId);

      if (error) throw error;
      
      setDrafts(drafts.filter(draft => draft.id !== draftId));
      toast.success('Draft deleted successfully');
    } catch (error) {
      console.error('Error deleting draft:', error);
      toast.error('Failed to delete draft');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
        <div className="text-white text-center">Loading drafts...</div>
      </Card>
    );
  }

  if (drafts.length === 0) {
    return (
      <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
        <div className="text-white/60 text-center">
          <Clock className="h-12 w-12 mx-auto mb-4" />
          <p>No draft listings found.</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-xl font-semibold text-white">Draft Listings</h3>
        <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-400">
          {drafts.length}
        </Badge>
      </div>
      
      {drafts.map((draft) => (
        <Card key={draft.id} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-white mb-1">
                {draft.horse_name || 'Untitled Draft'}
              </h4>
              <p className="text-white/60 text-sm">
                {draft.breed && draft.age ? `${draft.breed} • ${draft.age} years old` : 'Details incomplete'}
              </p>
              <p className="text-white/40 text-xs mt-1">
                Last updated: {formatDate(draft.updated_at)}
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              {draft.price && (
                <span className="text-white font-semibold mr-4">
                  ${draft.price.toLocaleString()}
                </span>
              )}
              
              <Link to={`/sell/edit/${draft.id}`}>
                <Button variant="outline" size="sm" className="bg-blue-500/20 border-blue-500/30 text-blue-400 hover:bg-blue-500/30">
                  <PlayCircle className="h-4 w-4 mr-1" />
                  Continue
                </Button>
              </Link>
              
              <Button 
                onClick={() => handleDeleteDraft(draft.id)}
                variant="outline" 
                size="sm" 
                className="bg-red-500/20 border-red-500/30 text-red-400 hover:bg-red-500/30"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default DraftManager;
