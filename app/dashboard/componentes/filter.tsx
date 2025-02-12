"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

const filterOptions = [
  {
    name: "Pilih Brand",
    options: [
      { label: "Brand 1", value: "brand1" },
      { label: "Brand 2", value: "brand2" },
      { label: "Brand 3", value: "brand3" },
    ],
  },
  {
    name: "Pilih Cluster",
    options: [
      { label: "Cluster 1", value: "cluster1" },
      { label: "Cluster 2", value: "cluster2" },
      { label: "Cluster 3", value: "cluster3" },
    ],
  },
  {
    name: "Pilih Fitur",
    options: [
      { label: "Fitur 1", value: "fitur1" },
      { label: "Fitur 2", value: "fitur2" },
    ],
  },
  {
    name: "Pilih Status",
    options: [
      { label: "Status 1", value: "status1" },
      { label: "Status 2", value: "status2" },
    ],
  },
  {
    name: "Pilih Tipe Materi",
    options: [
      { label: "Tipe Materi 1", value: "tipe1" },
      { label: "Tipe Materi 2", value: "tipe2" },
    ],
  },
];

const FilterComponent = () => {
  const [filters, setFilters] = useState({});

  const handleChange = (name: string, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="pt-4 pl-8 pb-4 pr-8 bg-gray-50">
      <div className="flex items-center gap-4 mb-4 border-b pb-4">
        <div className="text-sm">Filter</div>
        <div className="grid grid-cols-5 gap-4 flex-1">
          {filterOptions.map((filter) => (
            <Select key={filter.name} onValueChange={(value) => handleChange(filter.name, value)}>
              <SelectTrigger className="text-gray-400 bg-white">
                <SelectValue placeholder={filter.name} />
              </SelectTrigger>
              <SelectContent>
                {filter.options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
            <div className="relative w-60">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <Input
                placeholder="Cari Materi Komunikasi"
                className="w-full pl-10 bg-white border border-gray-300"
                />
            </div>
            <Button variant="default">+ Tambah Materi Komunikasi</Button>
        </div>

        <div className="flex items-center gap-4">
            <Button variant="outline">Reset Filter</Button>
            <Button variant="default" className="bg-blue-600 text-white">Terapkan Filter</Button>
        </div>

      </div>
    </div>
  );
};

export default FilterComponent;
