import { Filter, TextInput } from "react-admin";

const FilterEchenceLoiFournisseurs = (props) => (
  <Filter {...props}>
    <TextInput source="codeFournisseur" />
    <TextInput source="nom" />
  </Filter>
);
export default FilterEchenceLoiFournisseurs;
