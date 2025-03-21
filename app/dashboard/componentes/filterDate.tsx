"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon, ChevronDown } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useFilterStore from "../store/filterStore";

const FilterDate: React.FC = () => {
  const { tempFilters, setTempFilter, applyFilters } = useFilterStore();

  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: tempFilters.startDate ? new Date(tempFilters.startDate) : startOfMonth,
    to: tempFilters.endDate ? new Date(tempFilters.endDate) : today,
  });

  const handleSelect = (range: DateRange | undefined) => {
    setDateRange(range);

    if (range?.from) setTempFilter("startDate", range.from.toISOString());
    if (range?.to) setTempFilter("endDate", range.to.toISOString());

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
              !dateRange?.from && !dateRange?.to && "text-muted-foreground"
            )}
          >
            <div className="flex items-center">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange?.from && dateRange?.to ? (
                `${format(dateRange.from, "d MMM yyyy")} - ${format(dateRange.to, "d MMM yyyy")}`
              ) : (
                <span>Pilih rentang tanggal</span>
              )}
            </div>
            <ChevronDown className="h-4 w-4 ml-2" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar mode="range" selected={dateRange} onSelect={handleSelect} initialFocus />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default FilterDate;
