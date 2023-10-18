import React from "react";
import { Datagrid, DateField, List, TextField } from "react-admin";
import AllechuFilter from "./SuivieFactureFilter";

export const SuivieFactureEchu = (props) => {
  
  // const CustomRowStyle = (record) => {
  //   let today = new Date();
    
  //   const futureDate = new Date(record.DateFacture);
  //   futureDate.setDate(futureDate.getDate() + 45); 
  
  //   let nbDay = (futureDate - today) / (1000 * 24 * 60 * 60);
  
  //   console.log(nbDay);
  
  //   if (nbDay < 0) {
  //     return { backgroundColor: "#FFBB33" }; 
  //   } else {
  //     return { backgroundColor: "#B7BAAF" };
  //   }
  // };
  
  return (


      <List filters={<AllechuFilter />} title="Log Facture Saisie">
        {/* <Datagrid bulkActionButtons={false} rowStyle={CustomRowStyle} {...props}> */}
            <Datagrid bulkActionButtons={false}  {...props}>
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
          <TextField source="modalitepaiement" label="modalitepaiement" />
        
          <DateField
          source="DateEcheancePaiement"
           label="DateEcheance"
                              /> 
        </Datagrid>
      </List>
     
    


  
  );
};
