import { Datagrid, List, TextField } from "react-admin"; // Importation des composants nécessaires de React Admin
import { RIBAtnerFilter } from "./RIBAtnerFilter";

// Importation du filtre personnalisé pour les RIB Atner

// Composant principal pour afficher la liste des RIB Atner
export const RibaAtnerList = (props) => (
  <List filters={<RIBAtnerFilter />} title="RIB Atner">
    {/* Liste des RIB Atner avec un filtre et un titre */}
    <Datagrid rowClick="edit" bulkActionButtons={false}>
      {" "}
      {/* Tableau de données avec possibilité de cliquer sur une ligne pour éditer */}
      {/* <TextField source="id" /> */} {/* Champ texte pour l'ID, commenté */}
      <TextField source="nom" /> {/* Champ texte pour le nom */}
      <TextField source="rib" /> {/* Champ texte pour le RIB */}
    </Datagrid>
  </List>
);
