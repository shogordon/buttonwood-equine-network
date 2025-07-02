import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

export const BestPracticeCard = () => {
  return (
    <Card className="bg-blue-500/10 border-blue-500/30">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Lightbulb className="h-5 w-5 text-blue-400 mt-0.5" />
          <div>
            <h4 className="text-blue-400 font-semibold mb-1">Best Practice</h4>
            <p className="text-white/80 text-sm">
              Use the horse's registered name as the primary name, with barn name as secondary. Include location for local buyers to find you easily.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};