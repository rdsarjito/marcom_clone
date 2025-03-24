"use client";

import { useState } from "react";

import useFilterStore from "../../../../store/useFilterStore";
import { data, columns } from "../../data/communicationData";

import ReusableTable from "./reusableTable";

export default function CommunicationTable() {
  const [currentPage] = useState(1);
  const itemsPerPage = 10;
  const { filters, searchQuery } = useFilterStore();

  const filteredData = data.filter((item) => {
    const { startDate, endDate } = filters;

    const [itemStart, itemEnd] = item.periode.split(" - ");
    const itemStartDate = new Date(itemStart);
    const itemEndDate = new Date(itemEnd);
    const filterStartDate = startDate ? new Date(startDate) : null;
    const filterEndDate = endDate ? new Date(endDate) : null;

    const isInRange =
      (!filterStartDate || itemEndDate >= filterStartDate) &&
      (!filterEndDate || itemStartDate <= filterEndDate);

    const matchesFilters = Object.entries(filters).every(
      ([key, value]) =>
        key === "startDate" ||
        key === "endDate" ||
        !value ||
        item[key as keyof typeof item] === value,
    );

    const matchesSearch = item.materi
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return isInRange && matchesFilters && matchesSearch;
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length);

  return (
    <div className="p-4">
      <ReusableTable
        title="Daftar Materi Komunikasi"
        columns={columns}
        data={filteredData.slice(startIndex, endIndex)}
      />
    </div>
  );
}

