import * as React from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

const materials = [
  {
    document: "Lihat Materi",
    title: "Launch fitur donasi",
    feature: "Donasi",
    cluster: "Bayar-Bayar Harian",
    type: "Key Visual",
    status: "Aktif",
    brand: "BRImo",
    period: "2023-07-12 - 2025-07-12",
    keywords: "Donasi, Donasi emas, emas batangan",
    imageUrl: "https://via.placeholder.com/100",
  },
];

export default function MaterialTable() {
    return (
        <ScrollArea className="w-full overflow-x-auto rounded-md border">
        <div className="w-[800px]">
          <table className="min-w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr>
                <th className="border-b px-4 py-2">Dokumen</th>
                <th className="border-b px-4 py-2">Materi Komunikasi</th>
                <th className="border-b px-4 py-2">Fitur</th>
                <th className="border-b px-4 py-2">Cluster</th>
                <th className="border-b px-4 py-2">Tipe Materi</th>
                <th className="border-b px-4 py-2">Status</th>
                <th className="border-b px-4 py-2">Brand</th>
                <th className="border-b px-4 py-2">Periode</th>
                <th className="border-b px-4 py-2">Keywords</th>
              </tr>
            </thead>
            <tbody>
              {materials.map((material, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-2 flex items-center">
                    <img
                      src={material.imageUrl}
                      alt={material.title}
                      className="w-12 h-12 rounded mr-2"
                    />
                    <a href="#" className="text-blue-600 underline">
                      {material.document}
                    </a>
                  </td>
                  <td className="px-4 py-2">{material.title}</td>
                  <td className="px-4 py-2">{material.feature}</td>
                  <td className="px-4 py-2">{material.cluster}</td>
                  <td className="px-4 py-2">{material.type}</td>
                  <td className="px-4 py-2">
                    <Badge variant="default">{material.status}</Badge>
                  </td>
                  <td className="px-4 py-2">{material.brand}</td>
                  <td className="px-4 py-2">{material.period}</td>
                  <td className="px-4 py-2">{material.keywords}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    );
  }
