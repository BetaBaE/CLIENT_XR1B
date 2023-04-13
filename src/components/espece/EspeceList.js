import { Datagrid, DateField, List, NumberField, TextField } from "react-admin";
import EspeceFilter from "./EspeceFilter";


export const EspeceList = () => {
  return (
    <List filters={<EspeceFilter />}>
      <Datagrid  bulkActionButtons={false}>
        {/* <TextField source="id" /> */}
        <TextField source="fournisseur" />
        <TextField source="CodeFournisseur" /> 
        <NumberField source="montantVirement"  label="montant payé"/>
      
       
        <DateField source="Datepaiement" label="Datepaiement"></DateField>
     
      </Datagrid>
    </List>
  );
};
