import {
  Datagrid,
  DateField,
  List,
  NumberField,
  TextField,
  useListContext,
} from "react-admin";
import VirmentFilter from "./VirmentFilter";
import { createExporter } from "../GlobalFunction/CustomExportCsv";

export const VirementList = () => {
  const resource = "virements";
  const fileName = "Virement";

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
      filters={<VirmentFilter />}
      title="Virement"
      exporter={(data, fetchRelated, ctx) => activeExporter?.()}
    >
      <ExporterBridge />
      <Datagrid rowClick="edit" bulkActionButtons={false}>
        <TextField source="orderVirementId" />
        <TextField source="nom" />
        <TextField source="rib" />
        <NumberField source="montantVirement" />
        <TextField source="Etat" />
        <DateField source="dateoperation" />
      </Datagrid>
    </List>
  );
};
