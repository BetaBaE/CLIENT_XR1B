import { Datagrid, DateField, List, TextField } from "react-admin";
import FilterAttestationFournisseur from "./FilterAttestationFournisseur";


export const AttestationlFournisseur = () => {
  return (
    <List filters={<FilterAttestationFournisseur />}
    >
      <Datagrid bulkActionButtons={false} rowClick="edit">
        {/* <TextField source="id" /> */}
        <TextField source="nom"></TextField>
   
        <DateField  source="dateDebut" label="date debut "  />
        <DateField  source="dateExpiration" label="dateExpiration"  />
      </Datagrid>
    </List>
  );
};