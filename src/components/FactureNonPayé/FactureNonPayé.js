import React, {  useState } from "react";
import {
  AppBar,
  Datagrid,
  DateField,
  List,
  Menu,
  MenuItemLink,
  TabbedForm,
  TextField,
  UserMenu,

} from "react-admin";


import ColorfulText from "../custom/layout/ColorfulText";

import FactureNonPayeFilter from "./FactureNonPayeFilter";
import { CustomLayout } from "../custom/layout/CustomLayout";
import { Box } from "@material-ui/core";
// const MyMenu = () => (
//   <Menu>
//     <MenuItemLink to="/" primaryText="Dashboard" />
//     <MenuItemLink to="/posts" primaryText="Posts" />
//     <MenuItemLink to="/comments" primaryText="Comments" />
//   </Menu>
// );

const CustomAppBar = (props) => (
  <AppBar {...props}>
    <MenuItemLink to="/" primaryText="Dashboard" />
    <MenuItemLink to="/posts" primaryText="Posts" />
    <MenuItemLink to="/comments" primaryText="Comments" />
 
  </AppBar>
);


export const FactureNonPaye = (props) => {;
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
  
   
      <List 
   
      filters={<FactureNonPayeFilter />} title="Les Factures non payé">

     
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
          <TextField source="ModePaiementID" label="ModePaiementID"></TextField>
        </Datagrid>
     
      </List>
      <style>
      {`
        
          .list-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
          }

          .button {
            background-color: #04AA6D;
            border: none;
            color: white;
            padding: 15px 32px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            margin: 4px 2px;
            cursor: pointer;
          }

        `}
      </style>
   
     </> 
   
  );
};


FactureNonPaye.layout = CustomLayout; 