import { Datagrid, DateField, List, NumberField, TextField } from "react-admin";
import EspeceAvanceFilter from "./EspeceAvanceFilter";


export const EspeceAvanceList = () => {
  return (
    <List filters={<EspeceAvanceFilter />}>
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
