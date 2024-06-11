import { Datagrid, DateField, List, TextField } from "react-admin";
import FilterFournisseurs from "./FilterFournisseurs";

export const FournisseurList = () => {
  return (
    <List filters={<FilterFournisseurs />}
    
    
    >
      <Datagrid bulkActionButtons={false} rowClick="edit">
        {/* <TextField source="id" /> */}
        <TextField source="Redacteur" />
        <TextField source="CodeFournisseur" />
        <TextField source="nom"></TextField>
        <TextField source="catFournisseur"></TextField>
        <TextField  source="ICE" label="ICE"  />
        <TextField  source="Identifiantfiscal" label="identifiant fiscal"  />
        <TextField  source="mail"  />
        <TextField  source="addresse" label="adresse"  />
        <TextField  source="echeancereel"  />
        <TextField  source="echeanceloi" label="echeanceloi"  />
        <DateField source="datecreation" label="datecreation"/>
      </Datagrid>
    </List>
  );
};