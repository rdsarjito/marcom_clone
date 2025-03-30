import { create } from "zustand";

interface Materi {
  _id: string;
  brand: string;
  cluster: string;
  fitur: string;
  namaMateri: string;
  jenis: string;
  startDate: string;
  endDate: string;
  periode: string;
  thumbnail: string;
  linkDokumen: string;
  tipeMateri: string;
  keywords: string[];
}

interface MateriStore {
  data: Materi[];
  loading: boolean;
  currentPage: number;
  itemsPerPage: number;
  fetchData: () => Promise<void>;
  setCurrentPage: (page: number) => void;
}

const useMateriStore = create<MateriStore>((set) => ({
  data: [],
  loading: true,
  currentPage: 1,
  itemsPerPage: 10,

  fetchData: async () => {
    set({ loading: true });
    try {
      const response = await fetch("http://localhost:5000/api/materi");
      if (!response.ok) throw new Error("Gagal mengambil data");
      const result = await response.json();
      set({ data: result, loading: false });
    } catch (error) {
      console.error(error);
      set({ loading: false });
    }
  },

  setCurrentPage: (page) => set({ currentPage: page }),
}));

export default useMateriStore;
