// Importation des modules et composants nécessaires depuis react-admin
import { Datagrid, DateField, List, NumberField, TextField } from "react-admin";
import ChequeFilter from "./ChequeFilter";

// Définition et exportation du composant ChequeList
export const ChequeList = () => {
  return (
    // Composant List de react-admin pour afficher une liste d'enregistrements avec des filtres
    <List filters={<ChequeFilter />}>
      {/* Datagrid est utilisé pour afficher les données sous forme de tableau */}
      {/* bulkActionButtons={false} désactive les boutons d'actions en masse */}
      {/* rowClick="edit" permet de rediriger l'utilisateur vers la page d'édition lorsqu'il clique sur une ligne */}
      <Datagrid bulkActionButtons={false} rowClick="edit">
        {/* Différents champs pour afficher les données des chèques */}
        <TextField source="nom" label="Banque" />
        <TextField source="numerocheque" label="Numéro Chèque" />
        <NumberField source="montantVirement" label="Montant Payé" />
        <DateField source="datecheque" label="Date Chèque" />
        <DateField source="dateecheance" label="Date Échéance" />
        <TextField source="fournisseur" label="Fournisseur" />
        <TextField source="CodeFournisseur" label="Code Fournisseur" />
        <DateField source="dateOperation" label="Date Opération" />
        <TextField source="Etat" label="État" />
      </Datagrid>
    </List>
  );
};
