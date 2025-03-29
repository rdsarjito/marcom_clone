"use client";

import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import useFilterStore from "../../../../store/useFilterStore";
import { filterOptions } from "../../data/filterOptions";
import HorizontalLine from "../../uiRama/horizontalLine";
import SearchInput from "../../uiRama/searchInput";
import ButtonWithIcon from "../../uiRama/buttonWithIcon";
import SelectField from "../../uiRama/selectField";

export default function FilterSection() {
  const { setTempFilter, applyFilters, resetFilters, setSearchQuery } = useFilterStore();
  const router = useRouter();
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string>>({});

  const handleFilterChange = (key: string, value: string) => {
    setTempFilter(key as keyof typeof filterOptions, value);
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
      {/* Bagian Filter */}
      <div className="flex items-center space-x-3">
        <span className="text-sm font-medium">Filter</span>
        <div className="grid grid-cols-5 gap-2 w-full">
          {Object.entries(filterOptions).map(([key, options]) => (
            <SelectField
              key={key}
              label={key}
              value={selectedFilters[key] || ""}
              onChange={(value) => handleFilterChange(key, value)}
              options={options.map((opt) => ({ value: opt, label: opt }))}
            />
          ))}
        </div>
      </div>

      <HorizontalLine />

      {/* Bagian Pencarian & Aksi */}
      <div className="flex flex-wrap justify-between items-center gap-3">
        <div className="flex items-center space-x-4">
          <SearchInput placeholder="Cari Materi Komunikasi" onChange={setSearchQuery} />
          <ButtonWithIcon
            icon={PlusCircle}
            label="Tambah Materi Komunikasi"
            className="bg-black text-white"
            onClick={handleTambahMateri}
          />
        </div>
        <div className="flex space-x-2">
          <Button variant="ghost" onClick={handleResetFilters}>Reset Filter</Button>
          <Button className="text-white bg-blue-500 hover:bg-blue-600"  onClick={applyFilters}>Terapkan Filter</Button>
        </div>
      </div>
    </div>
  );
}
