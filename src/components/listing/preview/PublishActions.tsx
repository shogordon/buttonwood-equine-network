
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface PublishActionsProps {
  onPublish: () => void;
  onSaveDraft: () => void;
  publishing: boolean;
  missingFields: string[];
}

export const PublishActions = ({ onPublish, onSaveDraft, publishing, missingFields }: PublishActionsProps) => {
  return (
    <>
      {/* Publish Actions */}
      <div className="flex justify-center gap-4">
        <Button
          onClick={onPublish}
          disabled={publishing || missingFields.length > 0}
          className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-3 text-lg font-semibold hover:scale-105 transition-all duration-300"
        >
          {publishing ? 'Publishing...' : 'Publish Listing'}
        </Button>
        
        <Button
          onClick={onSaveDraft}
          variant="outline"
          className="bg-white/5 border-white/20 text-white hover:bg-white/10 px-8 py-3"
        >
          Save as Draft
        </Button>
      </div>

      {missingFields.length > 0 && (
        <Card className="bg-orange-500/10 border-orange-500/20 p-4">
          <h4 className="text-orange-400 font-semibold mb-2">Complete these required fields:</h4>
          <ul className="text-white/80 text-sm space-y-1">
            {missingFields.map((field) => (
              <li key={field}>• {field}</li>
            ))}
          </ul>
        </Card>
      )}
    </>
  );
};
