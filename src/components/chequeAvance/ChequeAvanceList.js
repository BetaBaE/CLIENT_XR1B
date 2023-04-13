import { Datagrid, DateField, List, NumberField, TextField } from "react-admin";
import ChequeAvanceFilter from "./ChequeAvanceFilter";

export const ChequeAvanceList = () => {
  return (
    <List filters={<ChequeAvanceFilter />}>
      <Datagrid  bulkActionButtons={false} rowClick = "edit">
        {/* <TextField source="id" /> */}
     
        <TextField source="nom" label="banque" />
        <TextField source="numerocheque" label="numero cheque" />
        <NumberField source="montantVirement"  label="montant payé"/>
        <DateField source="datecheque" label ="datecheque" />
        <DateField source="dateecheance" label="dateecheance"></DateField>
        <TextField source="fournisseur" />
        <TextField source="CodeFournisseur" />
        <DateField source="dateOperation" label="dateOperation"></DateField>
        <TextField source="Etat" label="Etat"></TextField>
      </Datagrid>
    </List>
  );
};
