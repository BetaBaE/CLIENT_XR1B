import { Datagrid, DateField, List, NumberField, TextField } from "react-admin";
import { FaAyantFnFilter } from "./FaAyantFNFilter";

const FaAyantFnList = () => {
  return (
    <List
      filters={<FaAyantFnFilter />}
      title="Situation : Facture Ayant FN Sage"
    >
      <Datagrid bulkActionButtons={false}>
        <TextField source="CODEAFFAIRE" label="Code Chantier" />
        <TextField source="nom" label="Fournisseur" />
        <TextField source="numeroFacture" label="N° Facture" />
        <DateField source="DateFacture" label="Date Facture" />
        <TextField source="FN" label="N° FN" />
        <NumberField source="TTCSage" label="TTC Sage" />
        <NumberField source="TTCApp" label="TTC App" />
      </Datagrid>
    </List>
  );
};

export default FaAyantFnList;
