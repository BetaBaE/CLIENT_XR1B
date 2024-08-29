import { Datagrid, DateField, List, NumberField, TextField } from "react-admin";

export const AlertAttestationRegFiscList = () => (
  <List>
    <Datagrid bulkActionButtons={false}>
      <TextField source="nom" />
      <DateField source="dateDebut" />
      <DateField source="dateExpiration" />
      <NumberField source="ExpiréDans" />
      <TextField source="exonorer" />
      <TextField source="catFournisseur" />
    </Datagrid>
  </List>
);
