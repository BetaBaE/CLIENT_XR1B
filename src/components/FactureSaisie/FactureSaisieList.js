import {
  CreateButton,
  DatagridConfigurable,
  DateField,
  DateInput,
  ExportButton,
  FilterButton,
  List,
  NumberField,
  SelectColumnsButton,
  TextField,
  TextInput,
  TopToolbar,
} from "react-admin";
import FactureFilter from "./FactureFilter";

const FactureFilters = [
  <TextInput source="numeroFacture" />,
  <TextInput source="BonCommande" />,
  <TextInput source="LIBELLE" label="chantier" />,
  <TextInput source="fournisseur" label="fournisseur" />,
  <TextInput source="designation" label="designation" />,
  <TextInput source="CodeFournisseur" label="CodeFournisseur" />,
  <TextInput source="fullname" label="createur" />,
  <DateInput source="Datedebut" label="mindate" />,
  <DateInput source="Datefin" label="maxdate" />,
];

const FactureListActions = () => (
  <TopToolbar>
    <SelectColumnsButton />
    <FilterButton filters={FactureFilters} />
    <CreateButton />
    <ExportButton />
  </TopToolbar>
);
export const FactureSaisieList = () => {
  return (
    <List
      actions={<FactureListActions />}
      filters={<FactureFilter />}
      title="Saisir une facture"
    >
      <DatagridConfigurable rowClick="edit" bulkActionButtons={false}>
        <TextField source="LIBELLE" label="chantier" />
        <TextField source="designation" label="designation" />
        <TextField source="CatFn" label="CatFn" />
        <DateField source="DateFacture" label="DateFacture" />
        <TextField source="numeroFacture" label="numeroFacture" />
        <NumberField source="HT" label="HT" />
        <NumberField source="MontantTVA" label="MontantTVA" />
        <NumberField source="TTC" label="TTC" />
        <NumberField source="AcompteReg" label="AcompteReg" />
        <NumberField source="AcompteVal" label="AcompteVal" />
        <TextField source="BonCommande" label="BonCommande" />
        <TextField source="nom" label="nom" />
        <TextField source="CodeFournisseur" label="CodeFournisseur" />
        <TextField source="fullName" label="crée par" />
        <TextField source="verifiyMidelt" label="verifiyMidelt" />
        <TextField source="updatedBy" label="valider archivé" />
        <DateField
          showTime
          source="createdDate"
          options={{ timeZone: "UTC" }}
        />
        <DateField source="dateecheance" />
      </DatagridConfigurable>
    </List>
  );
};
