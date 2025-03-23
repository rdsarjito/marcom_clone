import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { FieldError } from "react-hook-form";

interface SelectFieldProps {
  label: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  value?: string;
  placeholder?: string;
  error?: FieldError;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  options,
  onChange,
  value,
  placeholder = "Pilih salah satu",
  error,
}) => {
  return (
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
};

export default SelectField;
