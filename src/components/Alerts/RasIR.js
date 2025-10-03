import {
  Datagrid,
  DateField,
  InfiniteList,
  NumberField,
  TextField,
  useListContext,
} from "react-admin";
import { createExporter } from "../GlobalFunction/CustomExportCsv";
import RasIRFilter from "./RasIRFilter";

export const RasIRList = () => {
  const resource = "rasir";
  const fileName = "Ras IR";

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
    <InfiniteList
      exporter={(data, fetchRelated, ctx) => activeExporter?.()}
      filters={<RasIRFilter />}
    >
      <ExporterBridge />
      <Datagrid bulkActionButtons={false}>
        <TextField source="catFournisseur" />
        <TextField source="Identifiant fiscal" />
        <TextField source="ICE" label="ICE" />
        <TextField source="nom" />
        <TextField source="NumDoc" label="N° Document" />
        {/* <TextField source="CategorieFn" /> */}
        <DateField source="dateFacture" label="Date Facture" />
        <DateField source="DateOperation" label="Date Operation" />
        <NumberField source="TOTHTNET" label="HT" />
        {/* <TextField source="Pourcentage TVA" label="Pourcentage TVA" />
        <NumberField source="TauxTva" label="Taux TVA" />
        <TextField source="Pourcentage Ras" /> */}
        <NumberField source="RASIR" label="Ras IR" />
      </Datagrid>
    </InfiniteList>
  );
};
