import React from "react";
import { Layers, Package, Zap, Clock, FileText } from "lucide-react";
import useFilterStore from "@/store/useFilterStore";
import { format } from "date-fns";
import StatsCard from "../../uiRama/statsCard"; // Asumsikan ini adalah komponen yang digunakan
import useFilteredMateri from "@/hooks/useFilteredMateri"; // Hook yang sudah ada
import dayjs from "dayjs";

// Fungsi untuk format label berdasarkan preset
const formatPresetLabel = (preset?: string, dateRange?: { from: Date; to: Date }): string => {
  switch (preset) {
    case "Bulan ini":
      return "dari bulan ini";
    case "Bulan lalu":
      return "dari bulan lalu";
    case "Tahun ini":
      return "dari tahun ini";
    case "All time":
      return ""; // bisa juga "seluruh waktu" kalau mau ditampilkan
    case "Pilih tanggal tertentu":
      if (dateRange?.from && dateRange?.to) {
        return `dari ${format(dateRange.from, "d MMM yyyy")} - ${format(dateRange.to, "d MMM yyyy")}`;
      }
      return "dari rentang tanggal";
    default:
      return "";
  }
};

const StatsSection = () => {
  const selectedPreset = useFilterStore((s) => s.selectedPreset); // Ambil preset dari store

  
  const { filters } = useFilterStore(); // Ambil filter untuk dateRange
  const dateRange = filters?.startDate && filters?.endDate
    ? { from: new Date(filters.startDate), to: new Date(filters.endDate) }
    : undefined;

  const waktuLabel = formatPresetLabel(selectedPreset, dateRange);

  const filteredMateri = useFilteredMateri();

  const isInRange = (date: string) => {
    if (!dateRange?.from || !dateRange?.to) return true;
  
    const start = dayjs(dateRange.from);
    const end = dayjs(dateRange.to);
    const itemDate = dayjs(date);
  
    // Memastikan itemDate ada di dalam rentang start dan end
    return itemDate.isAfter(start, "day") && itemDate.isBefore(end, "day");
  };

  const getFiltered = (
    filterFn: (m: any) => boolean,
    uniqueBy?: (m: any) => string | undefined
  ) => {
    const currentList = filteredMateri.filter((m) => isInRange(m.startDate) && filterFn(m));
    const prevList = filteredMateri.filter((m) => {
      if (!dateRange?.from || !dateRange?.to) return false;
      const rangeDiff = dayjs(dateRange.to).diff(dateRange.from, "day") + 1;
      const prevStart = dayjs(dateRange.from).subtract(rangeDiff, "day");
      const prevEnd = dayjs(dateRange.from).subtract(1, "day");
      const date = dayjs(m.startDate);
      return date.isAfter(prevStart, "day") && date.isBefore(prevEnd, "day") && filterFn(m);
    });

    const current = uniqueBy
      ? new Set(currentList.map(uniqueBy).filter(Boolean)).size
      : currentList.length;

    const prev = uniqueBy
      ? new Set(prevList.map(uniqueBy).filter(Boolean)).size
      : prevList.length;

    return {
      now: current,
      change: current - prev,
    };
  };

  const total = getFiltered(() => true);
  const fitur = getFiltered(
    (m) => m.fitur && m.fitur.trim() !== "",
    (m) => m.fitur?.trim().toLowerCase() // memastikan fitur unik walaupun beda kapital
  );
  const aktif = getFiltered((m) => dayjs().isBefore(m.endDate));
  const expired = getFiltered((m) => dayjs().isAfter(m.endDate));
  const dokumen = getFiltered((m) => m.dokumenMateri?.length > 0);

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 px-4 py-6">
      <StatsCard
        title="Jumlah Fitur"
        value={fitur.now.toString()}
        change={formatChange(fitur.change)}
        subtext={waktuLabel}
        selectedPreset={selectedPreset}
        icon={<Layers size={16} />}
      />
      <StatsCard
        title="Materi Komunikasi"
        value={total.now.toString()}
        change={formatChange(total.change)}
        subtext={waktuLabel} 
        selectedPreset={selectedPreset}
        icon={<Package size={16} />}
      />
      <StatsCard
        title="Materi Aktif"
        value={aktif.now.toString()}
        change={formatChange(aktif.change)}
        subtext={waktuLabel}
        selectedPreset={selectedPreset}
        icon={<Zap size={16} />}
      />
      <StatsCard
        title="Materi Expired"
        value={expired.now.toString()}
        change={formatChange(expired.change)}
        subtext={waktuLabel}
        selectedPreset={selectedPreset}
        icon={<Clock size={16} />}
      />
      <StatsCard
        title="Jumlah Dokumen"
        value={dokumen.now.toString()}
        change={formatChange(dokumen.change)}
        subtext={waktuLabel} 
        selectedPreset={selectedPreset}
        icon={<FileText size={16} />}
      />
    </section>
  );
};

const formatChange = (change: number) =>
  change === 0 ? "0" : change > 0 ? `+${change}` : `${change}`;

export default StatsSection;
