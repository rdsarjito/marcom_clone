import React from "react";
import { Layers, Package, Zap, Clock, FileText } from "lucide-react";
import { useStatsData } from "@/hooks/useStatsData";
import StatsCard from "@/app/dashboard/uiRama/statsCard";

const StatsSection = () => {
  const {
    selectedPreset,
    waktuLabel,
    stats: { total, fitur, aktif, expired, dokumen },
  } = useStatsData();

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 px-4">
      <StatsCard
        title="Jumlah Fitur"
        value={fitur.now.toString()}
        change={fitur.changeLabel}
        subtext={waktuLabel}
        selectedPreset={selectedPreset}
        icon={<Layers size={16} />}
      />
      <StatsCard
        title="Materi Komunikasi"
        value={total.now.toString()}
        change={total.changeLabel}
        subtext={waktuLabel}
        selectedPreset={selectedPreset}
        icon={<Package size={16} />}
      />
      <StatsCard
        title="Materi Aktif"
        value={aktif.now.toString()}
        change={aktif.changeLabel}
        subtext={waktuLabel}
        selectedPreset={selectedPreset}
        icon={<Zap size={16} />}
      />
      <StatsCard
        title="Materi Expired"
        value={expired.now.toString()}
        change={expired.changeLabel}
        subtext={waktuLabel}
        selectedPreset={selectedPreset}
        icon={<Clock size={16} />}
      />
      <StatsCard
        title="Jumlah Dokumen"
        value={dokumen.now.toString()}
        change={dokumen.changeLabel}
        subtext={waktuLabel}
        selectedPreset={selectedPreset}
        icon={<FileText size={16} />}
      />
    </section>
  );
};

export default StatsSection;
