import { Datagrid, DateField, List, TextField } from "react-admin";

export const DossierList = () => (
  <List>
    <Datagrid bulkActionButtons={false} rowClick="edit">
      <TextField source="NumDossier" />
      <TextField source="Libele" />
      <TextField source="nom" />
      <TextField source="MontantHtTotal" />
      <TextField source="Redacteur" />
      <DateField source="dateCreation" />
    </Datagrid>
  </List>
);
