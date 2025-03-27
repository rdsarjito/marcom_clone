import StatsCard from "../../uiRama/statsCard";
import { statsData } from "../../data/statsData";

const StatsSection = () => (
  <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 p-4">
    {statsData.map((stat, index) => (
      <StatsCard key={index} {...stat} />
    ))}
  </section>
);

export default StatsSection;
