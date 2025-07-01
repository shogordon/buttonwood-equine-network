
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

interface EmptyDraft {
  id: string;
  horse_name: string;
  created_at: string;
  updated_at: string;
}

const DraftCleanup = () => {
  const { user } = useAuth();
  const [emptyDrafts, setEmptyDrafts] = useState<EmptyDraft[]>([]);
  const [loading, setLoading] = useState(false);
  const [scanning, setScanning] = useState(false);

  const scanForEmptyDrafts = async () => {
    if (!user) return;
    
    setScanning(true);
    try {
      const { data, error } = await supabase
        .from('horse_profiles')
        .select('id, horse_name, created_at, updated_at, breed, price, description')
        .eq('user_id', user.id)
        .eq('listing_status', 'draft');

      if (error) throw error;

      // Filter for empty or minimal drafts
      const empty = data?.filter(draft => 
        (!draft.horse_name || draft.horse_name === 'Draft Horse' || draft.horse_name.startsWith('Untitled Draft')) &&
        !draft.breed &&
        !draft.price &&
        !draft.description
      ) || [];

      setEmptyDrafts(empty);
      
      if (empty.length === 0) {
        toast.success('No empty drafts found!');
      }
    } catch (error) {
      console.error('Error scanning for empty drafts:', error);
      toast.error('Failed to scan for empty drafts');
    } finally {
      setScanning(false);
    }
  };

  const cleanupEmptyDrafts = async () => {
    if (!user || emptyDrafts.length === 0) return;
    
    setLoading(true);
    try {
      const draftIds = emptyDrafts.map(draft => draft.id);
      
      const { error } = await supabase
        .from('horse_profiles')
        .delete()
        .in('id', draftIds);

      if (error) throw error;
      
      toast.success(`Cleaned up ${emptyDrafts.length} empty drafts`);
      setEmptyDrafts([]);
    } catch (error) {
      console.error('Error cleaning up drafts:', error);
      toast.error('Failed to clean up drafts');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Card className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-yellow-400" />
          <h3 className="text-lg font-semibold text-white">Draft Cleanup</h3>
        </div>
        <Button
          onClick={scanForEmptyDrafts}
          disabled={scanning}
          variant="outline"
          size="sm"
          className="bg-blue-500/20 border-blue-500/30 text-blue-400 hover:bg-blue-500/30"
        >
          {scanning ? 'Scanning...' : 'Scan for Empty Drafts'}
        </Button>
      </div>

      <p className="text-white/60 text-sm mb-4">
        This tool helps you clean up empty or incomplete draft listings that may have been created automatically.
      </p>

      {emptyDrafts.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-400">
              {emptyDrafts.length} empty drafts found
            </Badge>
            <Button
              onClick={cleanupEmptyDrafts}
              disabled={loading}
              size="sm"
              className="bg-red-500/20 border-red-500/30 text-red-400 hover:bg-red-500/30"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              {loading ? 'Cleaning...' : 'Clean Up All'}
            </Button>
          </div>

          <div className="space-y-2">
            {emptyDrafts.map((draft) => (
              <div key={draft.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div>
                  <p className="text-white text-sm font-medium">{draft.horse_name}</p>
                  <p className="text-white/40 text-xs">Created: {formatDate(draft.created_at)}</p>
                </div>
                <Badge variant="outline" className="text-xs">Empty</Badge>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};

export default DraftCleanup;
