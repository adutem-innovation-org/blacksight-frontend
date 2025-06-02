import * as XLSX from "xlsx";

type FormatType = "CSV" | "EXCEL";

type FormatterFunc<T> = (value: T, item?: any) => string | number | Date;

interface ExportOptionsCSV<T> {
  headerMap: Record<keyof T, string>;
  formatters?: Partial<Record<keyof T, FormatterFunc<any>>>;
  format: "CSV";
}

interface ExportOptionsExcel<T> {
  headerMap: Record<keyof T, string>;
  formatters?: Partial<Record<keyof T, FormatterFunc<any>>>;
  format: "EXCEL";
}

// Overloads
export function transformForExport<T>(
  data: T[],
  options: ExportOptionsCSV<T>
): Record<string, any>[];
export function transformForExport<T>(
  data: T[],
  options: ExportOptionsExcel<T>
): any[][];

// Implementation
export function transformForExport<T>(
  data: T[],
  options: ExportOptionsCSV<T> | ExportOptionsExcel<T>
): Record<string, any>[] | any[][] {
  const {
    headerMap,
    formatters = {} as Partial<Record<keyof T, FormatterFunc<any>>>,
    format,
  } = options;

  const keys = Object.keys(headerMap) as (keyof T)[];
  const header = keys.map((k) => headerMap[k]);

  const formattedData = data.map((item) => {
    const row = keys.map((key) => {
      const rawValue = item[key];
      const formatter = formatters[key];
      return formatter ? formatter(rawValue, item) : rawValue;
    });

    if (format === "CSV") {
      return keys.reduce((acc, key, idx) => {
        acc[headerMap[key]] = row[idx];
        return acc;
      }, {} as Record<string, any>);
    } else {
      return row;
    }
  });

  if (format === "CSV") {
    formattedData.unshift(
      keys.reduce((acc, key) => {
        acc[headerMap[key]] = headerMap[key];
        return acc;
      }, {} as Record<string, any>)
    );
  } else {
    formattedData.unshift(header);
  }

  return formattedData;
}

export function downloadCSV(data: Array<any>, filename: string) {
  const csvContent = data
    .map((item) => {
      return Object.values(item)
        .map((value) => {
          const stringValue = String(value).replace(/"/g, '""');
          return `"${stringValue}"`;
        })
        .join(",");
    })
    .join("\n");

  const csvBlob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
  const csvUrl = URL.createObjectURL(csvBlob);

  const link = document.createElement("a");
  link.href = csvUrl;
  link.download = filename + ".csv";
  link.click();

  URL.revokeObjectURL(csvUrl);
}

export function downloadExcel(data: Array<any[]>, filename: string) {
  // Convert the data to an Excel sheet
  const worksheet = XLSX.utils.aoa_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "data-sheet");

  // Generate and download the Excel file
  XLSX.writeFile(workbook, `${filename}.xlsx`);
}
