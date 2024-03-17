import React from "react";
import { Filter, TextInput } from "react-admin";

const VirmentFondFilter = (props) => {
  return (
    <Filter {...props}>
      <TextInput source="orderVirementId" />
      <TextInput source="nom" />
      <TextInput source="rib" />
      <TextInput source="Etat" />
    </Filter>
  );
};

export default VirmentFondFilter;
