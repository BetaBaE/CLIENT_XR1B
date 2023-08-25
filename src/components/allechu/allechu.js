import React from "react";
import { Datagrid, DateField, List, TextField } from "react-admin";
import AllFilter from "./AllechuFilter";

import ColorfulText from "../custom/layout/ColorfulText";
import AllechuFilter from "./AllechuFilter";

export const Allechu = (props) => {
 
  const CustomRowStyle = (record) => {
    const currentDate = new Date();
    const futureDate = new Date(record.datefacture);
    futureDate.setDate(futureDate.getDate() + 45);
  
    if (futureDate.getTime() > currentDate.getTime()  ) {
      return { backgroundColor: "#FF4933" }; 
    } else {
      return { backgroundColor: "#FFCE33" };
    }
  };

  return (
    <>
     <ColorfulText className="pskch"  />
      <List filters={<AllechuFilter />} title="Log Facture Saisie">
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
          <DateField
          source="dateechu"
           label="dateechu"
                              />
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
