import {
  Datagrid,
  DateField,
  List,
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
    return null;
  };

  return (
    <List
      sort={{ field: "DateOperation", order: "DESC" }}
      perPage={25}
      exporter={() => activeExporter?.()}
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
        <DateField source="dateFactue" label="Date Facture" />
        <DateField source="DateOperation" label="Date Operation" />
        <NumberField source="HT" label="HT" />
        <TextField source="Pourcentage TVA" label="Pourcentage TVA" />
        <NumberField source="TauxTva" label="TauxTva" />
        <TextField source="Pourcentage Ras" label="Pourcentage Ras" />
        <NumberField source="RaS" label="RaS" />
      </Datagrid>
    </List>
  );
};
