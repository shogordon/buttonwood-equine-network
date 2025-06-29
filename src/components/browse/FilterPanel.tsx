
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

export interface FilterState {
  priceMin?: number;
  priceMax?: number;
  ageMin?: number;
  ageMax?: number;
  disciplines: string[];
  location?: string;
  breed?: string;
  sex?: string;
}

interface FilterPanelProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  isVisible: boolean;
}

const disciplineOptions = [
  "Hunter", "Jumper", "Eventing", "Dressage", "Western", "Trail", "Driving", "Other"
];

const sexOptions = ["Mare", "Gelding", "Stallion"];

const breedOptions = [
  "Warmblood", "Thoroughbred", "Quarter Horse", "Paint", "Arabian", "Other"
];

export const FilterPanel = ({ filters, onFiltersChange, isVisible }: FilterPanelProps) => {
  const [priceRange, setPriceRange] = useState([
    filters.priceMin || 0, 
    filters.priceMax || 500000
  ]);

  const [ageRange, setAgeRange] = useState([
    filters.ageMin || 3, 
    filters.ageMax || 25
  ]);

  if (!isVisible) return null;

  const handleDisciplineToggle = (discipline: string) => {
    const newDisciplines = filters.disciplines.includes(discipline)
      ? filters.disciplines.filter(d => d !== discipline)
      : [...filters.disciplines, discipline];
    
    onFiltersChange({ ...filters, disciplines: newDisciplines });
  };

  const handlePriceChange = (values: number[]) => {
    setPriceRange(values);
    onFiltersChange({
      ...filters,
      priceMin: values[0],
      priceMax: values[1]
    });
  };

  const handleAgeChange = (values: number[]) => {
    setAgeRange(values);
    onFiltersChange({
      ...filters,
      ageMin: values[0],
      ageMax: values[1]
    });
  };

  const clearFilters = () => {
    onFiltersChange({
      disciplines: []
    });
    setPriceRange([0, 500000]);
    setAgeRange([3, 25]);
  };

  return (
    <div className="glass-card p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md mb-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-white">Filters</h3>
        <Button
          onClick={clearFilters}
          variant="ghost"
          size="sm"
          className="text-white/60 hover:text-white"
        >
          Clear All
        </Button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Price Range */}
        <div className="space-y-3">
          <Label className="text-white font-medium">Price Range</Label>
          <div className="px-2">
            <Slider
              value={priceRange}
              onValueChange={handlePriceChange}
              max={500000}
              min={0}
              step={5000}
              className="w-full"
            />
          </div>
          <div className="flex justify-between text-sm text-white/70">
            <span>${priceRange[0].toLocaleString()}</span>
            <span>${priceRange[1].toLocaleString()}</span>
          </div>
        </div>

        {/* Age Range */}
        <div className="space-y-3">
          <Label className="text-white font-medium">Age Range</Label>
          <div className="px-2">
            <Slider
              value={ageRange}
              onValueChange={handleAgeChange}
              max={25}
              min={3}
              step={1}
              className="w-full"
            />
          </div>
          <div className="flex justify-between text-sm text-white/70">
            <span>{ageRange[0]} years</span>
            <span>{ageRange[1]} years</span>
          </div>
        </div>

        {/* Location */}
        <div className="space-y-3">
          <Label className="text-white font-medium">Location</Label>
          <Input
            placeholder="Enter location"
            value={filters.location || ""}
            onChange={(e) => onFiltersChange({ ...filters, location: e.target.value })}
            className="bg-white/5 border-white/20 text-white placeholder:text-white/60"
          />
        </div>

        {/* Breed */}
        <div className="space-y-3">
          <Label className="text-white font-medium">Breed</Label>
          <select
            value={filters.breed || ""}
            onChange={(e) => onFiltersChange({ ...filters, breed: e.target.value })}
            className="w-full p-2 rounded-md bg-white/5 border border-white/20 text-white"
          >
            <option value="">All Breeds</option>
            {breedOptions.map(breed => (
              <option key={breed} value={breed} className="bg-slate-800">{breed}</option>
            ))}
          </select>
        </div>

        {/* Sex */}
        <div className="space-y-3">
          <Label className="text-white font-medium">Sex</Label>
          <select
            value={filters.sex || ""}
            onChange={(e) => onFiltersChange({ ...filters, sex: e.target.value })}
            className="w-full p-2 rounded-md bg-white/5 border border-white/20 text-white"
          >
            <option value="">All</option>
            {sexOptions.map(sex => (
              <option key={sex} value={sex} className="bg-slate-800">{sex}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Disciplines */}
      <div className="mt-6 space-y-3">
        <Label className="text-white font-medium">Disciplines</Label>
        <div className="flex flex-wrap gap-2">
          {disciplineOptions.map(discipline => (
            <Badge
              key={discipline}
              onClick={() => handleDisciplineToggle(discipline)}
              className={`cursor-pointer transition-all ${
                filters.disciplines.includes(discipline)
                  ? 'bg-blue-500/30 text-blue-300 border-blue-500/50'
                  : 'bg-white/5 text-white/70 border-white/20 hover:bg-white/10'
              }`}
            >
              {discipline}
              {filters.disciplines.includes(discipline) && (
                <X className="ml-1 h-3 w-3" />
              )}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
