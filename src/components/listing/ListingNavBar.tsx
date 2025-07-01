
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface ListingNavBarProps {
  onBackClick: () => void;
}

export const ListingNavBar = ({ onBackClick }: ListingNavBarProps) => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/5 backdrop-blur-md shadow-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-xl bg-white/5 backdrop-blur-md flex items-center justify-center">
              <img src="/lovable-uploads/the-aisle-logo.png" alt="The Aisle" className="h-6 w-6" />
            </div>
            <span className="text-xl font-semibold text-white">
              The Aisle
            </span>
          </Link>
          <button 
            onClick={onBackClick}
            className="text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-5 w-5 inline mr-2" />
            Back to Dashboard
          </button>
        </div>
      </div>
    </nav>
  );
};
