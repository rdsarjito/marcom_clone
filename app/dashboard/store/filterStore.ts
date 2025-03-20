import { create } from "zustand";

type Filters = {
  brand?: string;
  cluster?: string;
  fitur?: string;
  status?: string;
  tipe?: string;
};

type FilterStore = {
  filters: Filters;
  tempFilters: Filters;
  searchQuery: string; 
  setTempFilter: (key: keyof Filters, value: string) => void;
  applyFilters: () => void;
  resetFilters: () => void;
  setSearchQuery: (query: string) => void;
};

const useFilterStore = create<FilterStore>((set) => ({
  filters: {},
  tempFilters: {},
  searchQuery: "", 
  setTempFilter: (key, value) =>
    set((state) => ({ tempFilters: { ...state.tempFilters, [key]: value } })),
  applyFilters: () => set((state) => ({ filters: state.tempFilters })),
  resetFilters: () =>
    set({ filters: {}, tempFilters: {}, searchQuery: "" }), 
  setSearchQuery: (query) => set({ searchQuery: query }),
}));

export default useFilterStore;