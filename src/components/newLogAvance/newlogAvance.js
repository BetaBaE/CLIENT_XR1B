import {
  DatagridConfigurable,
  DateField,
  DateInput,
  ExportButton,
  FilterButton,
  List,
  NumberField,
  Pagination,
  SelectColumnsButton,
  TextField,
  TextInput,
  TopToolbar,
  useListContext,
} from "react-admin";
import FilterAvanceDetailList from "./FilterAvanceDetailList";
import { createExporter } from "../GlobalFunction/CustomExportCsv";

const FacturePagination = () => (
  <Pagination rowsPerPageOptions={[10, 25, 50, 100]} />
);
const newLogAvanceFilter = [
  <DateInput source="dateExercices" />,
  <TextInput source="codechantier" />,
  <TextInput source="nom" />,
  <TextInput source="BonCommande" />,
  <TextInput source="Fn" />,
  <TextInput source="Etat" />,
  <TextInput source="modepaiement" />,
  <TextInput source="RefPay" />,
  <DateInput source="DateOperation" />,
  <TextInput source="Bank" />,
];

const AvanceDetailsActions = () => (
  <TopToolbar>
    <FilterButton filters={newLogAvanceFilter} />
    <SelectColumnsButton />
    <ExportButton />
  </TopToolbar>
);

export const GetavancedetailList = () => {
  const currentYear = new Date().getFullYear();
  const defaultDateExercices = `${currentYear}-01-01`;
  const resource = "getavancedetails";
  const fileName = "Avance Log";
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
      pagination={<FacturePagination />}
      filters={<FilterAvanceDetailList />}
      actions={<AvanceDetailsActions />}
      filterDefaultValues={{ dateExercices: defaultDateExercices }}
      title="nouv. Avance Log"
    >
      <ExporterBridge />
      <DatagridConfigurable bulkActionButtons={false}>
        <TextField source="codechantier" />
        <TextField source="nom" />
        <TextField source="Fn" />
        <TextField source="BonCommande" />
        <NumberField source="Ht" label="HT" />
        <NumberField source="Tva" label="TVA" />
        <NumberField source="Ttc" label="TTC" />
        <NumberField source="montantRestit" />
        <NumberField source="montantPaiement" />
        <TextField source="Etat" />
        <TextField source="modepaiement" />
        <TextField source="RefPay" />
        <DateField source="DateOperation" />
        <NumberField source="Ras" />
        <TextField source="Bank" />
      </DatagridConfigurable>
    </List>
  );
};
