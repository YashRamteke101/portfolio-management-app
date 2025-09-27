
import * as XLSX from "xlsx";

/**
 * Reads Excel NAV data and returns [{ date: YYYY-MM-DD, nav: number }]
 */
export async function readExcelFromUrl(url: string): Promise<{ date: string; nav: number }[]> {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, { type: "array" });

  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const rows: any[][] = XLSX.utils.sheet_to_json(sheet, { header: 1, raw: true });

  const headerRowIndex = rows.findIndex(
    (row) => row[0] === "NAV Date" && row[1] === "NAV (Rs)"
  );
  if (headerRowIndex === -1) throw new Error("Could not find header row");

  const dataRows = rows.slice(headerRowIndex + 1);

  const data: { date: string; nav: number }[] = [];

  for (const row of dataRows) {
    if (!row[0] || !row[1]) continue;

    let jsDate: Date | null = null;

    if (typeof row[0] === "number") {
      const d = XLSX.SSF.parse_date_code(row[0]);
      if (d) jsDate = new Date(d.y, d.m - 1, d.d);
    } else if (typeof row[0] === "string") {
      const parsed = new Date(row[0]);
      if (!isNaN(parsed.getTime())) jsDate = parsed;
    }

    if (!jsDate) continue;

    const nav = parseFloat(row[1]);
    if (isNaN(nav)) continue;

    data.push({ date: jsDate.toISOString().slice(0, 10), nav });
  }

  return data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}
