import React from "react";
import { DateInput, Filter, TextInput } from "react-admin";

const ChequeAvanceFilter = (props) => {
  return (
    <Filter {...props}>
     <TextInput source="nom" label="banque" />
        <TextInput source="numerocheque" label="numero cheque" />
 
        <DateInput source="datechequeMin" label ="datecheque MIN" />
        <DateInput source="datechequeMax" label ="datecheque MAX" />
        <DateInput source="dateecheanceMin" label="dateecheance Min"/>
        <DateInput source="dateecheanceMax" label="dateecheance Max"/>
        <TextInput source="fournisseur" />
        <TextInput source="CodeFournisseur" />
    </Filter>
  );
};

export default ChequeAvanceFilter;
