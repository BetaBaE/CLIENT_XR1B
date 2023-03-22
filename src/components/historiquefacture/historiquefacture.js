import { Datagrid, DateField, List, TextField } from "react-admin";
import FacturehistoriqueFilter from "./FacturehistoriqueFilter";

export const historiquefacture = () => {
  return (
    <List filters={<FacturehistoriqueFilter />} title="Facture Annulé">
      <Datagrid rowClick="edit" bulkActionButtons={false}>
        <TextField source="designation" label="designation" />
        <TextField source="numeroFacture" label="numeroFacture" />
        <TextField source="TTC" label="TTC" />
        <TextField source="HT" label="HT" />

        <TextField source="MontantTVA" label="MontantTVA" />
        <TextField source="BonCommande" label="BonCommande" />

        <DateField source="DateFacture" label="DateFacture" />
        <TextField source="nom" label="fournisseur" />

        <TextField source="CodeFournisseur" label="CodeFournisseur" />
      </Datagrid>
    </List>
  );
};
