import { Filter, TextInput } from "react-admin";

const FactureFilter = (props) => (
  <Filter {...props}>
    <TextInput source="id" />
    {/* <TextInput source="DATEDOC" label="Datedoc" /> */}
    <TextInput source="nom" />
    {/* <TextInput source="NETAPAYER" label="Net A Payer" /> */}
  </Filter>
);
export default FactureFilter;
