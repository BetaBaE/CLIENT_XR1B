import {
  Create,
  SelectInput,
  SimpleForm,
  TextInput,
  // DateInput,
  // required,
} from "react-admin";
import { useTheme } from "@mui/material/styles";
export const UserCreate = () => {
  const theme = useTheme();
  return (
    <Create>
      <SimpleForm>
        {/* Champ pour le nom complet de l'utilisateur */}
        <TextInput
          source="fullname"
          sx={{
            width: 650,
            input: {
              backgroundColor:
                theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
              color: theme.palette.mode === "dark" ? "#fff" : "inherit",
              borderRadius: "4px",
            },
          }}
          slotProps={{
            input: { autoComplete: "off" },
          }}
        />

        {/* Champ pour le nom d'utilisateur */}
        <TextInput
          source="username"
          sx={{
            width: 650,
            input: {
              backgroundColor:
                theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
              color: theme.palette.mode === "dark" ? "#fff" : "inherit",
              borderRadius: "4px",
            },
          }}
          slotProps={{
            input: { autoComplete: "off" },
          }}
        />

        {/* Champ pour le mot de passe */}
        <TextInput
          source="password"
          sx={{
            width: 650,
            input: {
              backgroundColor:
                theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
              color: theme.palette.mode === "dark" ? "#fff" : "inherit",
              borderRadius: "4px",
            },
          }}
          slotProps={{
            input: { autoComplete: "off" },
          }}
        />

        {/* Champ pour le rôle de l'utilisateur */}
        <SelectInput
          sx={{
            width: 650,
            input: {
              backgroundColor:
                theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
              color: theme.palette.mode === "dark" ? "#fff" : "inherit",
              borderRadius: "4px",
            },
          }}
          slotProps={{
            input: { autoComplete: "off" },
          }}
          source="role"
          allowEmpty
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
      </SimpleForm>
    </Create>
  );
};
