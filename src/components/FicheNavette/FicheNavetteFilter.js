import React from "react";
import { Filter,  TextInput } from "react-admin";

const FicheNavetteFilter = (props) => {
  return (
    <Filter {...props } >
    <TextInput source = "BonCommande"
    label = "BonCommande" />
    <TextInput source = "chantier"
    label = "chantier" />
    <TextInput source = "fournisseur"
    label = "fournisseur" />
    <TextInput source = "designation"
    label = "designation" />
    <TextInput source = "numeroFacture"
    label = "numeroFacture" />
    <TextInput source = "CodeFournisseur"
    label = "CodeFournisseur" />
    <TextInput source = "ficheNavette"
    label = "ficheNavette" />
    </Filter>
  );
};

export default FicheNavetteFilter;
