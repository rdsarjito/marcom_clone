"use client";

import { useRouter } from "next/navigation";
import { useFilterStore } from "@/store/useFilterStore";
import useSelectedFilters from "@/hooks/useSelectedFilters";
import HorizontalLine from "../../../uiRama/horizontalLine";
import FilterGroup from "./filterGroup";
import SearchAndActions from "./searchAndActions";

export default function FilterOption() {
  const { applyFilters, setSearchQuery } = useFilterStore();
  const router = useRouter();
  const { selectedFilters, handleFilterChange, handleResetFilters } = useSelectedFilters();

  return (
    <div className="pt-4 pr-8 pb-4 pl-8 bg-gray-50 space-y-4">
      <FilterGroup selectedFilters={selectedFilters} handleFilterChange={handleFilterChange} />
      <HorizontalLine />
      <SearchAndActions
        handleTambahMateri={() => router.push("/dashboard/form-materi")}
        handleResetFilters={handleResetFilters}
        applyFilters={applyFilters}
        setSearchQuery={setSearchQuery}
      />
    </div>
  );
}
