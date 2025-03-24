import { useFormContext } from "react-hook-form";
import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DayPicker } from "react-day-picker";

import "react-day-picker/dist/style.css";

interface DatePickerProps {
  name: string;
  label: string;
}

export default function DatePickerForm({ name, label }: DatePickerProps) {
  const { setValue, watch, formState: { errors } } = useFormContext();
  const selectedDate = watch(name);
  const [date, setDate] = useState<Date | null>(selectedDate || null);

  const handleSelect = (date: Date | undefined) => {
    if (date) {
      setDate(date);
      setValue(name, date, { shouldValidate: true });
    }
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full flex justify-between">
            {date ? format(date, "dd/MM/yyyy") : "Pilih tanggal"}
            <CalendarIcon className="ml-2 h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start">
          <DayPicker mode="single" selected={date ?? undefined} onSelect={handleSelect} />
        </PopoverContent>
      </Popover>
      {errors[name] && <p className="text-red-500">{errors[name]?.message as string}</p>}
    </div>
  );
}
