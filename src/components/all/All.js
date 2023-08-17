import React from "react";
import { Datagrid, DateField, List, TextField } from "react-admin";
import AllFilter from "./AllFilter";

import ColorfulText from "../custom/layout/ColorfulText";

export const All = (props) => {
  const CustomRowStyle = (record) => ({
    backgroundColor: record.ficheNavette !== null ? "#ACDF87" : "#ffd6d6",
  });

  return (
    <>
     <ColorfulText className="pskch"  />
      <List filters={<AllFilter />} title="Log Facture Saisie">
        <Datagrid bulkActionButtons={false} rowStyle={CustomRowStyle} {...props}>
          <TextField source="chantier" label="chantier" />
          <TextField source="ficheNavette" label="ficheNavette" />
          <TextField source="designation" label="designation" />
          <TextField source="BonCommande" label="BonCommande" />
          <DateField source="DateFacture" label="datefactue" />
          <TextField source="numeroFacture" label="numeroFacture" />
          <TextField source="CodeFournisseur" label="codefournisseur" />
          <TextField source="nom" label="fournisseur" />
          <TextField source="HT" label="horstaxe" />
          <TextField source="MontantTVA" label="récupération tva" />
          <TextField source="TTC" label="TTC" />
          <TextField source="montantAvance" label="montantAvance" />
          <DateField showTime source="dateOperation" options={{ timeZone: "UTC" }} label="confirmation relevé"/>
          <TextField source="modepaiement" label="modepaiement" />
          <TextField source="banque" label="banque" />
          <TextField source="numerocheque" label="numerocheque" />
          <DateField showTime source="datecheque" options={{ timeZone: "UTC" }} />
          <DateField showTime source="dateecheance" options={{ timeZone: "UTC" }} />
          <TextField source="etat" label="etat" />
          <TextField source="nbrJour" label="nbrJour" />
        </Datagrid>
      </List>
     
      <style>
  {`
 #pskch {
      marginBottom: "-80px"
    }
  `}
</style>


    </>
  );
};
