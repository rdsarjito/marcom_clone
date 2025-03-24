"use client";

import * as React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import useFilterStore from "../../../../store/useFilterStore";

const FilterDate: React.FC = () => {
  const { tempFilters, setTempFilter, applyFilters } = useFilterStore();

  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  const [startDate, setStartDate] = React.useState<Date | null>(
    tempFilters.startDate ? new Date(tempFilters.startDate) : startOfMonth
  );

  const [endDate, setEndDate] = React.useState<Date | null>(
    tempFilters.endDate ? new Date(tempFilters.endDate) : today
  );

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    if (start) setTempFilter("startDate", start.toISOString());
    if (end) setTempFilter("endDate", end.toISOString());

    applyFilters();
  };

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-700">Pilih rentang tanggal</span>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-[260px] justify-between text-left font-normal",
              !startDate && !endDate && "text-muted-foreground"
            )}
          >
            <div className="flex items-center">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {startDate && endDate ? (
                `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
              ) : (
                <span>Pilih rentang tanggal</span>
              )}
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={15} // Menampilkan 15 tahun dalam dropdown
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default FilterDate;
