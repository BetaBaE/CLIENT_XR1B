// Importation des composants nécessaires depuis la bibliothèque react-admin
import { Datagrid, DateField, List, TextField } from "react-admin";
// Importation du composant de filtrage personnalisé
import FilterAttestationFournisseur from "./AttestationFournisseurFilter";

// Définition et exportation du composant AttestationFournisseurList
export const AttestationFournisseurList = () => {
  return (
    // Composant List de react-admin pour afficher une liste d'enregistrements
    // Le composant de filtrage personnalisé est passé en tant que prop filters
    <List filters={<FilterAttestationFournisseur />}>
      {/* Datagrid est utilisé pour afficher les données sous forme de tableau */}
      {/* bulkActionButtons={false} désactive les boutons d'actions en masse */}
      {/* rowClick="edit" permet de rediriger l'utilisateur vers la page d'édition lorsqu'il clique sur une ligne */}
      <Datagrid bulkActionButtons={false} rowClick="edit">
        {/* Le champ texte pour l'identifiant est commenté et ne sera pas affiché */}
        {/* <TextField source="id" /> */}

        {/* TextField affiche le nom du fournisseur */}
        <TextField source="nom" />

        {/* DateField affiche la date de début avec une étiquette personnalisée "date debut" */}
        <DateField source="dateDebut" label="date debut " />

        {/* DateField affiche la date d'expiration avec une étiquette personnalisée "dateExpiration" */}
        <DateField source="dateExpiration" label="dateExpiration" />
      </Datagrid>
    </List>
  );
};
