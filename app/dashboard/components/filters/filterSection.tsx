"use client";

// ✅ 1. Third-party libraries
import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";

// ✅ 2. Absolute imports (alias path)
import { Button } from "@/components/ui/button";

// ✅ 3. Relative imports (parent folder `../`)
import useFilterStore from "../../store/useFilterStore";
import { filterOptions } from "../../data/filterOptions";

// ✅ 4. Relative imports (same folder `./`)
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
    router.push("/dashboard/tambah-materi"); // Navigasi ke halaman tambah materi
  };

  return (
    <div className="p-4 bg-gray-50 space-y-4">
      {/* Langsung memasukkan dropdown filter tanpa FilterBox */}
      <div className="grid grid-cols-5 gap-2">
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

      <HorizontalLine />

      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <SearchInput
            placeholder="Cari Materi Komunikasi"
            onChange={setSearchQuery} 
          />
          <ButtonWithIcon
            icon={PlusCircle}
            label="Tambah Materi Komunikasi"
            className="bg-black text-white hover:bg-gray-800"
            onClick={handleTambahMateri}
          />
        </div>
        <div className="flex space-x-2">
          <Button variant="ghost" onClick={handleResetFilters}>Reset Filter</Button>
          <Button onClick={applyFilters}>Terapkan Filter</Button>
        </div>
      </div>
    </div>
  );
}
