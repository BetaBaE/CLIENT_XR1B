import {
  Datagrid,
  DateField,
  List,
  NumberField,
  TextField,
  useListContext,
} from "react-admin";
import LogTvaFilter from "./TvaLogFilter";
import { createExporter } from "../GlobalFunction/CustomExportCsv";

export const TvalogList = () => {
  // Define your filename here
  const resource = "gettvalog";
  const fileName = "Log Tva";
  let activeExporter;

  const ExporterBridge = () => {
    const { filterValues } = useListContext();
    activeExporter = async () => {
      const exportFunction = createExporter(resource, fileName);
      return exportFunction(filterValues);
    };
    return null; // invisible
  };
  return (
    <List
      exporter={(data, fetchRelated, ctx) => activeExporter?.()}
      filters={<LogTvaFilter />}
      title="Log Tva"
    >
      <ExporterBridge />{" "}
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
