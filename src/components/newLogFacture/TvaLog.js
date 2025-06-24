import { Datagrid, DateField, List, NumberField, TextField } from "react-admin";
import LogTvaFilter from "./TvaLogFilter";
import { createExporter } from "../GlobalFunction/CustomExportCsv";

export const TvalogList = () => {
  // Define your filename here
  const resource = "gettvalog";
  const fileName = "Log Tva";
  const exporter = createExporter(resource, fileName); // Create the exporter with the filename and headers

  return (
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
};
