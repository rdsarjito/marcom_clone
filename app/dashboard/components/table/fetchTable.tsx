import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Image from "next/image";


interface ReusableTableProps {
  title: string; 
  data: any[]; 
}

const MateriTable: React.FC<ReusableTableProps> = ({ title, data }) => {
  return (
    <div>
        <h2 className="text-2xl font-bold mb-6">Daftar Materi Komunikasi</h2>
        <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Brand</TableHead>
            <TableHead>Cluster</TableHead>
            <TableHead>Fitur</TableHead>    
            <TableHead>Materi Komunikasi</TableHead>
            <TableHead>Dokumen</TableHead>
            <TableHead>Tipe</TableHead>
            <TableCell>Status</TableCell>
            <TableHead>Jenis</TableHead>
            <TableHead>Periode</TableHead>
            <TableHead>Keywords</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((materi) => (
            <TableRow key={materi._id}>
                <TableCell>{materi.brand}</TableCell>
                <TableCell>{materi.cluster}</TableCell>
                <TableCell>{materi.fitur}</TableCell>
                <TableCell>{materi.namaMateri}</TableCell>
                <TableCell>
                    <div className="flex items-center gap-2">
                        <Image
                        src={`http://localhost:5000/${materi.thumbnail}`}
                        alt={materi.namaMateri}
                        width={50} // Ukuran lebih kecil agar proporsional
                        height={50}
                        unoptimized={true}
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
                <TableCell>
                    {(() => {
                        const today = new Date();
                        const start = new Date(materi.startDate);
                        const end = new Date(materi.endDate);

                        return today >= start && today <= end ? (
                        <span className="text-green-500 font-semibold">Aktif</span>
                        ) : (
                        <span className="text-red-500 font-semibold">Tidak Aktif</span>
                        );
                    })()}
                    </TableCell>
                <TableCell>{materi.jenis}</TableCell>
                <TableCell>{materi.periode}</TableCell>
                <TableCell>{materi.keywords.join(", ")}</TableCell>
                <TableCell>

                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
      
  );
}

export default MateriTable;