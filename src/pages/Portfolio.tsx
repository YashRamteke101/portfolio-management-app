import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { portfolioData, returnsData } from "../data/portfolioData";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function Portfolio() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Portfolio Performance</h1>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Trailing Returns</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="text-right">YTD</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {returnsData.map(row => (
                <TableRow key={row.name}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell className="text-right">{row.ytd}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Equity Curve</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={portfolioData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="focused" stroke="#10b981" />
                <Line type="monotone" dataKey="nifty50" stroke="#3b82f6" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
