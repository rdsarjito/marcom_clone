import React from "react";
import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { PresetDate } from "../../../../../constants/presetDate";

interface DateDropdownProps {
  dateRange?: { from: Date; to: Date };
  isCustomRange: boolean;
  handlePresetSelection: (preset: PresetDate) => void;
}

const DateDropdown: React.FC<DateDropdownProps> = ({ dateRange, isCustomRange, handlePresetSelection }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-[260px] justify-between">
          {isCustomRange ? (
            <span>Pilih tanggal tertentu</span>
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
        {Object.values(PresetDate).map((preset) => (
          <DropdownMenuItem key={preset} onClick={() => handlePresetSelection(preset)}>
            {preset}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DateDropdown;
