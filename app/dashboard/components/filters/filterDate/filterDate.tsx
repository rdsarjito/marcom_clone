"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import useDateRange from "../../../../../hooks/useDateRange";
import DateDropdown from "./dateDropDown";

const FilterDate: React.FC = () => {
  const { dateRange, isCustomRange, handleDateChange, handlePresetSelection } = useDateRange();

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-700">Lihat data selama</span>
      <DateDropdown dateRange={dateRange} isCustomRange={isCustomRange} handlePresetSelection={handlePresetSelection} />

      {isCustomRange && (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="ml-2">
              Periode Data
              <CalendarIcon className="mr-2 h-4 w-4" />
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
