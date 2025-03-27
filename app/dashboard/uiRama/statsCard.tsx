import { Box } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type StatsCardProps = {
  title: string;
  value: string;
  change: string;
};

const StatsCard = ({ title, value, change }: StatsCardProps) => (
  <Card className="p-0 pt-3 shadow-sm border rounded-lg">
    <CardContent className="flex flex-col space-y-6">
      <div className="flex justify-between items-center">
        <span className="text-sm font-semibold truncate">{title}</span>
        <Box className="w-5 h-5 text-gray-500" aria-hidden="true" />
      </div>
      <div className="flex justify-between items-center">
        <span className="text-2xl font-bold">{value}</span>
        <span className="text-sm text-gray-400">{change}</span>
      </div>
    </CardContent>
  </Card>
);

export default StatsCard;
