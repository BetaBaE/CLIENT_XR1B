import {
  Datagrid,
  DateField,
  List,
  NumberField,
  TextField,
  downloadCSV,
} from "react-admin";
import LogTvaFilter from "./TvaLogFilter";
import jsonExport from "jsonexport/dist";

const exporter = (records) => {
  const recordsForExport = records.map((record) => {
    const { backlinks, author, ...recordForExport } = record; // omit any unwanted fields
    // Format the numeric fields
    recordForExport.TOTHTNET = record.TOTHTNET
      ? record.TOTHTNET.toFixed(2).replace(",", ".")
      : "0.00";
    recordForExport.TOTTVANET = record.TOTTVANET
      ? record.TOTTVANET.toFixed(2).replace(",", ".")
      : "0.00";
    recordForExport.TOTALTTC = record.TOTALTTC
      ? record.TOTALTTC.toFixed(2).replace(",", ".")
      : "0.00";
    recordForExport.Ras = record.Ras
      ? record.Ras.toFixed(2).replace(",", ".")
      : "0.00";
    return recordForExport;
  });

  jsonExport(
    recordsForExport,
    {
      headers: [
        "CODECHT",
        "nom",
        "CODEDOCUTIL",
        "DateDouc",
        "TOTHTNET",
        "TOTTVANET",
        "TOTALTTC",
        "modepaiement",
        "RefPay",
        "DateOperation",
        "Ras",
        "NETAPAYER",
        "typeDoc",
      ], // order fields in the export
      delimiter: ";", // Set the delimiter to semicolon
    },
    (err, csv) => {
      if (err) {
        console.error("Error exporting CSV:", err);
        return;
      }
      downloadCSV(csv, "log_tva"); // download as 'log_tva.csv' file
    }
  );
};

export const TvalogList = () => (
  <List exporter={exporter} filters={<LogTvaFilter />} title="Log Tva">
    <Datagrid bulkActionButtons={false}>
      <TextField source="CODECHT" label="chantier" />
      <TextField source="nom" label="fournisseur" />
      <TextField source="CODEDOCUTIL" label="Code Doc" />
      <DateField source="DateDouc" label="date Doc" />
      <NumberField source="TOTHTNET" label="HT" />
      <NumberField source="TOTTVANET" label="TVA" />
      <NumberField source="TOTALTTC" label="TTC" />
      <TextField source="modepaiement" />
      <TextField source="RefPay" />
      <DateField source="DateOperation" />
      <NumberField source="Ras" />
      <NumberField source="NETAPAYER" label="Net A Payer" />
      <TextField source="typeDoc" />
    </Datagrid>
  </List>
);
