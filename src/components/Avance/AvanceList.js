import React from "react";
import { List, Datagrid, NumberField, TextField } from "react-admin";
import AideRestit from "./AideRestit";
import AvanceFilter from "./AvanceFilter";

// Styled header cells

export const AvanceList = (props) => (
  <>
    <AideRestit />
    <List filters={<AvanceFilter />} title="Restitution Avance" {...props}>
      <Datagrid rowClick="edit" bulkActionButtons={false}>
        <TextField source="catFournisseur" label="catFournisseur" />
        <NumberField source="MontantAvanceTVA" label="TVA" />
        <NumberField source="MontantAvanceHT" label="HT" />
        <NumberField source="MontantAvanceTTC" label="TTC" />
        <NumberField source="Montant" label="Restant" />
        <TextField source="BonCommande" label="BC" />
        <TextField source="nom" label="nom" />
        <TextField source="CodeFournisseur" label="Code Tier" />
        <TextField source="ficheNavette" label="FN" />
        <TextField source="Etat" label="Etat" />
        <TextField source="categorieDoc" label="Cat Doc" />
      </Datagrid>
    </List>
  </>
);
