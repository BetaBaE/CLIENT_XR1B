import { Datagrid, DateField, List, NumberField, TextField } from "react-admin";
import FactureFilter from "./FactureFilter";
export const FactureSaisie = () => {
  return (
    <List filters={<FactureFilter />} title="Saisir une facture">
      <Datagrid rowClick="edit" bulkActionButtons={false}>
      <TextField source = "LIBELLE"
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
     <TextField source = "echeancereel"
        label = "echeance" />

        <TextField source="fullName" label="crée par" />
        <TextField source="verifiyMidelt" label="verifiyMidelt" />
        <TextField source="updatedBy" label="valider archivé" />
        <DateField
          showTime
          source="createdDate"
          options={{ timeZone: "UTC" }}
        />
        
        <DateField
          source="dateechu"
         
        />

      </Datagrid>
    </List>
  );
};
