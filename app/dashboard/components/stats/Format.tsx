import { format } from "date-fns";

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
