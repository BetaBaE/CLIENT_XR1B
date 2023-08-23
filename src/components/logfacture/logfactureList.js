import { Datagrid, DateField, List, NumberField, TextField } from "react-admin";
import FilterRLogFacture from "./FilterRLogFacture";

export const LogfactureList = (props) => {
  return (
    <List filters={<FilterRLogFacture />} title="Log facture">
      <Datagrid bulkActionButtons={false} {...props}>
        {/* <TextField source="id" /> */}
        <TextField source="Bcommande" label="Bcommande" />
        <TextField source="CodeFournisseur" label="CodeFournisseur" />
  
        <TextField source="nom" label="fournisseur" />
        <TextField source="LIBELLE" label="chantier" />
        <NumberField source="id" label="code chantier" />
      
        <TextField source="montantAvance" label="montant Avance" />
        <TextField source="etat" />
        <TextField source="modepaiement" />
        
        <TextField source="ficheNavette" />
      </Datagrid>
    </List>
  );
};
