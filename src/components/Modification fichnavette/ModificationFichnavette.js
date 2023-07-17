import { makeStyles } from "@material-ui/core";
import { Datagrid, DateField, List, NumberField, TextField  } from "react-admin";
import ModificationFichnavetteFilter from "./ModificationFichnavetteFilter";



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

export const ModificationFichnavette = (props) => {
    const classes = useStyles();

    return ( 
      <List filters = { <ModificationFichnavetteFilter/> }
        title = "Fiche Navette" >
        <Datagrid rowClick = "edit"
        bulkActionButtons = { false }
        classes = {
            { headerCell: classes.headerCell, row: classes.row }
        } >
        <TextField source = "libelle"
        label = "chantier" />
        <TextField source = "designation"
        label = "designation" />
        <DateField source = "DateFacture"
        label = "DateFacture" />
        <TextField source = "numeroFacture"
        label = "numeroFacture" />
          <NumberField source = "HT"
        label = "HT" />
        <NumberField source = "MontantTVA"
        label = "MontantTVA" />
        
        <NumberField source = "TTC"
        label = "TTC" />
      
        <TextField source = "BonCommande"
        label = "BonCommande" />
 
        <TextField source = "nom"
        label = "nom" />
        <TextField source = "CodeFournisseur"
        label = "CodeFournisseur" />
        <TextField source = "ficheNavette"
        label = "fiche navette" />

        <NumberField source = "montantAvance"
        label = "montantAvance" />

<TextField source = "fullname"
        label = "créateur" />
        <TextField source = "etat"
        label = "etat" />

        </Datagrid> 
        </List>
    );
};