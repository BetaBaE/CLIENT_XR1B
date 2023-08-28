import { Datagrid, DateField, List, TextField } from "react-admin";
import FilterFournisseurs from "./FilterFournisseurs";

export const FournisseurList = () => {
  return (
    <List filters={<FilterFournisseurs />}
    
    
    >
      <Datagrid bulkActionButtons={false} rowClick="edit">
        {/* <TextField source="id" /> */}
        <TextField source="CodeFournisseur" />
        <TextField source="nom"></TextField>
        <TextField  source="DateEcheance"  />
   
      </Datagrid>
    </List>
  );
};
