import { Datagrid, DateField, List, NumberField, TextField } from "react-admin";

export const FacturesinternationalList = () => (
  <List>
    <Datagrid bulkActionButtons={false}>
      <NumberField source="idDossier" />
      <TextField source="Devise" />
      <NumberField source="MontantHtDevise" />
      <NumberField source="MontantTvaDevise" />
      <NumberField source="MontantTTCDevise" />
      <DateField source="MontantPreparation" />
      <DateField source="CumulPaiementDevise" />
      <NumberField source="TauxInit" />
      <NumberField source="MontantHtDh" />
      <NumberField source="MontantTvaDh" />
      <NumberField source="MontantTTCDh" />
      <NumberField source="iddesignation" />
      <NumberField source="idFournisseur" />
      <DateField source="dateDoc" />
      <TextField source="numDoc" />
      <TextField source="codeChantier" />
      <DateField source="dateCreation" />
      <TextField source="Redacteur" />
      <DateField source="dateDouane" />
    </Datagrid>
  </List>
);
