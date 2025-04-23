import { create } from "zustand";

type Filters = {
  brand?: string;
  cluster?: string;
  fitur?: string;
  status?: string;
  tipe?: string;
  startDate?: string;
  endDate?: string;
};

type FilterStore = {
  filters: Filters;
  tempFilters: Filters;
  searchQuery: string;
  selectedPreset: string;
  setTempFilter: (key: keyof Filters, value: string) => void;
  applyFilters: () => void;
  resetFilters: () => void;
  setSearchQuery: (query: string) => void;
  setSelectedPreset: (preset: string) => void;
};

const useFilterStore = create<FilterStore>((set) => ({
  filters: {},
  tempFilters: {},
  searchQuery: "",
  selectedPreset: "All time", 
  setTempFilter: (key, value) =>
    set((state) => ({ tempFilters: { ...state.tempFilters, [key]: value } })),
  applyFilters: () => set((state) => ({ filters: state.tempFilters })),
  resetFilters: () =>
    set({ filters: {}, tempFilters: {}, searchQuery: "" }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedPreset: (preset) => set({ selectedPreset: preset }),
}));

export default useFilterStore;