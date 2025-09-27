import { subMonths, subYears, startOfYear, differenceInDays, parseISO } from "date-fns";

export interface NavPoint {
  date: string;
  nav: number;
}

export interface SeriesPoint {
  date: string;
  value: number; // rebased
  dd: number;    // drawdown
}

// Find closest NAV to a date
function findClosest(data: NavPoint[], target: Date) {
  let closest = data[0];
  let minDiff = Math.abs(differenceInDays(parseISO(closest.date), target));
  for (const d of data) {
    const diff = Math.abs(differenceInDays(parseISO(d.date), target));
    if (diff < minDiff) {
      closest = d;
      minDiff = diff;
    }
  }
  return closest;
}

// Trailing returns
export function computeReturns(data: NavPoint[]) {
  if (!data.length) return {};

  const sorted = [...data].sort((a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime());
  const latest = sorted[sorted.length - 1];
  const start = sorted[0];
  const latestDate = parseISO(latest.date);

  return {
    "1M": ((latest.nav / findClosest(sorted, subMonths(latestDate, 1)).nav - 1) * 100),
    "3M": ((latest.nav / findClosest(sorted, subMonths(latestDate, 3)).nav - 1) * 100),
    "6M": ((latest.nav / findClosest(sorted, subMonths(latestDate, 6)).nav - 1) * 100),
    "1Y": ((latest.nav / findClosest(sorted, subYears(latestDate, 1)).nav - 1) * 100),
    YTD: ((latest.nav / findClosest(sorted, startOfYear(latestDate)).nav - 1) * 100),
    SI: ((latest.nav / start.nav - 1) * 100),
  };
}

// Compute drawdowns
export function computeDrawdowns(data: NavPoint[]) {
  const sorted = [...data].sort((a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime());
  let peak = -Infinity;
  const series = sorted.map((d) => {
    peak = Math.max(peak, d.nav);
    const dd = ((d.nav - peak) / peak) * 100;
    return { ...d, dd };
  });
  const maxDD = Math.min(...series.map((s) => s.dd));
  const latestDD = series[series.length - 1].dd;
  return { series, DD: latestDD, MaxDD: maxDD };
}

// Rebase NAV for equity curve
export function prepareSeries(data: NavPoint[]): SeriesPoint[] {
  if (!data.length) return [];
  const base = data[0].nav;
  let peak = base;
  return data.map((d) => {
    peak = Math.max(peak, d.nav);
    return {
      date: d.date,
      value: (d.nav / base) * 100,
      dd: ((d.nav - peak) / peak) * 100,
    };
  });
}
