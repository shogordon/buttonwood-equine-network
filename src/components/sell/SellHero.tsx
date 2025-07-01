
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const SellHero = () => {
  return (
    <div className="text-center mb-12">
      <h1 className="text-5xl font-bold text-white mb-6 text-shadow">
        Sell Your Horse
      </h1>
      <p className="text-xl text-white/80 mb-8 max-w-3xl mx-auto">
        List your horse with confidence. Our platform connects you with serious buyers and provides all the tools you need for a successful sale.
      </p>
      <Link to="/sell/new">
        <Button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl hover:scale-105 transition-all duration-300 px-8 py-4 text-lg font-semibold">
          <Plus className="mr-2 h-5 w-5" />
          List Your Horse
        </Button>
      </Link>
    </div>
  );
};

export default SellHero;
