import { useMemo } from "react";
import useMateriStore from "../store/useMateriStore";
import useFilterStore from "../store/useFilterStore";

export default function useFilteredMateri() {
  const { data } = useMateriStore();
  const { filters, searchQuery } = useFilterStore();

  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const { startDate, endDate } = filters;
    
      const itemStartDate = item.startDate ? new Date(item.startDate) : null;
      const itemEndDate = item.endDate ? new Date(item.endDate) : null;
      
      const filterStartDate = startDate ? new Date(startDate) : null;
      const filterEndDate = endDate ? new Date(endDate) : null;
    
      const isInRange =
        (!filterStartDate || (itemEndDate && itemEndDate >= filterStartDate)) &&
        (!filterEndDate || (itemStartDate && itemStartDate <= filterEndDate));
    
      const matchesFilters = Object.entries(filters).every(
        ([key, value]) =>
          key === "startDate" ||
          key === "endDate" ||
          !value ||
          item[key as keyof typeof item] === value
      );
    
      const matchesSearch = item.namaMateri
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    
      return isInRange && matchesFilters && matchesSearch;
    });
  }, [data, filters, searchQuery]);

  return filteredData;
}
