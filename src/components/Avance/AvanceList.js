import React from "react";
import { makeStyles } from "@material-ui/core";

import { Datagrid, List, NumberField, TextField } from "react-admin";
import AvanceFilter from "./AvanceFilter";
import AideRestit from "./AideRestit";

const useStyles = makeStyles({
  headerCell: {
    backgroundColor: "#def2ff",
    color: "white",
    fontWeight: "bold",
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#def2ff",
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  },
});

export const AvanceList = (props) => {
  const classes = useStyles();

  return (
    <>
      <AideRestit />
      <List filters={<AvanceFilter />} title="Restitution Avance">
        <Datagrid
          rowClick="edit"
          bulkActionButtons={false}
          classes={{ headerCell: classes.headerCell, row: classes.row }}
        >
          {/* <TextField source="chantier" label="chantier" /> */}
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
          {/* <TextField source="EtatRestit" label="EtatRestit" /> */}
        </Datagrid>
      </List>
    </>
  );
};
