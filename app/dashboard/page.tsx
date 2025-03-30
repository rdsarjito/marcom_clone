"use client"

import { useState } from "react"; // Import useState

import FilterOption from "./components/filters/filterOption/FilterOption";
import FilterDate from "./components/filters/filterDate/FilterDate";
import MateriTabel from "./components/table/MateriTable";
import { Switch } from "@/components/ui/switch";
import StatsSection from "./components/stats/StatsSection";

export default function Page() {
  const [onlyVisualDocs, setOnlyVisualDocs] = useState(false); // Tambahkan state

  return (
    <main className="min-h-screen">
      {/* Filter tanggal */}
      <section className="pt-4 pr-4 pl-4">
        <FilterDate />
      </section>

      {/* Kartu statistik */}
      <StatsSection />
      <div className="pr-4 pb-4 pl-4 flex items-center space-x-2">
          <Switch
            id="toggle-visual-docs"
            checked={onlyVisualDocs}
            onCheckedChange={setOnlyVisualDocs} // Mengubah state saat toggle
          />
          <label htmlFor="toggle-visual-docs" className="text-sm text-gray-700">
            Lihat data yang ada dokumen visual saja
          </label>
        </div>

      {/* Filter tambahan dan tabel data */}
      <section>
        <FilterOption />
        <MateriTabel />
      </section>
    </main>
  );
}
