"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon, ChevronDownIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import useFilterStore from "../../../../store/useFilterStore";

const FilterDate: React.FC = () => {
  const { tempFilters, setTempFilter, applyFilters } = useFilterStore();
  const today = new Date();

  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(
    tempFilters.startDate && tempFilters.endDate
      ? {
          from: new Date(tempFilters.startDate),
          to: new Date(tempFilters.endDate),
        }
      : undefined
  );

  const [isCustomRange, setIsCustomRange] = React.useState(false);

  const [showCalendar, setShowCalendar] = React.useState(false);

  const handleDateChange = (range: DateRange | undefined) => {
    setDateRange(range);
    if (range?.from) setTempFilter("startDate", range.from.toISOString());
    if (range?.to) setTempFilter("endDate", range.to.toISOString());
    applyFilters();
  };

  const handlePresetSelection = (preset: string) => {
    let startDate, endDate;
  
    switch (preset) {
      case "All time":
        setDateRange(undefined);
        setTempFilter("startDate", "");
        setTempFilter("endDate", "");
        setIsCustomRange(false); // Pastikan Kalender tetap tersembunyi
        applyFilters();
        return;
      case "Bulan ini":
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        endDate = today;
        setIsCustomRange(false); // Jangan tampilkan Kalender
        break;
      case "Bulan lalu":
        startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        endDate = new Date(today.getFullYear(), today.getMonth(), 0);
        setIsCustomRange(false); // Jangan tampilkan Kalender
        break;
      case "Tahun ini":
        startDate = new Date(today.getFullYear(), 0, 1);
        endDate = today;
        setIsCustomRange(false); // Jangan tampilkan Kalender
        break;
      case "Pilih Periode Tertentu":
        setDateRange(undefined);
        setIsCustomRange(true); // Tampilkan Kalender
        return;
      default:
        return;
    }
  
    setDateRange({ from: startDate, to: endDate });
    setTempFilter("startDate", startDate.toISOString());
    setTempFilter("endDate", endDate.toISOString());
    applyFilters();
  };
  

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-700">Lihat data selama</span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-[260px] justify-between">
          {isCustomRange ? (
            <span>Pilih tanggal...</span>
          ) : dateRange?.from ? (
            dateRange.to ? (
              `${format(dateRange.from, "d MMM y")} - ${format(dateRange.to, "d MMM y")}`
            ) : (
              format(dateRange.from, "d MMM y")
            )
          ) : (
            <span>All time</span>
          )}
          <ChevronDownIcon className="ml-2 h-4 w-4" />
        </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[260px]">
          <DropdownMenuItem onClick={() => handlePresetSelection("All time")}>
            All time
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handlePresetSelection("Bulan ini")}>
            Bulan ini ({format(new Date(today.getFullYear(), today.getMonth(), 1), "d MMM y")} - {format(today, "d MMM y")})
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handlePresetSelection("Bulan lalu")}>
            Bulan lalu ({format(new Date(today.getFullYear(), today.getMonth() - 1, 1), "MMMM yyyy")})
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handlePresetSelection("Tahun ini")}>
            Tahun ini ({today.getFullYear()})
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handlePresetSelection("Pilih Periode Tertentu")}>
            Pilih Periode Tertentu
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {isCustomRange && (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="ml-2">
              <CalendarIcon className="mr-2 h-4 w-4" />
              Kalender
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange?.from}
              selected={dateRange}
              onSelect={handleDateChange}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};

export default FilterDate;
