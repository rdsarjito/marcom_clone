"use client";

import { useState } from "react";
import useFilterStore from "../store/filterStore"; // Sesuaikan path jika perlu
import ReusableTable from "./reusableTable";

const data = [
  {
    brand: 'BRImo',
    cluster: 'Bayar-Bayar Harian',
    fitur: 'Donasi',
    materi: 'Launch fitur donasi',
    materiLink: '#',
    dokumen: 'Lihat Materi',
    tipe: 'Key Visual',
    status: 'Aktif',
    jenis: 'Tactical',
    periode: '2025-02-12 - 2025-03-12',
    keyword: 'Donasi, Emas, QRIS'
  },
  {
    brand: 'BRImo',
    cluster: 'Bayar-Bayar Harian',
    fitur: 'Donasi',
    materi: 'Promo belanja harian cashback 50%',
    materiLink: '#',
    dokumen: 'Lihat Materi',
    tipe: 'Key Visual',
    status: 'Aktif',
    jenis: 'Tematik',
    periode: '2023-07-12 - 2025-07-12',
    keyword: 'Donasi, Cashback, QRIS'
  },
  {
    brand: 'BRImo',
    cluster: 'Bayar-Bayar Harian',
    fitur: 'QRIS Source CC',
    materi: 'Video Iklan Youtube QRIS Source CC',
    materiLink: '#',
    dokumen: 'Lihat Materi',
    tipe: 'Video',
    status: 'Expired',
    jenis: 'Tactical',
    periode: '2023-07-12 - 2024-07-12',
    keyword: 'QRIS, Kartu Kredit, Promo'
  },
  {
    brand: 'BRImo',
    cluster: 'Bayar-Bayar Harian',
    fitur: 'Donasi',
    materi: 'Promo belanja 2/2 cashback 50%',
    materiLink: '#',
    dokumen: 'Lihat Materi',
    tipe: 'Key Visual',
    status: 'Aktif',
    jenis: 'Tematik',
    periode: '2023-07-12 - 2025-07-12',
    keyword: 'Donasi, Cashback, QRIS'
  },
  {
    brand: 'BRImo',
    cluster: 'Bayar-Bayar Harian',
    fitur: 'Donasi',
    materi: 'Promo Kartu Kredit BRI',
    materiLink: '#',
    dokumen: 'Lihat Materi',
    tipe: 'Key Visual',
    status: 'Aktif',
    jenis: 'Tematik',
    periode: '2023-07-12 - 2025-07-12',
    keyword: 'Kartu Kredit, Cashback, QRIS'
  }
];

const columns = [
  { header: "Brand", accessor: "brand" },
  { header: "Cluster", accessor: "cluster" },
  { header: "Fitur", accessor: "fitur" },
  { header: "Materi Komunikasi", accessor: "materi", isLink: true },
  { header: "Dokumen", accessor: "dokumen", isLink: true },
  { header: "Tipe Materi", accessor: "tipe" },
  { header: "Status", accessor: "status" },
  { header: "Jenis", accessor: "jenis" },
  { header: "Periode", accessor: "periode" },
  { header: "Keyword", accessor: "keyword" }
];

export default function CommunicationTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { filters, searchQuery } = useFilterStore();

  const filteredData = data.filter((item) => {
    const { startDate, endDate } = filters;
  
    if (!startDate || !endDate) return true;
  
    const [itemStart, itemEnd] = item.periode.split(" - ");
    const itemStartDate = new Date(itemStart);
    const itemEndDate = new Date(itemEnd);
  
    const filterStartDate = new Date(startDate);
    const filterEndDate = new Date(endDate);
  
    const isInRange =
      itemStartDate <= filterEndDate && itemEndDate >= filterStartDate;
  
    return isInRange;
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