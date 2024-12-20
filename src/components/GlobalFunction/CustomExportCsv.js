import { downloadCSV } from "react-admin";
import jsonExport from "jsonexport/dist";

function generateDateString() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const dd = String(now.getDate()).padStart(2, "0");
  const hh = String(now.getHours()).padStart(2, "0");
  const min = String(now.getMinutes()).padStart(2, "0");
  const ss = String(now.getSeconds()).padStart(2, "0");

  return `${yyyy}${mm}${dd}_${hh}${min}${ss}`;
}
//2024-12-12T00:00:00.000Z
//A-9995;SAKHI SUPERBE DISTRIBUTION;1724/2;06/13/2024 00:00:00;360;72;432;paiement virement;OV304-26-09-2024;2024-10-01 00:00:00;0;432;Facture;14846;Reglee

function processData(input) {
  const lines = input.split("\n");
  const processedLines = lines.map((line) => {
    return line
      .replace(/,/g, ";") // Replace commas with semicolons
      .replace(/(\d+)\.(\d+)/g, "$1,$2") // Replace decimal points with commas
      .replace(/(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2})\.\d{3}Z/g, "$1 $2") // Format date without milliseconds
      .replace(/(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2})Z/g, "$1 $2") // Format date without milliseconds and Z
      .replace(/(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2})/g, "$1 $2") // Format date without Z
      .replace(/(\d{4})-(\d{2})-(\d{2}) (\d{2}:\d{2}:\d{2})/, "$3/$2/$1 $4") // Change to DD/MM/YYYY format
      .replace(/,000Z/g, ""); // Remove milliseconds and Z
  });
  return processedLines.join("\n");
}

export const createExporter = (fileName, headers) => {
  return (records) => {
    jsonExport(
      records,
      {
        headers: headers, // Use the provided headers
        delimiter: ";", // Set the delimiter to semicolon
      },
      (err, csv) => {
        if (err) {
          console.error("Error exporting CSV:", err);
          return;
        }
        // Process the data
        const result = processData(csv);
        console.log("csv", result);
        downloadCSV(result, `${fileName} ${generateDateString()}`); // download with the provided filename
      }
    );
  };
};
