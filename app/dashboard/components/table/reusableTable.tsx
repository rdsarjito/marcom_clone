"use client";

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"; // Sesuaikan path jika perlu
import Link from "next/link";

interface Column {
  header: string;
  accessor: string;
  isLink?: boolean;
}

interface ReusableTableProps {
  title: string;
  columns: Column[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
}

const ReusableTable: React.FC<ReusableTableProps> = ({
  title,
  columns,
  data,
}) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">{title}</h2>

      <div className="overflow-x-auto mt-4">
        <Table className="table-auto w-full border-collapse">
          <TableHeader className="bg-gray-100">
            <TableRow>
              {columns.map((col, idx) => (
                <TableHead key={idx}>{col.header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <TableRow key={index} className="border-b">
                  {columns.map((col, colIndex) => (
                    <TableCell key={colIndex}>
                      {col.isLink ? (
                        <Link
                          href={item[col.accessor]}
                          className="text-blue-600 hover:underline"
                        >
                          {item[col.accessor]}
                        </Link>
                      ) : (
                        item[col.accessor]
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center py-4"
                >
                  Tidak ada data yang cocok dengan filter
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ReusableTable;
