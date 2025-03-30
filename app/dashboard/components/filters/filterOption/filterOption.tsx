"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useFilterStore from "../../../../../store/useFilterStore";
import HorizontalLine from "../../../uiRama/horizontalLine";
import FilterGroup from "./filterGroup";
import SearchAndActions from "./searchAndActions";
import { FilterKey } from "@/constants/filterOptions";

export default function FilterOption() {
  const { setTempFilter, applyFilters, resetFilters, setSearchQuery } = useFilterStore();
  const router = useRouter();
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({});

  const handleFilterChange = (key: string, value: string) => {
    setTempFilter(key as FilterKey, value);  // 👈 Paksa TypeScript mengenali key sebagai FilterKey
    setSelectedFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    resetFilters();
    setSelectedFilters({});
  };

  const handleTambahMateri = () => {
    router.push("/dashboard/tambah-materi");
  };

  return (
    <div className="pt-4 pr-8 pb-4 pl-8 bg-gray-50 space-y-4">
      <FilterGroup selectedFilters={selectedFilters} handleFilterChange={handleFilterChange} />
      <HorizontalLine />
      <SearchAndActions
        handleTambahMateri={handleTambahMateri}
        handleResetFilters={handleResetFilters}
        applyFilters={applyFilters}
        setSearchQuery={setSearchQuery}
      />
    </div>
  );
}
