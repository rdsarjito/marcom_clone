"use client";

import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { FieldError } from "react-hook-form";

interface FilterBoxProps {
  filterOptions: Record<string, readonly string[]>;
  onChange: (key: string, value: string) => void;
  selectedValues: Record<string, string>;
}

const SelectField: React.FC<{
  label: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  value?: string;
  placeholder?: string;
  error?: FieldError;
}> = ({ label, options, onChange, value, placeholder = "Pilih salah satu", error }) => (
  <div className="space-y-2">
    <Label>{label}</Label>
    <Select onValueChange={onChange} value={value}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
    {error && <p className="text-red-500 text-sm">{error.message}</p>}
  </div>
);

export default function FilterBox({ filterOptions, onChange, selectedValues }: FilterBoxProps) {
  return (
    <div className="grid grid-cols-5 gap-2">
      {Object.entries(filterOptions).map(([key, options]) => {
        const formattedOptions = options.map((option) => ({ value: option, label: option }));
        return (
          <SelectField
            key={key}
            label={`Pilih ${key}`}
            options={formattedOptions}
            onChange={(value) => onChange(key, value)}
            value={selectedValues[key] || ""}
          />
        );
      })}
    </div>
  );
}
