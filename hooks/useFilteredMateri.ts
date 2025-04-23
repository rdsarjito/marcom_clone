import { useMemo } from "react";
import { useMateriStore } from "../store/useMateriStore";
import { useFilterStore } from "../store/useFilterStore";

export default function useFilteredMateri() {
  const { data } = useMateriStore();
  const { filters, searchQuery } = useFilterStore();

  const filteredData = useMemo(() => {
    const today = new Date();

    return data.filter((item) => {
      const { startDate, endDate, status } = filters;

      const itemStartDate = item.startDate ? new Date(item.startDate) : null;
      const itemEndDate = item.endDate ? new Date(item.endDate) : null;

      const filterStartDate = startDate ? new Date(startDate) : null;
      const filterEndDate = endDate ? new Date(endDate) : null;

      const isInRange =
        (!filterStartDate || (itemEndDate && itemEndDate >= filterStartDate)) &&
        (!filterEndDate || (itemStartDate && itemStartDate <= filterEndDate));

      const isStatusMatch =
        !status ||
        (status === "Aktif" && itemEndDate && itemEndDate >= today) ||
        (status === "Expired" && itemEndDate && itemEndDate < today);
        
      const matchesSearch = item.namaMateri
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      return isInRange && isStatusMatch && matchesSearch;
    });
  }, [data, filters, searchQuery]);

  return filteredData;
}
