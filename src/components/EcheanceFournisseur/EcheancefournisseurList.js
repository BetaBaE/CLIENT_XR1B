import { Datagrid, List, NumberField, TextField } from "react-admin";

export const EcheancefournisseurList = () => {
  return (
    <List>
      <Datagrid rowClick="edit" bulkActionButtons={false}>
        <TextField source="nom" label="Fournisseur" />
        <NumberField source="EcheanceJR" label="Echeance en Jour" />
        <NumberField source="ConvJR" label="Convention en Jour" />
      </Datagrid>
    </List>
  );
};
