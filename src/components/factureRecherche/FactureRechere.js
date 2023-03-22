import { makeStyles } from "@material-ui/core";
import { Datagrid, DateField, List, TextField } from "react-admin";
import FactureRechereFilter from "./FactureRechereFilter";

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

export const FactureRecherche = () => {
  const classes = useStyles();
  return (
    <List filters={<FactureRechereFilter />} title="Fiche Navette">
      <Datagrid
        rowClick="edit"
        bulkActionButtons={false}
        classes={{ headerCell: classes.headerCell, row: classes.row }}
      >
        <TextField source="chantier" label="chantier" />
        <TextField source="designation" label="designation" />
        <TextField source="numeroFacture" label="numeroFacture" />
        <TextField source="TTC" label="TTC" />
        <TextField source="HT" label="HT" />
        <TextField source="MontantTVA" label="MontantTVA" />
        <TextField source="BonCommande" label="BonCommande" />
        <DateField source="DateFacture" label="DateFacture" />
        <TextField source="nom" label="fournisseur" />
        <TextField source="CodeFournisseur" label="CodeFournisseur" />
        <TextField source="ficheNavette" label="fiche navette" />
      </Datagrid>
    </List>
  );
};
