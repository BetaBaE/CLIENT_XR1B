import { Datagrid, DateField, List, NumberField, TextField } from "react-admin";

export const AlertAttestationRegFiscList = () => (
  <List title="Situation : Attestation de régularité fiscale">
    <Datagrid bulkActionButtons={false}>
      <TextField source="nom" />
      {/* <DateField source="dateDebut" /> */}
      <DateField source="DateExpiration" />
      <NumberField source="Restant" />
      {/* 
        
      <TextField source="exonorer" />
      <TextField source="catFournisseur" /> 
      */}
    </Datagrid>
  </List>
);
