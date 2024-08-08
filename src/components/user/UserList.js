import {
  Datagrid,
  DateField,
  FunctionField,
  List,
  TextField,
} from "react-admin";
import UserFilter from "./UserFilter";

// Composant pour afficher la liste des utilisateurs
export const UserList = () => (
  <List filters={<UserFilter />}>
    <Datagrid rowClick="edit" bulkActionButtons={false}>
      {/* Affiche le nom complet de l'utilisateur */}
      <TextField source="fullname" />

      {/* Affiche le nom d'utilisateur */}
      <TextField source="username" />

      {/* Affiche le rôle de l'utilisateur */}
      <TextField source="Role" />

      {/* Affiche l'état d'activation de l'utilisateur avec une évaluation conditionnelle */}
      <FunctionField
        label="isActivated"
        render={(record) =>
          record.isActivated === "true" ? "activer" : "desactiver"
        }
      />

      {/* Affiche la date de création de l'utilisateur */}
      <DateField source="created" />
    </Datagrid>
  </List>
);
