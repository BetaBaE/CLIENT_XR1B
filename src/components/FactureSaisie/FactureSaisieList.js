import {
  CreateButton,
  Datagrid,
  DateField,
  ExportButton,
  FilterButton,
  List,
  NumberField,
  TextField,
  TopToolbar,
} from "react-admin";
import FactureFilter from "./FactureFilter";

const FactureListActions = () => (
  <TopToolbar>
    <FilterButton filters={FactureFilter} />
    {/* <SelectColumnsButton /> */}
    <CreateButton />
    <ExportButton />
  </TopToolbar>
);

export const FactureSaisieList = (props) => {
  return (
    <List
      // actions={<FactureListActions />}
      filters={<FactureFilter />}
      title="Saisir une facture"
    >
      <Datagrid rowClick="edit" bulkActionButtons={false}>
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
      </Datagrid>
    </List>
  );
};
