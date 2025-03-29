"use client";

import { useState, useEffect } from "react";
import useFilterStore from "../../../../store/useFilterStore";
import MateriTable from "./fetchTable";

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

export default function CommunicationTable() {
  const [data, setData] = useState<Materi[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:5000/api/materi");
        if (!response.ok) throw new Error("Gagal mengambil data");
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { filters, searchQuery } = useFilterStore();

  const filteredData = data.filter((item) => {
    const { startDate, endDate } = filters;
  
    // Parsing startDate & endDate dari API
    const itemStartDate = item.startDate ? new Date(item.startDate) : null;
    const itemEndDate = item.endDate ? new Date(item.endDate) : null;
    
    const filterStartDate = startDate ? new Date(startDate) : null;
    const filterEndDate = endDate ? new Date(endDate) : null;
  
    // Pastikan tanggal valid sebelum melakukan perbandingan
    const isInRange =
      (!filterStartDate || (itemEndDate && itemEndDate >= filterStartDate)) &&
      (!filterEndDate || (itemStartDate && itemStartDate <= filterEndDate));
  
    // Filter berdasarkan kondisi lain selain tanggal
    const matchesFilters = Object.entries(filters).every(
      ([key, value]) =>
        key === "startDate" ||
        key === "endDate" ||
        !value ||
        item[key as keyof typeof item] === value
    );
  
    // Filter berdasarkan pencarian
    const matchesSearch = item.namaMateri
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
  
    return isInRange && matchesFilters && matchesSearch;
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length);

  return (
    <div className="p-4">
      <MateriTable title="Daftar Materi" data={filteredData.slice(startIndex, endIndex)} />
      <p className="mt-4 text-sm text-gray-600">
        Showing {startIndex + 1}-{endIndex} of {filteredData.length} data
      </p>
    </div>
  );
}
