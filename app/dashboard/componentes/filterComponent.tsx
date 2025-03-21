"use client";

import { Button } from "@/components/ui/button";
import useFilterStore from "../store/filterStore";
import { PlusCircle } from "lucide-react";
import FilterBox from "./filterBox";
import HorizontalLine from "./horizontalLine";
import SearchInput from "./searchInput";
import { useState } from "react";

const filterOptions = {
  brand: ["BRImo", "Brand A", "Brand B"],
  cluster: ["Bayar-Bayar Harian", "Bayar-bayar Bulanan", "Tagihan"],
  fitur: ["Donasi", "Belanja Bulanan", "Transfer Internasional"],
  status: ["Aktif", "Expired"],
  tipe: ["Key Visual", "TVC", "Video"],
} as const;

export default function FilterComponent() {
  const { setTempFilter, applyFilters, resetFilters, setSearchQuery } = useFilterStore();
  
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({});

  const handleFilterChange = (key: string, value: string) => {
    setTempFilter(key as keyof typeof filterOptions, value);
    setSelectedFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    resetFilters();
    setSelectedFilters({}); 
  };

  return (
    <div className="p-4 bg-gray-50">
      <FilterBox
        filterOptions={filterOptions}
        onChange={handleFilterChange}
        selectedValues={selectedFilters} 
      />

      <HorizontalLine />

      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <SearchInput
            placeholder="Cari Materi Komunikasi"
            onChange={setSearchQuery} 
          />
          <Button className="bg-black text-white hover:bg-gray-800 flex items-center">
            <PlusCircle size={16} className="mr-2" />
            Tambah Materi Komunikasi
          </Button>
        </div>
        <div className="flex space-x-2">
          <Button variant="ghost" onClick={handleResetFilters}>Reset Filter</Button>
          <Button onClick={applyFilters}>Terapkan Filter</Button>
        </div>
      </div>
    </div>
  );
}
