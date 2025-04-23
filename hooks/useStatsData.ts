import { useMemo } from "react";
import { useFilterStore } from "@/store/useFilterStore";
import useFilteredMateri from "@/hooks/useFilteredMateri";
import dayjs from "dayjs";
import { formatPresetLabel } from "@/lib/utils/dateUtils";
import { getFilteredStats, formatChange } from "@/lib/utils/statsUtils";

export const useStatsData = () => {
  const { selectedPreset, filters } = useFilterStore();
  const filteredMateri = useFilteredMateri();

  const dateRange =
    filters?.startDate && filters?.endDate
      ? { from: new Date(filters.startDate), to: new Date(filters.endDate) }
      : undefined;

  const waktuLabel = formatPresetLabel(selectedPreset, dateRange);

  const stats = useMemo(() => {
    return {
      total: getFilteredStats(filteredMateri, () => true, dateRange),
      fitur: getFilteredStats(filteredMateri, (m) => m.fitur, dateRange, (m) => m.fitur?.trim().toLowerCase()),
      aktif: getFilteredStats(filteredMateri, (m) => dayjs().isBefore(m.endDate), dateRange),
      expired: getFilteredStats(filteredMateri, (m) => dayjs().isAfter(m.endDate), dateRange),
      dokumen: getFilteredStats(filteredMateri, (m) => m.dokumenMateri?.length > 0, dateRange),
    };
  }, [filteredMateri, dateRange]);

  return {
    selectedPreset,
    waktuLabel,
    stats: Object.fromEntries(
      Object.entries(stats).map(([key, val]) => [
        key,
        { ...val, changeLabel: formatChange(val.change) },
      ])
    ) as Record<string, typeof stats.total & { changeLabel: string }>,
  };
};
