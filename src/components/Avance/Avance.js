import { makeStyles } from "@material-ui/core";
import { ChipField, Datagrid, DateField, List, NumberField, ReferenceArrayField, SingleFieldList, TextField } from "react-admin";
import AvanceFilter from "./AvanceFilter";


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
export const Avance = (props) => {
    const classes = useStyles();

    return (
        <List filters={<AvanceFilter />}
            title="Fiche Navette" >
            <Datagrid rowClick="edit"
                bulkActionButtons={false}
                classes={
                    { headerCell: classes.headerCell, row: classes.row }
                } >
                <TextField source="chantier"
                    label="chantier" />
                <TextField source="catFournisseur"
                    label="catFournisseur" />
            
                <NumberField source="MontantAvanceTVA"
                    label="MontantAvanceTVA" />
                <NumberField source="MontantAvanceHT"
                    label="MontantAvanceHT" />
                <NumberField source="MontantAvanceTTC"
                    label="MontantAvanceTTC" />
                <TextField source="BonCommande"
                    label="BonCommande" />
                <TextField source="nom"
                    label="nom" />
                <TextField source="CodeFournisseur"
                    label="CodeFournisseur" />
                <TextField source="ficheNavette"
                    label="fiche navette" />
                <NumberField source="montantAvance"
                    label="montantAvance" />
                <TextField source="fullname"
                    label="créateur" />
                <TextField source="Etat"
                    label="Etat" />
                <TextField source="CatFn"
                    label="CategorieFacture" />
    
                 <TextField source="EtatRestit"
                    label="EtatRestit" />


            </Datagrid>
        </List>
    );
};