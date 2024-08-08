import React from "react";
import { Filter, regex, TextInput } from "react-admin";
const validateNoSpecialChars = regex(
  /^[a-zA-Z0-9 ]*$/,
  "Interdit les caractères spéciaux"
);
const AvanceFilter = (props) => {
  return (
    <Filter {...props}>
      <TextInput
        source="BonCommande"
        label="BonCommande"
        validate={[validateNoSpecialChars]}
      />
      <TextInput
        source="chantier"
        label="chantier"
        validate={[validateNoSpecialChars]}
      />
      <TextInput
        source="fournisseur"
        label="fournisseur"
        validate={[validateNoSpecialChars]}
      />
      <TextInput
        source="designation"
        label="designation"
        validate={[validateNoSpecialChars]}
      />
      <TextInput
        source="numeroFacture"
        label="numeroFacture"
        validate={[validateNoSpecialChars]}
      />
      <TextInput
        source="CodeFournisseur"
        label="CodeFournisseur"
        validate={[validateNoSpecialChars]}
      />
      <TextInput
        source="ficheNavette"
        label="ficheNavette"
        validate={[validateNoSpecialChars]}
      />
    </Filter>
  );
};

export default AvanceFilter;
