import { Datagrid, DateField, List, TextField } from "react-admin";
import AllechuFilter from "./SuivieFactureFilter";

export const SuivieFactureEchuList = (props) => {
  return (
    <List filters={<AllechuFilter />} title="Suivie Facture Echu">
      {/* Affichage des données dans un tableau avec les filtres */}
      <Datagrid bulkActionButtons={false} {...props}>
        <TextField source="chantier" label="chantier" />
        <TextField source="ficheNavette" label="ficheNavette" />
        <TextField source="designation" label="designation" />
        <TextField source="BonCommande" label="BonCommande" />
        <DateField source="DateFacture" label="datefacture" />
        <TextField source="numeroFacture" label="numeroFacture" />
        <TextField source="CodeFournisseur" label="codefournisseur" />
        <TextField source="nom" label="fournisseur" />
        <TextField source="HT" label="hors taxe" />
        <TextField source="MontantTVA" label="récupération TVA" />
        <TextField source="TTC" label="TTC" />
        <TextField source="montantAvance" label="montant avance" />
        <TextField source="modalitepaiement" label="modalité de paiement" />

        <TextField source="AcompteVal" label="AcompteVal" />
        <TextField source="AcompteReg" label="AcompteReg" />
        <DateField source="DateEcheancePaiement" label="Date Échéance" />
      </Datagrid>
    </List>
  );
};
