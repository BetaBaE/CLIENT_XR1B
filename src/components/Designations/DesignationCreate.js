import { useEffect } from "react"; // Importation du hook useEffect de React
import {
  Create,
  required,
  SimpleForm,
  TextInput,
  useGetIdentity,
} from "react-admin"; // Importation des composants nécessaires de React Admin
import { useTheme } from "@mui/material/styles";
// Composant principal pour la création d'un RIB Atner
export const DesignationCreate = () => {
  const { identity, isLoading, error } = useGetIdentity(); // Single call
  const theme = useTheme();
  // Effet pour désactiver l'autocomplétion des champs après le chargement du DOM
  useEffect(() => {
    const inputnom = document.getElementById("nom"); // Récupération de l'élément DOM pour le champ "nom"
    const inputrib = document.getElementById("rib"); // Récupération de l'élément DOM pour le champ "rib"

    // Désactivation de l'autocomplétion
    if (inputnom || inputrib) {
      inputrib.autocomplete = "off";
      inputnom.autocomplete = "off";
    }
  }, []);

  // Affichage d'un message de chargement ou d'erreur si nécessaire
  if (isLoading) return <>Loading</>;
  if (error) return <>Error</>;

  return (
    <Create>
      <SimpleForm>
        <TextInput
          defaultValue={identity?.username}
          label="vous êtes"
          hidden={false}
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
          slotProps={{
            input: {
              readOnly: true,
            },
          }}
          source="ModifierPar"
        />
        <TextInput
          source="designation"
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
          validate={required("designation est obligatoire")}
        />
        <TextInput
          source="codeDesignation"
          validate={required("code designation est obligatoire")}
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
        <TextInput
          source="PourcentageTVA"
          label="Pourcentage TVA"
          validate={required("Pourcentage TVA est obligatoire")}
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
        <TextInput
          source="PosteTVA"
          label="Poste TVA"
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
      </SimpleForm>
    </Create>
  );
};
