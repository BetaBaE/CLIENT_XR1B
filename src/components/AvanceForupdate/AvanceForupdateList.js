import React from "react";
import { Datagrid, List, NumberField, TextField } from "react-admin";

import AvanceFilter from "./AvanceForupdateFilter";

export const AvanceForupdateList = (props) => (
  <List filters={<AvanceFilter />} title="Avance" {...props}>
    <Datagrid rowClick="edit" bulkActionButtons={false}>
      <TextField source="chantier" label="chantier" />
      <TextField source="catFournisseur" label="catFournisseur" />
      <NumberField source="MontantAvanceTVA" label="MontantAvanceTVA" />
      <NumberField source="MontantAvanceHT" label="MontantAvanceHT" />
      <NumberField source="MontantAvanceTTC" label="MontantAvanceTTC" />
      <TextField source="BonCommande" label="BonCommande" />
      <TextField source="nom" label="nom" />
      <TextField source="CodeFournisseur" label="CodeFournisseur" />
      <TextField source="ficheNavette" label="fiche navette" />
      <TextField source="Etat" label="Etat" />
      <TextField source="categorieDoc" label="categorieDoc" />
      <TextField source="EtatRestit" label="EtatRestit" />
    </Datagrid>
  </List>
);
