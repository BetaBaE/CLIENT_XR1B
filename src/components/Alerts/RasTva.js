import {
  Datagrid,
  DateField,
  InfiniteList,
  NumberField,
  TextField,
} from "react-admin";
import RasTvaFilter from "./RasTvaFilter";
import { createExporter } from "../GlobalFunction/CustomExportCsv";

export const RastvaList = () => {
  const fileName = "log_tva";
  const headers = [
    "catFournisseur",
    "Identifiant fiscal",
    "ICE",
    "nom",
    "RefernceDOC",
    "CategorieFn",
    "dateFactue",
    "DateOperation",
    "HT",
    "Pourcentage TVA",
    "TauxTva",
    "Pourcentage Ras",
    "RaS",
  ];

  const exporter = createExporter(fileName, headers); // Create the exporter with the filename and headers
  return (
    <InfiniteList exporter={exporter} filters={<RasTvaFilter />}>
      <Datagrid bulkActionButtons={false}>
        <TextField source="catFournisseur" />
        <TextField source="Identifiant fiscal" />
        <TextField source="ICE" label="ICE" />
        <TextField source="nom" />
        <TextField source="RefernceDOC" label="Refernce Document" />
        <TextField source="CategorieFn" />
        <DateField source="dateFactue" />
        <DateField source="DateOperation" />
        <NumberField source="HT" label="HT" />
        <TextField source="Pourcentage TVA" label="Pourcentage TVA" />
        <NumberField source="TauxTva" label="TauxTva" />
        <TextField source="Pourcentage Ras" />
        <NumberField source="RaS" label="RaS" />
      </Datagrid>
    </InfiniteList>
  );
};
