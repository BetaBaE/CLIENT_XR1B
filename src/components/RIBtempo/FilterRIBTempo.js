import { Filter, TextInput } from "react-admin";

const FilterRIBTempo = (props) => (
  <Filter {...props}>
    <TextInput source="fournisseur" />
    <TextInput source="rib" />
    <TextInput source="swift" />
  </Filter>
);
export default FilterRIBTempo;
