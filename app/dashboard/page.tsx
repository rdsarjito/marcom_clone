"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

import FilterOption from "./components/filters/filterOption/filterOption";
import FilterDate from "./components/filters/filterDate/filterDate";
import MateriTabel from "./components/table/MateriTable";
import { Switch } from "@/components/ui/switch";
import StatsSection from "./components/stats/statsSection";

export default function Page() {
  const [onlyVisualDocs, setOnlyVisualDocs] = useState(false);
  const [showStatsSection, setShowStatsSection] = useState(true);

  return (
    <main className="min-h-screen w-full max-w-full">
      <FilterDate />

      {showStatsSection && <StatsSection />}

      <div className="flex flex-col sm:flex-row justify-between items-center px-4 py-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="toggle-visual-docs"
            checked={onlyVisualDocs}
            onCheckedChange={setOnlyVisualDocs}
          />
          <label
            htmlFor="toggle-visual-docs"
            className="text-sm font-medium text-gray-900"
          >
            Lihat data yang ada dokumen visual saja
          </label>
        </div>
        <button
          onClick={() => setShowStatsSection((prev) => !prev)}
          className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900"
        >
          {showStatsSection ? "Sembunyikan Detail Summary" : "Lihat Detail Summary"}
          {showStatsSection ? (
            <ChevronUp className="ml-1 h-4 w-4" />
          ) : (
            <ChevronDown className="ml-1 h-4 w-4" />
          )}
        </button>
      </div>

      <section>
        <FilterOption />
        <MateriTabel />
      </section>
    </main>
  );
}
