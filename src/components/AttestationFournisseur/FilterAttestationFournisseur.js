import { Filter, TextInput } from "react-admin";

const FilterAttestationFournisseur = (props) => (
  <Filter {...props}>
    <TextInput source="nom" />
  </Filter>
);
export default FilterAttestationFournisseur;
