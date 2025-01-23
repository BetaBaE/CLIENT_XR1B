import { Filter, TextInput } from "react-admin";

export const FilterDesignation = (props) => (
  <Filter {...props}>
    {/* <TextInput source="id" /> */}
    <TextInput source="designation" label="Designation" />
    <TextInput source="codeDesignation" label="Code" />
    <TextInput source="PosteTVA" label="Poste TVA" />
    <TextInput source="PourcentageTVA" label="Pourcentage TVA" />
  </Filter>
);
