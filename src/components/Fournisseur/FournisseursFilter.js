import { Filter, TextInput } from "react-admin";

const FournisseursFilter = (props) => (
  <Filter {...props}>
    <TextInput source="codeFournisseur" />
    <TextInput source="nom" />
  </Filter>
);
export default FournisseursFilter;
