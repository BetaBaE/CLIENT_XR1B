import { Filter, TextInput } from "react-admin";

const OrderVirementFilter = (props) => (
  <Filter {...props}>
    <TextInput source="nom" />
    <TextInput source="directeursigne" />
    <TextInput source="rib" />
    <TextInput source="id" />
    {/* <SelectInput
      source="isActivated"
      choices={[
        { id: "true", name: "activer" },
        { id: "false", name: "desactiver" },
        //   { id: "photography", name: "Photography" },
      ]}
    /> */}
  </Filter>
);
export default OrderVirementFilter;
