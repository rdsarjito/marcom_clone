import "../globals.css";
import { Box } from "lucide-react";

import FilterSection from "./components/filters/filterSection";
import FilterDate from "./components/filters/filterDate";
import { Card, CardContent } from "@/components/ui/card";
import CommunicationTable from "./components/table/communicationTable";
import FormBaru from "./components/formBaru";

/**
 * Data statistik dashboard.
 */
const stats = [
  { title: "Jumlah Fitur", value: "101", change: "+1 dari bulan lalu" },
  { title: "Materi Komunikasi", value: "141", change: "+1 dari bulan lalu" },
  { title: "Materi Aktif", value: "131", change: "+1 dari bulan lalu" },
  { title: "Materi Expired", value: "11", change: "+1 dari bulan lalu" },
  { title: "Jumlah Dokumen", value: "200", change: "+1 dari bulan lalu" },
].map((stat) => ({
  ...stat,
  icon: <Box className="w-5 h-5 text-gray-500" aria-hidden="true" />,
}));

/**
 * Halaman utama dashboard.
 */

export default function Page() {
  return (
    <main className="min-h-screen">
      {/* Filter tanggal */}
      <section className="p-4">
        <FilterDate />
      </section>

      {/* Kartu statistik */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 p-4">
        {stats.map(({ title, value, change, icon }, index) => (
          <Card key={index} className="p-0 pt-3 shadow-sm border rounded-lg">
            <CardContent className="flex flex-col space-y-6">
              {/* Judul dan ikon */}
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold truncate">{title}</span>
                {icon}
              </div>
              {/* Nilai dan perubahan */}
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold">{value}</span>
                <span className="text-sm text-gray-400">{change}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Filter tambahan dan tabel data */}
      <section>
        <FilterSection />
        <CommunicationTable />
        {/* <FormBaru /> */}
      </section>
    </main>
  );
}
