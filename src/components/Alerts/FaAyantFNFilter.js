import { Filter, TextInput } from "react-admin";

export const FaAyantFnFilter = (props) => {
  return (
    <Filter {...props}>
      <TextInput source="CODEAFFAIRE" label="Code Chantier" />
      <TextInput source="nom" label="Fournisseur" />
      <TextInput source="numeroFacture" label="N° Facture" />
      <TextInput source="FN" label="N° FN" />
    </Filter>
  );
};
