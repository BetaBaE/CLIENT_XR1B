import { Datagrid, DateField, List, TextField } from "react-admin";
import FactureResFilter from "./FactureResFilter";
export const FactureRes = () => {
  return (
    <List filters={<FactureResFilter />} title="Saisir une facture">
      <Datagrid rowClick="edit" bulkActionButtons={false}>
        <TextField source="designation" label="designation" />
        <TextField source="numeroFacture" label="numeroFacture" />
        <TextField source="TTC" label="TTC" />
        <TextField source="HT" label="HT" />
        <TextField source="MontantTVA" label="MontantTVA" />
        <TextField source="BonCommande" label="BonCommande" />
        <DateField source="DateFacture" label="DateFacture" />
        <TextField source="nom" label="fournisseur" />
        <TextField source="CodeFournisseur" label="code fournisseur" />
        <TextField source="fullName" label="crée par" />
        <TextField source="verifiyMidelt" label="verifiyMidelt" />
        <TextField source="updatedBy" label="valider archivé" />
        <DateField
          showTime
          source="createdDate"
          options={{ timeZone: "UTC" }}
        />
      </Datagrid>
    </List>
  );
};
