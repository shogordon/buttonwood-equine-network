
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, X } from "lucide-react";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onFilterToggle: () => void;
  showFilters: boolean;
  resultCount?: number;
}

export const SearchBar = ({ 
  searchQuery, 
  onSearchChange, 
  onFilterToggle, 
  showFilters,
  resultCount 
}: SearchBarProps) => {
  const [localQuery, setLocalQuery] = useState(searchQuery);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchChange(localQuery);
  };

  const handleClear = () => {
    setLocalQuery("");
    onSearchChange("");
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-8">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60 h-5 w-5" />
          <Input
            type="text"
            placeholder="Search horses by name, breed, location, or description..."
            value={localQuery}
            onChange={(e) => setLocalQuery(e.target.value)}
            className="glass-card pl-12 pr-24 py-4 text-white placeholder:text-white/60 border-white/20 bg-white/5 backdrop-blur-md rounded-2xl text-lg"
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
            {localQuery && (
              <Button
                type="button"
                onClick={handleClear}
                variant="ghost"
                size="sm"
                className="text-white/60 hover:text-white p-2"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
            <Button
              type="button"
              onClick={onFilterToggle}
              variant="ghost"
              size="sm"
              className={`text-white/60 hover:text-white p-2 ${showFilters ? 'bg-white/10' : ''}`}
            >
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </form>
      
      {resultCount !== undefined && (
        <div className="mt-3 text-center">
          <p className="text-white/70 text-sm">
            {resultCount === 0 ? 'No horses found' : `${resultCount} horse${resultCount === 1 ? '' : 's'} found`}
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
