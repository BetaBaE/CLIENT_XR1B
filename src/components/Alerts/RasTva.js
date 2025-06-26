import {
  Datagrid,
  DateField,
  InfiniteList,
  NumberField,
  TextField,
  useListContext,
} from "react-admin";
import RasTvaFilter from "./RasTvaFilter";
import { createExporter } from "../GlobalFunction/CustomExportCsv";

export const RastvaList = () => {
  const resource = "rastva";
  const fileName = "Ras TVA";

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
      filters={<RasTvaFilter />}
    >
      <ExporterBridge />
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
