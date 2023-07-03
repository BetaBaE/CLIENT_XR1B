import { Filter, TextInput } from "react-admin";

const FilterRLogFacture = (props) => (
  <Filter {...props}>
    <TextInput source="Bcommande" label="Bcommande" />
    <TextInput source="CodeFournisseur" label="CodeFournisseur" />
    <TextInput source="nom" label="fournisseur" />
    <TextInput source="chantier" label="LIBELLE" /> 
    <TextInput source="ficheNavette" label="ficheNavette" />
  </Filter>
);
export default FilterRLogFacture;
