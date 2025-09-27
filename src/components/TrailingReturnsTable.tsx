/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface TrailingReturnsTableProps {
  returns: Record<string, number>;
  drawdowns: { DD: number; MaxDD: number };
}

export default function TrailingReturnsTable({
  returns,
  drawdowns,
}: TrailingReturnsTableProps) {
  const columns = [
    { key: "1M", label: "1M" },
    { key: "3M", label: "3M" },
    { key: "6M", label: "6M" },
    { key: "1Y", label: "1Y" },
    { key: "YTD", label: "YTD" },
    { key: "SI", label: "SI" },
    { key: "DD", label: "Latest DD" },
    { key: "MaxDD", label: "Max DD" },
  ];

  // Create single row of values
  const row = {
    Name: "Portfolio",
    "1M": returns["1M"],
    "3M": returns["3M"],
    "6M": returns["6M"],
    "1Y": returns["1Y"],
    YTD: returns["YTD"],
    SI: returns["SI"],
    DD: drawdowns.DD,
    MaxDD: drawdowns.MaxDD,
  };

  return (
    <div className="rounded-lg border shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="font-semibold text-gray-600">Name</TableHead>
            {columns.map((col) => (
              <TableHead
                key={col.key}
                className="text-right font-semibold text-gray-600"
              >
                {col.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="bg-white hover:bg-gray-50/70">
            <TableCell className="font-medium">{row.Name}</TableCell>
            {columns.map((col) => {
              const value = row[col.key as keyof typeof row] as any;
              const isDD = col.key === "DD" || col.key === "MaxDD";
              return (
                <TableCell key={col.key} className="text-right">
                  <span
                    className={
                      isDD
                        ? "text-pink-600 font-medium"
                        : value >= 0
                        ? "text-green-600 font-medium"
                        : "text-red-600 font-medium"
                    }
                  >
                    {value?.toFixed(2)}%
                  </span>
                </TableCell>
              );
            })}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
