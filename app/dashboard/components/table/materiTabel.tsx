"use client";

import { useEffect } from "react";
import useMateriStore from "../../../../store/useMateriStore";
import useFilterStore from "../../../../store/useFilterStore";
import ReusableTable from "./reusableTable";

export default function MateriTabel() {
  const { data, loading, currentPage, itemsPerPage, fetchData, setCurrentPage } = useMateriStore();
  const { filters, searchQuery } = useFilterStore();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredData = data.filter((item) => {
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

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length);

  return (
    <div className="p-4">
      <ReusableTable title="Daftar Materi" data={filteredData.slice(startIndex, endIndex)} />
      <p className="mt-4 text-sm text-gray-600">
        Showing {startIndex + 1}-{endIndex} of {filteredData.length} data
      </p>
    </div>
  );
}
