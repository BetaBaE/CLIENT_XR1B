import { Datagrid, DateField, List, NumberField, TextField } from "react-admin";

const FaAyantFnList = () => {
  return (
    <List title="Situation : Facture Ayant FN Sage">
      <Datagrid bulkActionButtons={false}>
        <TextField source="CODEAFFAIRE" label="Code Chantier" />
        <TextField source="nom" label="Fournisseur" />
        <TextField source="numeroFacture" label="N° Facture" />
        <DateField source="DateFacture" label="Date Facture" />
        <TextField source="FN" label="N° FN" />
        <NumberField source="TTC Sage" label="TTC Sage" />
        <NumberField source="TTC App" label="TTC App" />
      </Datagrid>
    </List>
  );
};

export default FaAyantFnList;
