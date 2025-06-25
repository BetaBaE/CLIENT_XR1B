import { Datagrid, List, NumberField, TextField, TextInput } from "react-admin";
import { useInputStyleFilters } from "../global/DarkInputStyle";

const filterEcheanceFournisseur = [
  <TextInput sx={useInputStyleFilters} source="nom" label="Fournisseur" />,
];

export const EcheancefournisseurList = () => {
  return (
    <List filters={filterEcheanceFournisseur} title="Echeance Fournisseur">
      <Datagrid rowClick="edit" bulkActionButtons={false}>
        <TextField source="nom" label="Fournisseur" />
        <NumberField source="EcheanceJR" label="Echeance en Jour" />
        <NumberField source="ConvJR" label="Convention en Jour" />
      </Datagrid>
    </List>
  );
};
