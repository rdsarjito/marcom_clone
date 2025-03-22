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
  tipeMateri: string;
  keywords: string[];
  setField: (field: keyof FormState, value: any) => void;
  addKeyword: () => void;
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
  tipeMateri: "",
  keywords: ["", "", ""],
  setField: (field, value) => set((state) => ({ ...state, [field]: value })),
  addKeyword: () =>
    set((state) => ({ keywords: [...state.keywords, ""] })),
}));


export default useFormStore;