import { Datagrid, DateField, List, NumberField, TextField } from "react-admin"; // Importation des composants nécessaires de React Admin
import OrderVirementFondFilter from "./OrderVirementFilter"; // Importation du filtre personnalisé pour les ordres de virement

// Composant pour afficher la liste des ordres de virement de fonds
export const OrdervirementFondList = () => {
  return (
    <List filters={<OrderVirementFondFilter />} title="Order Virement">
      {" "}
      {/* Liste des ordres de virement avec un filtre et un titre */}
      <Datagrid rowClick="edit" bulkActionButtons={false}>
        {" "}
        {/* Tableau de données avec possibilité de cliquer sur une ligne pour éditer */}
        <TextField source="id" /> {/* Champ texte pour l'ID */}
        <TextField source="directeursigne" label="signature" />{" "}
        {/* Champ texte pour la signature du directeur */}
        <TextField source="nom" /> {/* Champ texte pour le nom */}
        <TextField source="rib" /> {/* Champ texte pour le RIB */}
        <NumberField source="total" /> {/* Champ numérique pour le total */}
        <TextField source="etat" /> {/* Champ texte pour l'état */}
        <DateField
          showTime
          source="datecreation"
          options={{ timeZone: "UTC" }}
        />{" "}
        {/* Champ de date pour la date de création avec affichage de l'heure */}
        <DateField
          showTime
          source="dateExecution"
          options={{
            timeZone: "UTC",
          }} /* Champ de date pour la date d'exécution avec affichage de l'heure */
        />
      </Datagrid>
    </List>
  );
};
