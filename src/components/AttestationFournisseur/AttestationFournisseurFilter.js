import { Filter, TextInput } from "react-admin";
import { required, regex } from "react-admin";

const validateNoSpecialChars = regex(
  /^[a-zA-Z0-9 ]*$/,
  "Interdit les caractères spéciaux"
);

const FilterAttestationFournisseur = (props) => (
  <Filter {...props}>
    <TextInput source="nom" validate={[validateNoSpecialChars]} />
  </Filter>
);

export default FilterAttestationFournisseur;
