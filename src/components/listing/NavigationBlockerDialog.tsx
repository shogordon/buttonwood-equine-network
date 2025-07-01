
import { Card } from "@/components/ui/card";

interface NavigationBlockerDialogProps {
  isOpen: boolean;
  onSaveAndContinue: () => void;
  onLeaveWithoutSaving: () => void;
  onCancel: () => void;
}

export const NavigationBlockerDialog = ({
  isOpen,
  onSaveAndContinue,
  onLeaveWithoutSaving,
  onCancel,
}: NavigationBlockerDialogProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <Card className="bg-white/10 backdrop-blur-md border border-white/20 p-6 max-w-md">
        <h3 className="text-lg font-semibold text-white mb-4">Unsaved Changes</h3>
        <p className="text-white/80 mb-6">
          You have unsaved changes. Would you like to save before leaving?
        </p>
        <div className="flex gap-3">
          <button
            onClick={onSaveAndContinue}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Save & Continue
          </button>
          <button
            onClick={onLeaveWithoutSaving}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
          >
            Leave Without Saving
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 text-white/80 hover:text-white"
          >
            Cancel
          </button>
        </div>
      </Card>
    </div>
  );
};
