import { useEffect } from "react"; // Importation du hook useEffect de React
import {
  Create,
  required,
  SimpleForm,
  TextInput,
  useGetIdentity,
} from "react-admin"; // Importation des composants nécessaires de React Admin
import { useInputStyleFilters } from "../global/DarkInputStyle";
// Définition des styles personnalisés

// Composant principal pour la création d'un RIB Atner
export const RIBAtnerCreate = () => {
  const { identity, isLoading, error } = useGetIdentity();
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
        {/* Champ texte pour afficher le nom de l'utilisateur connecté, désactivé */}
        <TextInput
          defaultValue={identity?.username}
          label="vous êtes"
          hidden={false}
          sx={useInputStyleFilters}
          slotProps={{
            input: {
              readOnly: true,
              autoComplete: "off",
            },
          }}
          source="Redacteur"
        />

        {/* Champ texte pour le nom avec validation requise */}
        <TextInput
          validate={required("Le nom est obligatoire")}
          sx={useInputStyleFilters}
          slotProps={{ input: { autoComplete: "off" } }}
          source="nom"
        />

        {/* Champ texte pour le RIB avec validation requise */}
        <TextInput
          validate={required("Le RIB est obligatoire")}
          sx={useInputStyleFilters}
          slotProps={{ input: { autoComplete: "off" } }}
          source="rib"
        />
      </SimpleForm>
    </Create>
  );
};
