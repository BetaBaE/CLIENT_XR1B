import { makeStyles } from "@material-ui/core"; // Importation de la méthode makeStyles de Material-UI pour le style
import { useEffect } from "react"; // Importation du hook useEffect de React
import {
  Create,
  required,
  SimpleForm,
  TextInput,
  useGetIdentity,
} from "react-admin"; // Importation des composants nécessaires de React Admin

// Définition des styles personnalisés
const useStyles = makeStyles(() => ({
  autocomplete: {
    width: "650px", // Largeur des champs d'autocomplétion
  },
  chip: {
    fontWeight: "bold", // Style de police en gras pour les étiquettes
  },
}));

// Composant principal pour la création d'un RIB Atner
export const RIBAtnerCreate = () => {
  const { identity, isLoading: identityLoading } = useGetIdentity(); // Récupération de l'identité de l'utilisateur connecté

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

  const classes = useStyles(); // Utilisation des styles définis plus haut
  const { isLoading, error } = useGetIdentity(); // Récupération de l'état de chargement et des erreurs de l'identité de l'utilisateur

  // Affichage d'un message de chargement ou d'erreur si nécessaire
  if (isLoading) return <>Loading</>;
  if (error) return <>Error</>;

  return (
    <Create>
      <SimpleForm>
        {/* Champ texte pour afficher le nom de l'utilisateur connecté, désactivé */}
        <TextInput
          defaultValue={identity?.fullName}
          label="vous êtes"
          hidden={false}
          className={classes.autocomplete}
          disabled={true}
          source="Redacteur"
        />

        {/* Champ texte pour le nom avec validation requise */}
        <TextInput
          validate={required("Le nom est obligatoire")}
          className={classes.autocomplete}
          source="nom"
        />

        {/* Champ texte pour le RIB avec validation requise */}
        <TextInput
          validate={required("Le RIB est obligatoire")}
          className={classes.autocomplete}
          source="rib"
        />
      </SimpleForm>
    </Create>
  );
};
