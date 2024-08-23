import React from "react";
import { Datagrid, DateField, List, TextField } from "react-admin";
import AvanceRestituerDetatailFilter from "./AvanceRestituerDetatailFilter";
// import AllechuFilter from "./AvanceRestituerDetatailFilter";

export const AvanceRestituerDetatailList = (props) => {
  return (
    <List filters={<AvanceRestituerDetatailFilter />} title="Restitution Avane">
      {/* Affichage des données dans un tableau avec les filtres */}
      <Datagrid bulkActionButtons={false} {...props}>
        <TextField source="LIBELLE" label="chantier" />
        <TextField source="fichenavette" label="fichenavette" />
        <TextField source="CatFn" label="CategorieDoucument" />
        <TextField source="MontantAvanceTTC" label="MontantAvanceTTC" />
        <TextField source="BonCommande" label="BonCommande" />
        <DateField source="DateFacture" label="DateFacture" />
        <TextField source="numeroFacture" label="numeroFacture" />
        <TextField source="TTC" label="TTC" />
        <TextField source="MontantRestituer" label="MontantRestituer" />
        <TextField source="ModePaiement" label="ModePaiement" />
        <TextField source="nom" label="Founisseur" />
      </Datagrid>
    </List>
  );
};
