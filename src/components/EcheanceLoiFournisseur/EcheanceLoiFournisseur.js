import { Datagrid, DateField, List, TextField } from "react-admin";
import FilterEcheanceLoiFournisseur from "./FilterEcheanceLoiFournisseur";

export const EcheanceLoiFournisseur = () => {
  return (
    <List filters={<FilterEcheanceLoiFournisseur />}
    >
      <Datagrid bulkActionButtons={false} rowClick="edit">
        {/* <TextField source="id" /> */}
        <TextField source="nom"></TextField>
   
        <TextField  source="modalitePaiement" label="modalitePaiement"  />
        <DateField  source="dateecheance" label="date debut convention"  />
        
      </Datagrid>
    </List>
  );
};