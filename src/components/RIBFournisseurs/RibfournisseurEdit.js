import React, { useEffect, useState } from "react"; // Importation de React et des hooks nécessaires
import {
  Edit,
  FormDataConsumer,
  SaveButton,
  SelectInput,
  SimpleForm,
  TextInput,
  Toolbar,
  required,
  useGetIdentity,
  usePermissions,
} from "react-admin"; // Importation des composants nécessaires de React Admin
import { useTheme } from "@mui/material/styles";

// Composant personnalisé pour la barre d'outils d'édition avec bouton de sauvegarde
const EditToolbar = (props) => (
  <Toolbar {...props}>
    <SaveButton id="save" /> {/* Bouton de sauvegarde avec un ID */}
  </Toolbar>
);

// Fonction pour afficher une alerte si le RIB est null

// Composant principal pour l'édition des RIB fournisseur
export const RibfournisseurEdit = (props) => {
  const theme = useTheme(); // Utilisation du thème Material-UI
  const { permissions } = usePermissions(); // Récupération des permissions de l'utilisateur
  const { identity, isLoading: identityLoading } = useGetIdentity(); // Récupération de l'identité de l'utilisateur connecté
  // Utilisation des styles définis plus haut
  const { isLoading, error } = useGetIdentity(); // Récupération de l'état de chargement et des erreurs de l'identité de l'utilisateur
  const [loading, setLoading] = useState(true); // État de chargement des données

  // Utilisation de useEffect pour détecter le chargement des données
  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  // Affichage d'un message de chargement ou d'erreur si nécessaire
  if (isLoading || identityLoading) return <>Loading</>;
  if (error) return <>Error</>;

  return (
    <Edit {...props}>
      <SimpleForm toolbar={<EditToolbar />}>
        <TextInput
          source="validateur"
          defaultValue={identity?.fullName}
          label="Vous êtes"
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
          InputProps={{ readOnly: true }}
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
          // inputProps={{ autoComplete: "off" }}
          source="fournisseur"
          InputProps={{ readOnly: true }}
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
          // inputProps={{ autoComplete: "off" }}
          source="swift"
          InputProps={{ readOnly: true }}
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
          // inputProps={{ autoComplete: "off" }}
          source="banque"
          label="Banque"
          InputProps={{ readOnly: true }}
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
          // inputProps={{ autoComplete: "off" }}
          source="rib"
          label="RIB"
          InputProps={{ readOnly: true }}
        />
        <FormDataConsumer>
          {({ formData, ...rest }) => (
            <>
              <SelectInput
                sx={{ width: 650 }}
                source="validation"
                validate={required()}
                choices={[
                  { id: formData.validation, name: formData.validation },
                  ...(permissions === "superviseur comptabilite midelt" &&
                  formData.validation === "Validé"
                    ? [
                        { id: "Confirmer", name: "Confirmer" },
                        { id: "Désactiver", name: "Désactiver" },
                      ]
                    : []),
                  ...(permissions === "superviseur comptabilite midelt" &&
                  formData.validation === "Confirmer"
                    ? [{ id: "Désactiver", name: "Désactiver" }]
                    : []),
                  ...(formData.validation === "Non Valider"
                    ? [
                        { id: "Validé", name: "Validé" },

                        { id: "Ignorer", name: "Ignorer" },
                      ]
                    : []),
                ]}
                disabled={loading}
                lazy={true}
              />
            </>
          )}
        </FormDataConsumer>
      </SimpleForm>
    </Edit>
  );
};
