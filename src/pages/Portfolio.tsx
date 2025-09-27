/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import TrailingReturnsTable from "@/components/TrailingReturnsTable";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  AreaChart,
  Area,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { readExcelFromUrl } from "@/utils/excelReader";
import { computeReturns, computeDrawdowns, prepareSeries } from "@/utils/navCalculations";

export default function Portfolio() {
  const [series, setSeries] = useState<any[]>([]);
  const [returns, setReturns] = useState<any>(null);
  const [drawdowns, setDrawdowns] = useState<any>(null);

  useEffect(() => {
    (async () => {
     const data = await readExcelFromUrl("/data/quant_active_nav.xlsx");

    const seriesData = prepareSeries(data);   // for equity + drawdown charts
    const returnsData = computeReturns(data); // for KPI cards
    const drawdownsData = computeDrawdowns(data); // for DD cards


     setSeries(seriesData);
    setReturns(returnsData);
    setDrawdowns(drawdownsData);
    })();
  }, []);

  if (!returns || !drawdowns) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="text-sm text-muted-foreground">Loading portfolio data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header Section */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Portfolio Dashboard</h1>
        <p className="text-muted-foreground">
          Track your portfolio performance and key metrics
        </p>
      </div>

      <Separator />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              1M Return
            </CardTitle>
            <Badge variant={returns["1M"] >= 0 ? "default" : "destructive"} className="text-xs">
              1M
            </Badge>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${
              returns["1M"] >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
            }`}>
              {returns["1M"].toFixed(2)}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Monthly performance
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              YTD Return
            </CardTitle>
            <Badge variant={returns["YTD"] >= 0 ? "default" : "destructive"} className="text-xs">
              YTD
            </Badge>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${
              returns["YTD"] >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
            }`}>
              {returns["YTD"].toFixed(2)}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Year to date
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Current Drawdown
            </CardTitle>
            <Badge variant="outline" className="text-xs">
              DD
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
              {drawdowns.DD.toFixed(2)}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Current peak decline
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Max Drawdown
            </CardTitle>
            <Badge variant="outline" className="text-xs">
              MAX
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
              {drawdowns.MaxDD.toFixed(2)}%
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Worst decline period
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Trailing Returns Table */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold">Trailing Returns</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Returns above 1 year are annualised
              </p>
            </div>
            <Badge variant="secondary">Performance</Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <TrailingReturnsTable returns={returns} drawdowns={drawdowns} />
        </CardContent>
      </Card>

      {/* Charts Section */}
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold">Equity Curve</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Portfolio performance over time with drawdown visualization
              </p>
            </div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <span>From: {series.length > 0 ? new Date(series[0].date).toLocaleDateString() : "—"}</span>
              <Separator orientation="vertical" className="h-4" />
              <span>To: {series.length > 0 ? new Date(series[series.length - 1].date).toLocaleDateString() : "—"}</span>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-6">
          <div className="space-y-8">
            {/* Equity Curve Chart */}
            <div>
              <div className="mb-4">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Portfolio Growth</h3>
              </div>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={series} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid 
                      stroke="hsl(var(--border))" 
                      strokeDasharray="2 2" 
                      opacity={0.5}
                    />
                    <XAxis
                      dataKey="date"
                      tickFormatter={(d) => new Date(d).toLocaleDateString('en-US', { 
                        month: 'short', 
                        year: '2-digit' 
                      })}
                      tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                      axisLine={{ stroke: 'hsl(var(--border))' }}
                      tickLine={{ stroke: 'hsl(var(--border))' }}
                    />
                    <YAxis
                      tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                      axisLine={{ stroke: 'hsl(var(--border))' }}
                      tickLine={{ stroke: 'hsl(var(--border))' }}
                      tickFormatter={(v) => v.toLocaleString()}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--background))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                      }}
                      labelStyle={{ color: 'hsl(var(--foreground))' }}
                      formatter={(value: any, name: string) => [
                        `${value.toLocaleString()}`,
                        name
                      ]}
                      labelFormatter={(d) => new Date(d).toLocaleDateString()}
                    />
                    <Legend 
                      wrapperStyle={{ paddingTop: '20px' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#22c55e"
                      strokeWidth={2.5}
                      dot={false}
                      name="Portfolio Value"
                      activeDot={{ 
                        r: 4, 
                        fill: '#22c55e',
                        stroke: 'hsl(var(--background))',
                        strokeWidth: 2
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <Separator />

            {/* Drawdown Chart */}
            <div>
              <div className="mb-4">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Drawdown Analysis</h3>
                <p className="text-xs text-muted-foreground">Peak-to-trough decline periods</p>
              </div>
              <div className="h-32 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={series} margin={{ top: 10, right: 30, left: 20, bottom: 20 }}>
                  <defs>
                </defs>
                    <CartesianGrid 
                      stroke="hsl(var(--border))" 
                      strokeDasharray="2 2" 
                      opacity={0.3}
                    />
                    <XAxis
                      dataKey="date"
                      tickFormatter={(d) => new Date(d).toLocaleDateString('en-US', { 
                        month: 'short', 
                        year: '2-digit' 
                      })}
                      tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                      axisLine={{ stroke: 'hsl(var(--border))' }}
                      tickLine={{ stroke: 'hsl(var(--border))' }}
                    />
                    <YAxis
                      domain={[-50, 0]}
                      tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
                      axisLine={{ stroke: 'hsl(var(--border))' }}
                      tickLine={{ stroke: 'hsl(var(--border))' }}
                      tickFormatter={(v) => `${Math.abs(v)}%`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'hsl(var(--background))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                      }}
                      labelStyle={{ color: 'hsl(var(--foreground))' }}
                      formatter={(value: any) => [`${Math.abs(value).toFixed(2)}%`, "Drawdown"]}
                      labelFormatter={(d) => new Date(d).toLocaleDateString()}
                    />

                    <Area
                      type="monotone"
                      dataKey="dd"
                       stroke="#ef4444" 
                      fill="#ef4444" 
                      fillOpacity={0.2}
                      name="Drawdown %"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </CardContent>
        
      </Card>
    </div>
  );
}