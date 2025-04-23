import { Datagrid, DateField, List, TextField } from "react-admin";

export const TmpfournisseurList = () => {
  return (
    <List title="Fournisseur Achat">
      <Datagrid bulkActionButtons={false} rowClick="edit">
        <TextField source="nom" />
        <TextField source="Redacteur" />
        <TextField source="Validateur" />
        <DateField showTime={true} source="dateCreation" />
        <DateField showTime={true} source="dateValidation" />
        <TextField source="catFournisseur" />
        <TextField source="etat" />
      </Datagrid>
    </List>
  );
};
