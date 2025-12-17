import {
  Edit,
  required,
  SaveButton,
  SelectInput,
  SimpleForm,
  TextInput,
  Toolbar,
  useGetIdentity,
} from "react-admin";

// Styles personnalisés pour les composants
import { useTheme } from "@mui/material/styles";

export const FournisseurEdit = () => {
  const theme = useTheme();
  // Application des styles
  const { isLoading, error } = useGetIdentity(); // Gestion de l'état de l'utilisateur
  if (isLoading) return <>Loading</>; // Affichage d'un message de chargement
  if (error) return <>Error</>; // Affichage d'une erreur si elle se produit
  
  const UserEditToolbar = (props) => (
    <Toolbar {...props}>
      <SaveButton id="save" /> {/* Bouton de sauvegarde */}
    </Toolbar>
  );

  return (
    <Edit label="Modifier" undoable={false}>
      {/* Édition de l'entité sans possibilité d'annuler */}
      <SimpleForm toolbar={<UserEditToolbar />}>
        <TextInput
          sx={{
            width: 650,
            input: {
              backgroundColor:
                theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
              color: theme.palette.mode === "dark" ? "#fff" : "inherit",
              borderRadius: "4px",
            },
          }}
          slotProps={{ input: { autoComplete: "off" } }}
          source="Identifiantfiscal"
          label="Identifiant fiscal"
        />
        <TextInput
          sx={{
            width: 650,
            input: {
              backgroundColor:
                theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
              color: theme.palette.mode === "dark" ? "#fff" : "inherit",
              borderRadius: "4px",
            },
          }}
          source="ICE"
          label="ICE"
        />
        <TextInput
          sx={{
            width: 650,
            input: {
              backgroundColor:
                theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
              color: theme.palette.mode === "dark" ? "#fff" : "inherit",
              borderRadius: "4px",
            },
          }}
          source="addresse"
          label="Adresse"
        />
        <TextInput
          sx={{
            width: 650,
            input: {
              backgroundColor:
                theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
              color: theme.palette.mode === "dark" ? "#fff" : "inherit",
              borderRadius: "4px",
            },
          }}
          source="mail"
          label="Mail"
        />
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
          source="catFournisseur"
          label="Catégorie Fournisseur"
          validate={required()} // Validation requise
          choices={[
            { id: "personne physique", name: "personne physique" },
            { id: "personne morale", name: "personne morale" },
          ]}
        />

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
          source="exonorer"
          label="Exonération fournisseur"
          validate={required()} // Validation requise
          choices={[
            { id: "Oui", name: "Oui" },
            { id: "Non", name: "Non" },
          ]}
        />
        
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
          source="RasIr"
          label="RAS IR"
          validate={required()} // Validation requise
          choices={[
            { id: "Oui", name: "Oui" },
            { id: "Non", name: "Non" },
          ]}
        />

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
          source="actif"
          label="Actif"
          validate={required()} // Validation requise
          choices={[
            { id: "Oui", name: "Oui" },
            { id: "Non", name: "Non" },
          ]}
        />
      </SimpleForm>
    </Edit>
  );
};
