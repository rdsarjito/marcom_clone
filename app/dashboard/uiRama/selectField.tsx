"use client";

import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { useFormContext } from "react-hook-form";

interface ReusableSelectProps {
  name?: string;
  label?: string;
  options: { value: string; label: string }[];
  value?: string;
  onChange?: (value: string) => void;
}

export default function SelectField({ name, label, options, value, onChange }: ReusableSelectProps) {
  const form = useFormContext();
  const isForm = !!form && name;

  return (
    <div className="space-y-2">
      <Select
        onValueChange={(val) => {
          if (isForm) form.setValue(name!, val);
          if (onChange) onChange(val);
        }}
        value={isForm ? form.watch(name!) : value}
      >
        <SelectTrigger className="text-gray-600">
          <SelectValue placeholder={`Pilih ${label || "opsi"}`} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {isForm && form.formState.errors[name!] && (
        <p className="text-red-500">{form.formState.errors[name!]?.message as string}</p>
      )}
    </div>
  );
}
