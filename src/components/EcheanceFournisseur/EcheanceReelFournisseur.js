import { Datagrid, DateField, List, TextField } from "react-admin";
import FilterFournisseurs from "./FilterEcheanceFournisseur";

export const EcheanceReelFournisseur = () => {
  return (
    <List filters={<FilterFournisseurs />}
    >
      <Datagrid bulkActionButtons={false} rowClick="edit">
        {/* <TextField source="id" /> */}
        <TextField source="nom"></TextField>
   
        <TextField  source="modalitePaiement" label="modalitePaiement"  />
        <DateField  source="dateecheance" label="dateecheance"  />
        
      </Datagrid>
    </List>
  );
};