// Importation des composants nécessaires depuis la bibliothèque react-admin
import { Datagrid, DateField, List, TextField } from "react-admin";
import { Chip } from "@mui/material";
import { useRecordContext } from "react-admin";
// Importation du composant de filtrage personnalisé
import FilterAttestationFournisseur from "./AttestationFournisseurFilter";

// Composant personnalisé pour afficher le statut avec des couleurs
const StatutField = (props) => {
  const record = useRecordContext();
  
  if (!record || !record.statut) return null;

  const getStatutStyle = (statut) => {
    // Pas d'attestation → Bleu
    if (statut.includes("Pas d'attestation")) {
      return { color: "primary", icon: "⚠️" };
    } 
    // Expiré → Rouge
    else if (statut.includes("de retard")) {
      return { color: "error", icon: "❌" };
    } 
    // Expire aujourd'hui → Rouge foncé
    else if (statut.includes("Expire aujourd'hui")) {
      return { color: "error", icon: "🚨" };
    } 
    // Jours restants
    else if (statut.includes("jours restants")) {
      const jours = parseInt(statut.match(/\d+/)?.[0] || "0");
      
      if (jours <= 10) {
        return { color: "warning", icon: "⚡" }; // Orange (≤10 jours)
      } else if (jours <= 20) {
        return { color: "warning", icon: "⏰" }; // Orange (≤20 jours)
      } else {
        return { color: "success", icon: "✅" }; // Vert (>20 jours)
      }
    }
    
    return { color: "default", icon: "" };
  };

  const { color, icon } = getStatutStyle(record.statut);

  return (
    <Chip 
      label={`${icon} ${record.statut}`}
      color={color}
      size="small"
      sx={{ fontWeight: "bold" }}
    />
  );
};

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
        <DateField source="dateDebut" label="Date début" />

        {/* DateField affiche la date d'expiration avec une étiquette personnalisée "dateExpiration" */}
        <DateField source="dateExpiration" label="Date expiration" />
        
        {/* TextField affiche le nombre de jours restants */}
        <TextField source="joursRestants" label="Jours restants" />
        
        {/* StatutField affiche le statut avec code couleur */}
        <StatutField source="statut" label="Statut" />
      </Datagrid>
    </List>
  );
};