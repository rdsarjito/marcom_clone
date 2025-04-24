import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import dayjs from "dayjs";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getImageUrl = (path?: string) => {
  if (!path) return ""; // atau bisa kembalikan placeholder default
  return `http://localhost:5000/${path}`;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function convertToFormData(data: any): FormData {
  const formData = new FormData();

  for (const key of ['brand', 'cluster', 'fitur', 'namaMateri', 'jenis', 'startDate', 'endDate', 'periode']) {
    if (data[key] !== undefined) {
      formData.append(key, data[key]);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data.dokumenMateri.forEach((doc: any, index: number) => {
    formData.append(`dokumenMateri[${index}].linkDokumen`, doc.linkDokumen);
    formData.append(`dokumenMateri[${index}].tipeMateri`, doc.tipeMateri);

    doc.keywords.forEach((keyword: string, kIndex: number) => {
      formData.append(`dokumenMateri[${index}].keywords[${kIndex}]`, keyword);
    });

    formData.append(`dokumenMateri[${index}].thumbnail`, doc.thumbnail); // file
  });

  return formData;
}

export const isInRange = (
  date: string,
  range?: { from: Date; to: Date }
): boolean => {
  if (!range?.from || !range?.to) return true;
  const start = dayjs(range.from);
  const end = dayjs(range.to);
  const itemDate = dayjs(date);
  return itemDate.isAfter(start, "day") && itemDate.isBefore(end, "day");
};

export const getFilteredStats = <T>(
  data: T[],
  dateRange: { from: Date; to: Date } | undefined,
  filterFn: (item: T) => boolean,
  uniqueBy?: (item: T) => string | undefined
) => {
  const isInRangeInternal = (date: string) => isInRange(date, dateRange);

  const currentList = data.filter(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (item: any) => isInRangeInternal(item.startDate) && filterFn(item)
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const prevList = data.filter((item: any) => {
    if (!dateRange?.from || !dateRange?.to) return false;
    const rangeDiff = dayjs(dateRange.to).diff(dateRange.from, "day") + 1;
    const prevStart = dayjs(dateRange.from).subtract(rangeDiff, "day");
    const prevEnd = dayjs(dateRange.from).subtract(1, "day");
    const itemDate = dayjs(item.startDate);
    return itemDate.isAfter(prevStart, "day") && itemDate.isBefore(prevEnd, "day") && filterFn(item);
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

export const formatChange = (change: number) => {
  return change === 0 ? "0" : change > 0 ? `+${change}` : `${change}`;
}

export const formatPresetLabel = (
  preset?: string,
  dateRange?: { from: Date; to: Date }
): string => {
  switch (preset) {
    case "Bulan ini":
      return "dari bulan ini";
    case "Bulan lalu":
      return "dari bulan lalu";
    case "Tahun ini":
      return "dari tahun ini";
    case "All time":
      return "";
    case "Pilih tanggal tertentu":
      if (dateRange?.from && dateRange?.to) {
        return `dari ${format(dateRange.from, "d MMM yyyy")} - ${format(
          dateRange.to,
          "d MMM yyyy"
        )}`;
      }
      return "dari rentang tanggal";
    default:
      return "";
  }
};