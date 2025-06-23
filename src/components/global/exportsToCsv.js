import jsonExport from "jsonexport/dist";
import { downloadCSV } from "react-admin";
/**
 * Dynamic exporter for React Admin
 * @param {Array} records - Currently displayed records (ignored when fetchAll=true)
 * @param {Function} fetchRelatedRecords - React Admin function
 * @param {Object} dataProvider - React Admin data provider
 * @param {Object} options - Configuration options
 * @param {string} options.resource - API resource name (e.g., 'ordervirement')
 * @param {boolean} [options.fetchAll=true] - Whether to fetch all records or use current page
 * @param {Array} [options.headers] - Custom CSV headers configuration
 * @param {Function} [options.transform] - Function to transform data before export
 * @param {string} [options.filename] - Custom filename for the export
 * @param {Object} [options.filter] - Additional filters to apply
 */
export const exporter = async (
  records,
  fetchRelatedRecords,
  dataProvider,
  options = {}
) => {
  const {
    resource,
    fetchAll = true,
    headers,
    transform,
    filename,
    filter = {},
  } = options;

  if (!resource) {
    throw new Error("Resource name is required in exporter options");
  }

  // Get the data to export
  let dataToExport;

  if (fetchAll) {
    // Fetch all records from the API
    const { data } = await dataProvider.getList(resource, {
      pagination: { page: 1, perPage: 1000000 }, // High value to get all records
      sort: { field: "id", order: "ASC" },
      filter,
    });
    dataToExport = data;
  } else {
    // Use the currently displayed records
    dataToExport = records;
  }

  // Apply transformation if provided
  const finalData = transform ? transform(dataToExport) : dataToExport;

  // Determine headers
  const finalHeaders = headers || Object.keys(finalData[0] || {});

  // Generate filename if not provided
  const finalFilename =
    filename || `${resource}_export_${new Date().toISOString().slice(0, 10)}`;

  // Export to CSV
  jsonExport(finalData, { headers: finalHeaders }, (err, csv) => {
    if (err) {
      console.error("Export error:", err);
      return;
    }
    downloadCSV(csv, finalFilename);
  });
};
