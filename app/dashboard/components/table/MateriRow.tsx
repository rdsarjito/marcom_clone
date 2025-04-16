import { TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import Image from "next/image";
import StatusBadge from "./StatusBadge";
import { getImageUrl } from "@/lib/utils";

import useMateriStore from "../../../../store/useMateriStore";

interface MateriRowProps {
  materi: any;
}

const MateriRow: React.FC<MateriRowProps> = ({ materi }) => {
  const highlightedId = useMateriStore((state) => state.highlightedId);
  return (
    <TableRow 
    key={materi._id}
    className={
      materi._id === highlightedId
        ? "bg-green-100 transition-colors duration-500"
        : ""
    }
    >
      <TableCell>{materi.brand}</TableCell>
      <TableCell>{materi.cluster}</TableCell>
      <TableCell>{materi.fitur}</TableCell>
      <TableCell>{materi.namaMateri}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Image
            src={getImageUrl(materi.thumbnail)}
            alt={materi.namaMateri}
            width={50}
            height={50}
            unoptimized
            className="w-12 h-12 object-cover rounded-md"
          />
          <Button variant="link" asChild className="text-blue-600 underline">
            <a href={materi.linkDokumen} target="_blank" rel="noopener noreferrer">
              Lihat Materi
            </a>
          </Button>
        </div>
      </TableCell>
      <TableCell>{materi.tipeMateri}</TableCell>
      <TableCell><StatusBadge startDate={materi.startDate} endDate={materi.endDate} /></TableCell>
      <TableCell>{materi.jenis}</TableCell>
      <TableCell>
        {format(new Date(materi.startDate), "yyyy-MM-dd")} - {format(new Date(materi.endDate), "yyyy-MM-dd")}
      </TableCell>
      <TableCell>{Array.isArray(materi.keywords) ? materi.keywords.join(", ") : "-"}</TableCell>
    </TableRow>
  );
};

export default MateriRow;
