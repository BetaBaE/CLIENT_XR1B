import { Datagrid, DateField, List, NumberField, TextField } from "react-admin";
import VirmentFondFilter from "./VirmentFondFilter"; // Importation du filtre personnalisé

// Composant principal pour la liste des virements interne
export const VirementFondList = () => {
  return (
    <List filters={<VirmentFondFilter />}>
      {" "}
      {/* Application du filtre */}
      <Datagrid rowClick="edit" bulkActionButtons={false}>
        {/* <TextField source="id" /> */} {/* Champ ID commenté */}
        <TextField source="orderVirementFondId" />
        <TextField source="nom" label="Banque ATNER Destination" />
        <TextField source="rib" label="Compte ATNER Destination" />
        <NumberField source="montantVirement" />
        <TextField source="Etat" />
        <DateField source="dateoperation" />{" "}
        {/* Champ pour la date de l'opération */}
      </Datagrid>
    </List>
  );
};
