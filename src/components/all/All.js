import React, { Fragment, useEffect, useState } from "react";
import {
  Datagrid,
  DateField,
  List,
  TextField,
  useDataProvider,
} from "react-admin";
import AllFilter from "./AllFilter";
import { ExportButton } from 'react-admin';
import ColorfulText from "../custom/layout/ColorfulText";

export const All = (props) => {;
  const [recordCount, setRecordCount] = useState(0);

/*
  useEffect(() => {
    fetch("http://localhost:8080/allcountexport") 
      .then((response) => response.json())
      .then((data) => {
        setRecordCount(data.count); 
      })
      .catch((error) => {
        console.error("Error fetching record count:", error);
      });
  }, []);
*/
  const CustomRowStyle = (record) => ({
    backgroundColor: record.ficheNavette !== null ? "#ACDF87" : "#ffd6d6",
  });


  return (
    <>
      <ColorfulText className="pskch" />
      <List 
 
      filters={<AllFilter />} title="Log Facture Saisie">
  {/* <div className="list-header">
          <h1>Log Facture Saisie</h1>
          <ExportButton label='Exporter' maxResults={recordCount} />
        </div> */}
    
        <Datagrid 
             bulkActionButtons={false}
        rowStyle={CustomRowStyle} {...props}>
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
        </Datagrid>
      </List>
      <style>
      {`
          #pskch {
            marginBottom: "-80px"
          }
          .list-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
          }
        `}
      </style>
    </>
  );
};
