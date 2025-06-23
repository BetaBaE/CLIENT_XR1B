import {
  Datagrid,
  DateField,
  List,
  NumberField,
  TextField,
  useDataProvider,
} from "react-admin"; // Importation des composants nécessaires de React Admin
import VirmentFilter from "./VirmentFilter"; // Importation du filtre personnalisé pour la liste des virements
import { exporter } from "../global/exportsToCsv";

// Composant pour afficher la liste des virements
export const VirementList = () => {
  const dataProvider = useDataProvider();
  return (
    <List
      filters={<VirmentFilter />}
      title="Virement"
      exporter={(records, fetchRelatedRecords) =>
        exporter(records, fetchRelatedRecords, dataProvider, {
          resource: "virements",
        })
      } // Fonction d'exportation personnalisée
    >
      <Datagrid rowClick="edit" bulkActionButtons={false}>
        {/* Configuration du tableau */}
        {/* <TextField source="id" /> */} {/* Champ ID (commenté) */}
        <TextField source="orderVirementId" />
        {/* Affichage de l'ID de la commande de virement */}
        <TextField source="nom" /> {/* Affichage du nom */}
        <TextField source="rib" /> {/* Affichage du RIB */}
        <NumberField source="montantVirement" />
        {/* Affichage du montant du virement */}
        <TextField source="Etat" /> {/* Affichage de l'état du virement */}
        <DateField source="dateoperation" />
        {/* Affichage de la date de l'opération */}
      </Datagrid>
    </List>
  );
};
