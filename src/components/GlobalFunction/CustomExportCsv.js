import { downloadCSV, fetchUtils } from "react-admin";
import jsonExport from "jsonexport/dist";
import { stringify } from "query-string";
import apiUrl from "../../config";

function generateDateString() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const dd = String(now.getDate()).padStart(2, "0");
  const hh = String(now.getHours()).padStart(2, "0");
  const min = String(now.getMinutes()).padStart(2, "0");
  const ss = String(now.getSeconds()).padStart(2, "0");

  return `${yyyy}${mm}${dd}_${hh}${min}${ss}`;
}

function processData(input) {
  const lines = input.split("\n");
  const processedLines = lines.map((line) => {
    return line
      .replace(/,/g, ";")
      .replace(/(\d+)\.(\d+)/g, "$1,$2")
      .replace(/(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2})\.\d{3}Z/g, "$1 $2")
      .replace(/(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2})Z/g, "$1 $2")
      .replace(/(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2})/g, "$1 $2")
      .replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}:\d{2}:\d{2})/, "$3/$2/$1 $4")
      .replace(/,000Z/g, "");
  });
  return processedLines.join("\n");
}

export const createExporter = (resourceName, filename, headers = []) => {
  return async (filterValues = {}) => {
    // Double-check we have an object
    const effectiveFilters =
      typeof filterValues === "function" ? {} : filterValues;

    console.log("Final filters being sent:", effectiveFilters);

    const query = {
      filter: JSON.stringify(effectiveFilters),
      range: JSON.stringify([0, 50000]),
      sort: JSON.stringify(["id", "ASC"]),
    };

    const url = `${apiUrl}/${resourceName}?${stringify(query)}`;
    console.log("Request URL:", url);

    try {
      const { json: data } = await fetchUtils.fetchJson(url, {
        headers: new Headers({ Accept: "application/json" }),
      });

      jsonExport(
        data,
        {
          headers:
            Array.isArray(headers) && headers.length > 0 ? headers : undefined,
          delimiter: ";",
        },
        (err, csv) => {
          if (err) {
            console.error("CSV export error:", err);
            return;
          }
          const processedCsv = processData(csv);
          downloadCSV(processedCsv, `${filename}_${generateDateString()}`);
        }
      );
    } catch (error) {
      console.error("Fetch error during export:", error);
    }
  };
};
