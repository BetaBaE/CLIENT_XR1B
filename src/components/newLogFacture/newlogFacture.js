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
import FilterFactureDetailList from "./FilterFactureDetailList";

const FacturePagination = () => (
  <Pagination rowsPerPageOptions={[10, 25, 50, 100]} />
);
const newLoGFilter = [
  <DateInput source="dateExercices" />,
  <TextInput source="codechantier" />,
  <TextInput source="nom" />,
  <TextInput source="numeroFacture" />,
  <DateInput source="DateFacture" />,
  <TextInput source="Etat" />,
  <TextInput source="modepaiement" />,
  <TextInput source="RefPay" />,
  <DateInput source="DateOperation" />,
  <TextInput source="Bank" />,
];

const FactureDetailsActions = () => (
  <TopToolbar>
    <FilterButton filters={newLoGFilter} />
    <SelectColumnsButton />
    <CreateButton />
    <ExportButton />
  </TopToolbar>
);

export const GetfacturedetailList = () => {
  return (
    <List
      pagination={<FacturePagination />}
      filters={<FilterFactureDetailList />}
      actions={<FactureDetailsActions />}
      filterDefaultValues={{ dateExercices: "2024-01-01" }}
      title="nouv. Facture Log"
    >
      <DatagridConfigurable bulkActionButtons={false}>
        <TextField source="codechantier" />
        <TextField source="nom" />
        <TextField source="numeroFacture" />
        <DateField source="DateFacture" />
        <NumberField source="HT" label="HT" />
        <NumberField source="MontantTVA" label="TVA" />
        <NumberField source="TTC" label="TTC" />
        <NumberField source="montantPaiement" />
        <NumberField source="AcompteReg" />
        <NumberField source="AcompteVal" />
        <TextField source="idAvance" />
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
