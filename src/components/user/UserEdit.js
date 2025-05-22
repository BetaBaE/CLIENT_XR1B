import {
  DateInput,
  Edit,
  required,
  SaveButton,
  SelectInput,
  SimpleForm,
  TextInput,
  Toolbar,
} from "react-admin";
import { useTheme } from "@mui/material/styles";
// Styles personnalisés pour le composant

// Barre d'outils personnalisée pour l'édition
const EditToolbar = (props) => (
  <Toolbar {...props}>
    <SaveButton id="save" />
  </Toolbar>
);

export const UserEdit = (props) => {
  const theme = useTheme(); // Utilisation du thème Material-UI
  return (
    <Edit {...props}>
      <SimpleForm toolbar={<EditToolbar />}>
        {/* Champ pour le nom complet de l'utilisateur */}
        <TextInput
          source="fullname"
          validate={required("Le nom est obligatoire")}
          sx={{
            width: 650,
            input: {
              backgroundColor:
                theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
              color: theme.palette.mode === "dark" ? "#fff" : "inherit",
              borderRadius: "4px",
            },
          }}
          inputProps={{ autoComplete: "off" }}
        />

        {/* Champ pour le nom d'utilisateur */}
        <TextInput
          source="username"
          validate={required("Username est obligatoire")}
          sx={{
            width: 650,
            input: {
              backgroundColor:
                theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
              color: theme.palette.mode === "dark" ? "#fff" : "inherit",
              borderRadius: "4px",
            },
          }}
          inputProps={{ autoComplete: "off" }}
        />

        {/* Sélecteur pour le rôle de l'utilisateur */}
        <SelectInput
          validate={required("Le Role est obligatoire")}
          sx={{
            width: 650,
            input: {
              backgroundColor:
                theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
              color: theme.palette.mode === "dark" ? "#fff" : "inherit",
              borderRadius: "4px",
            },
          }}
          inputProps={{ autoComplete: "off" }}
          source="Role"
          choices={[
            { id: "admin", name: "Admin" },
            { id: "normal user", name: "Normal user" },
            {
              id: "superviseur comptabilite",
              name: "Superviseur Comptabilité",
            },
            { id: "comptable", name: "Comptable" },
            { id: "comptable PdT", name: "Comptable PdT" },
            { id: "comptable midelt", name: "Comptable Midelt" },
            {
              id: "superviseur comptabilite midelt",
              name: "Superviseur Comptabilité Midelt",
            },
            {
              id: "direction générale",
              name: "Direction générale",
            },
            {
              id: "consultation directeur",
              name: "Consultation directeur",
            },
            {
              id: "achateur",
              name: "Achateur",
            },
          ]}
        />

        {/* Sélecteur pour l'état d'activation de l'utilisateur */}
        <SelectInput
          validate={required("Le status est obligatoire")}
          sx={{
            width: 650,
            input: {
              backgroundColor:
                theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
              color: theme.palette.mode === "dark" ? "#fff" : "inherit",
              borderRadius: "4px",
            },
          }}
          inputProps={{ autoComplete: "off" }}
          source="isActivated"
          choices={[
            { id: "true", name: "Activer" },
            { id: "false", name: "Désactiver" },
          ]}
        />

        {/* Champ pour la date de création (non modifiable) */}
        <DateInput
          sx={{
            width: 650,
            input: {
              backgroundColor:
                theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
              color: theme.palette.mode === "dark" ? "#fff" : "inherit",
              borderRadius: "4px",
            },
          }}
          inputProps={{ autoComplete: "off" }}
          source="created"
          disabled
        />
      </SimpleForm>
    </Edit>
  );
};
