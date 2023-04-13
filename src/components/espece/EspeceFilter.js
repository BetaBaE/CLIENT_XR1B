import React from "react";
import { DateInput, Filter, TextInput } from "react-admin";

const EspeceFilter = (props) => {
  return (
    <Filter {...props}>


  
        <TextInput source="fournisseur" />
        <TextInput source="CodeFournisseur" />
    </Filter>
  );
};

export default EspeceFilter;
