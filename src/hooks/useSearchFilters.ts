
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { FilterState } from "@/components/browse/FilterPanel";
import { useDebounce } from "./useDebounce";

export const useSearchFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    priceMin: searchParams.get("priceMin") ? parseInt(searchParams.get("priceMin")!) : undefined,
    priceMax: searchParams.get("priceMax") ? parseInt(searchParams.get("priceMax")!) : undefined,
    ageMin: searchParams.get("ageMin") ? parseInt(searchParams.get("ageMin")!) : undefined,
    ageMax: searchParams.get("ageMax") ? parseInt(searchParams.get("ageMax")!) : undefined,
    disciplines: searchParams.get("disciplines")?.split(",").filter(Boolean) || [],
    location: searchParams.get("location") || undefined,
    breed: searchParams.get("breed") || undefined,
    sex: searchParams.get("sex") || undefined,
  });

  // Debounce search query to prevent excessive API calls
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Update URL params when debounced search/filters change
  useEffect(() => {
    const params = new URLSearchParams();
    
    if (debouncedSearchQuery) params.set("q", debouncedSearchQuery);
    if (filters.priceMin) params.set("priceMin", filters.priceMin.toString());
    if (filters.priceMax) params.set("priceMax", filters.priceMax.toString());
    if (filters.ageMin) params.set("ageMin", filters.ageMin.toString());
    if (filters.ageMax) params.set("ageMax", filters.ageMax.toString());
    if (filters.disciplines.length > 0) params.set("disciplines", filters.disciplines.join(","));
    if (filters.location) params.set("location", filters.location);
    if (filters.breed) params.set("breed", filters.breed);
    if (filters.sex) params.set("sex", filters.sex);
    
    setSearchParams(params, { replace: true });
  }, [debouncedSearchQuery, filters, setSearchParams]);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return {
    searchQuery,
    debouncedSearchQuery,
    filters,
    showFilters,
    handleSearchChange,
    handleFiltersChange,
    toggleFilters
  };
};
