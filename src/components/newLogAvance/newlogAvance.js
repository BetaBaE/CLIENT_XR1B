import {
  CreateButton,
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
} from "react-admin";
import FilterAvanceDetailList from "./FilterAvanceDetailList";

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
    <CreateButton />
    <ExportButton />
  </TopToolbar>
);

export const GetavancedetailList = () => {
  return (
    <List
      pagination={<FacturePagination />}
      filters={<FilterAvanceDetailList />}
      actions={<AvanceDetailsActions />}
      filterDefaultValues={{ dateExercices: "2024-01-01" }}
      title="nouv. Avance Log"
    >
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
