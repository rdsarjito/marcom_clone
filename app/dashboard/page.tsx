import "../globals.css";

import { Card, CardContent } from "@/components/ui/card";
import { Box } from "lucide-react";

const stats = [
  {
    title: "Jumlah Fitur",
    value: "101",
    change: "+1 dari bulan lalu",
    icon: <Box className="w-5 h-5 text-gray-500" />,
  },
  {
    title: "Materi Komunikasi",
    value: "141",
    change: "+1 dari bulan lalu",
    icon: <Box className="w-5 h-5 text-gray-500" />,
  },
  {
    title: "Materi Aktif",
    value: "131",
    change: "+1 dari bulan lalu",
    icon: <Box className="w-5 h-5 text-gray-500" />,
  },
  {
    title: "Jumlah Dokumen",
    value: "200",
    change: "+1 dari bulan lalu",
    icon: <Box className="w-5 h-5 text-gray-500" />,
  },
];

export default function DashboardStatistics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="p-0 pt-3 shadow-sm border rounded-lg">
          <CardContent className="flex flex-col space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-sm truncate font-semibold">{stat.title}</span>
              {stat.icon}
            </div>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold">{stat.value}</span>
              <span className="text-sm text-gray-400">{stat.change}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
