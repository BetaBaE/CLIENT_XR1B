import {
  Edit,
  required,
  SaveButton,
  SimpleForm,
  TextInput,
  Toolbar,
  useGetIdentity,
} from "react-admin"; // Importation des composants nécessaires de React Admin

// Composant personnalisé pour la barre d'outils d'édition avec bouton de sauvegarde
const EditToolbar = (props) => (
  <Toolbar {...props}>
    <SaveButton id="save" /> {/* Bouton de sauvegarde avec un ID */}
  </Toolbar>
);

// Composant principal pour l'édition d'un RIB Atner
export const RIBatnerEdit = (props) => {
  const { identity, isLoading: identityLoading } = useGetIdentity(); // Récupération de l'identité de l'utilisateur connecté
  // Utilisation des styles définis plus haut
  const { isLoading, error } = useGetIdentity(); // Récupération de l'état de chargement et des erreurs de l'identité de l'utilisateur

  // Affichage d'un message de chargement ou d'erreur si nécessaire
  if (isLoading) return <>Loading</>;
  if (error) return <>Error</>;

  return (
    <Edit {...props}>
      <SimpleForm toolbar={<EditToolbar />}>
        {" "}
        {/* Formulaire simple avec barre d'outils personnalisée */}
        {/* Champ texte pour afficher le nom de l'utilisateur connecté, désactivé */}
        <TextInput
          defaultValue={identity?.fullName}
          label="vous êtes"
          hidden={false}
          sx={{ width: 650 }}
          disabled={true}
          source="ModifierPar"
        />
        {/* Champ texte pour le nom avec validation requise */}
        <TextInput
          validate={required("Le nom est obligatoire")}
          sx={{ width: 650 }}
          source="nom"
        />
        {/* Champ texte pour le RIB avec validation requise */}
        <TextInput
          validate={required("Le RIB est obligatoire")}
          sx={{ width: 650 }}
          source="rib"
        />
      </SimpleForm>
    </Edit>
  );
};
