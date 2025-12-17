// Importation des modules et composants nécessaires depuis react-admin
import { Datagrid, DateField, List, NumberField, TextField } from "react-admin";
import CardFilter from "./CardFilter";

// Définition et exportation du composant CardList
export const CardList = () => {
  return (
    // Composant List de react-admin pour afficher une liste d'enregistrements avec des filtres
    <List filters={<CardFilter />} title="Paiements par Carte Bancaire">
      {/* Datagrid est utilisé pour afficher les données sous forme de tableau */}
      {/* bulkActionButtons={false} désactive les boutons d'actions en masse */}
      {/* rowClick="edit" permet de rediriger l'utilisateur vers la page d'édition lorsqu'il clique sur une ligne */}
      <Datagrid bulkActionButtons={false} rowClick="edit">
        {/* Différents champs pour afficher les données des paiements par carte */}
        <TextField source="nom" label="Banque" />
        <NumberField source="montantVirement" label="Montant Payé" />
        <TextField source="fournisseur" label="Fournisseur" />
        <TextField source="CodeFournisseur" label="Code Fournisseur" />
        <DateField source="DateCreation" label="Date Création" />
        <DateField source="dateOperation" label="Date Opération" />
        <TextField source="Etat" label="État" />
        <TextField source="Observation" label="Observation" />
      </Datagrid>
    </List>
  );
};