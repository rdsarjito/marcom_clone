import { create } from "zustand";

interface FormState {
  brand: string;
  cluster: string;
  fitur: string;
  namaMateri: string;
  jenis: string;
  startDate?: Date;
  endDate?: Date;
  periode: string;
  linkDokumen: string;
  tipeMateri: "video" | "pdf" | "dokumen";
  keywords: string[];
  setField: (field: keyof FormState, value: any) => void;
  addKeyword: () => void;
  updateKeyword: (index: number, value: string) => void;
  resetForm: () => void;
}

const useFormStore = create<FormState>((set) => ({
  brand: "",
  cluster: "",
  fitur: "",
  namaMateri: "",
  jenis: "",
  startDate: undefined,
  endDate: undefined,
  periode: "",
  linkDokumen: "",
  tipeMateri: "pdf",
  keywords: ["", "", ""],
  setField: (field, value) =>
    set((state) => ({ ...state, [field]: value as any })),
  addKeyword: () =>
    set((state) => ({ keywords: [...state.keywords, ""] })),
  updateKeyword: (index, value) =>
    set((state) => {
      const newKeywords = [...state.keywords];
      newKeywords[index] = value;
      return { keywords: newKeywords };
    }),
  setStartDate: (date: Date) => set({ startDate: date }), // ✅ Tambahkan fungsi ini
  setEndDate: (date: Date) => set({ endDate: date }), // ✅ Tambahkan fungsi ini
  resetForm: () =>
    set({
      brand: "",
      cluster: "",
      fitur: "",
      namaMateri: "",
      jenis: "",
      startDate: undefined,
      endDate: undefined,
      periode: "",
      linkDokumen: "",
      tipeMateri: "pdf",
      keywords: ["", "", ""],
    }),
}));


export default useFormStore;
