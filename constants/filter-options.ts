export type FilterKey = "brand" | "cluster" | "fitur" | "status" | "tipe";

export const filterOptions: Record<FilterKey, string[]> = {
  brand: ["BRImo"],
  cluster: ["Bayar-Bayar Harian", "Bayar-Bayar Bulanan", "Tagihan"],
  fitur: ["Donasi", "QRIS Source CC", "Transfer Internasional"],
  status: ["Aktif", "Expired"],
  tipe: ["Key Visual", "TVC", "Video"],
};