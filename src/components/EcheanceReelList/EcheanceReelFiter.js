import { Filter, TextInput } from "react-admin";

const FilterFournisseurs = (props) => (
  <Filter {...props}>
    <TextInput source="codeFournisseur" />
    <TextInput source="nom" />
  </Filter>
);
export default FilterFournisseurs;
