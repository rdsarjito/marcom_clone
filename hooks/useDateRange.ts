import React from "react";
import { PresetDate } from "../constants/presetDate";
import useFilterStore from "@/store/useFilterStore";
import { DateRange } from "react-day-picker";

const useDateRange = () => {
  const { tempFilters, setTempFilter, applyFilters } = useFilterStore();
  const today = React.useMemo(() => new Date(), []);

  const [dateRange, setDateRange] = React.useState<{ from: Date; to: Date } | undefined>(
    tempFilters.startDate && tempFilters.endDate
      ? { from: new Date(tempFilters.startDate), to: new Date(tempFilters.endDate) }
      : undefined
  );

  const [isCustomRange, setIsCustomRange] = React.useState(false);

  const presetRanges: Record<PresetDate, { from: Date; to: Date } | null> = {
    [PresetDate.ALL_TIME]: null, // Tidak memiliki rentang tanggal tertentu
    [PresetDate.CUSTOM]: null, // Ditentukan oleh pengguna secara manual
    [PresetDate.THIS_MONTH]: { from: new Date(today.getFullYear(), today.getMonth(), 1), to: today },
    [PresetDate.LAST_MONTH]: {
      from: new Date(today.getFullYear(), today.getMonth() - 1, 1),
      to: new Date(today.getFullYear(), today.getMonth(), 0),
    },
    [PresetDate.THIS_YEAR]: { from: new Date(today.getFullYear(), 0, 1), to: today },
  };

  const handleDateChange = React.useCallback((range: DateRange | undefined) => {
    if (!range?.from) {
      setDateRange(undefined);
      setTempFilter("startDate", "");
      setTempFilter("endDate", "");
    } else {
      setDateRange({ from: range.from, to: range.to ?? range.from }); // Pastikan `to` tidak undefined
      setTempFilter("startDate", range.from.toISOString());
      setTempFilter("endDate", (range.to ?? range.from).toISOString());
    }
    applyFilters();
  }, [setTempFilter, applyFilters]);

  const handlePresetSelection = (preset: PresetDate) => {
    if (preset === PresetDate.CUSTOM) {
      setIsCustomRange(true);
      return;
    }
  
    setIsCustomRange(false);
  
    if (preset === PresetDate.ALL_TIME) {
      setDateRange(undefined);
      setTempFilter("startDate", "");
      setTempFilter("endDate", "");
    } else {
      const range = presetRanges[preset];
      if (range) {
        setDateRange(range);
        setTempFilter("startDate", range.from.toISOString());
        setTempFilter("endDate", range.to.toISOString());
      }
    }
  
    applyFilters();
  };

  return { dateRange, isCustomRange, handleDateChange, handlePresetSelection, setIsCustomRange };
};

export default useDateRange;
