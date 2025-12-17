import { Datagrid, DateField, List, TextField } from "react-admin";
import FilterFournisseurs from "./FournisseursFilter";
export const FournisseursList = () => {
  return (
    <List filters={<FilterFournisseurs />}>
      <Datagrid bulkActionButtons={false} rowClick="edit">
        {/* <TextField source="id" /> */}
        <TextField source="Redacteur" />
        <TextField source="exonorer" />
        <TextField source="CodeFournisseur" />
        <TextField source="nom"></TextField>
        <TextField source="exonorer" label="exonorer"></TextField>
        <TextField source="catFournisseur"></TextField>
        <TextField source="ICE" label="ICE" />
        <TextField source="Identifiantfiscal" label="identifiant fiscal" />
        <TextField source="mail" />
        <TextField source="actif" />
        <TextField source="addresse" label="adresse" />
        <TextField source="echeancereel" />
        <TextField source="echeanceloi" label="echeanceloi" />
        <DateField source="datecreation" label="datecreation" />
      </Datagrid>
    </List>
  );
};
