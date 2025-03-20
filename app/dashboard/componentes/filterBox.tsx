"use client";

import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

interface FilterBoxProps {
  filterOptions: Record<string, readonly string[]>;
  onChange: (key: string, value: string) => void;
  selectedValues: Record<string, string>; // Tambahkan prop ini
}

export default function FilterBox({ filterOptions, onChange, selectedValues }: FilterBoxProps) {
  return (
    <div className="grid grid-cols-5 gap-2">
      {Object.entries(filterOptions).map(([key, options]) => (
        <Select key={key} onValueChange={(value) => onChange(key, value)} value={selectedValues[key] || ""}>
          <SelectTrigger className="w-full border border-gray-300 rounded-md bg-white">
            <SelectValue placeholder={`Pilih ${key}`} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option} value={option}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ))}
    </div>
  );
}