import { Datagrid, DateField, List, NumberField, TextField } from "react-admin";
import ChequeFilter from "./ChequeFilter";

export const ChequeList = () => {
  return (
    <List filters={<ChequeFilter />}>
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
