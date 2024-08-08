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
import { makeStyles } from "@material-ui/core"; // Importation de la méthode makeStyles de Material-UI pour le style
// Définition des styles personnalisés
const useStyles = makeStyles(() => ({
  autocomplete: {
    width: "650px", // Largeur des champs d'autocomplétion
  },
}));

// Composant personnalisé pour la barre d'outils d'édition avec bouton de sauvegarde
const EditToolbar = (props) => (
  <Toolbar {...props}>
    <SaveButton id="save" /> {/* Bouton de sauvegarde avec un ID */}
  </Toolbar>
);

// Fonction pour afficher une alerte si le RIB est null

// Composant principal pour l'édition des RIB fournisseur
export const RibfournisseurEdit = (props) => {
  const { permissions } = usePermissions(); // Récupération des permissions de l'utilisateur
  const { identity, isLoading: identityLoading } = useGetIdentity(); // Récupération de l'identité de l'utilisateur connecté
  const classes = useStyles(); // Utilisation des styles définis plus haut
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
        {" "}
        {/* Formulaire simple avec barre d'outils personnalisée */}
        <TextInput
          defaultValue={identity?.fullName}
          label="Vous êtes"
          hidden={false}
          className={classes.autocomplete}
          disabled={true}
          source="validateur"
        />
        <TextInput
          className={classes.autocomplete}
          source="fournisseur"
          disabled
        />
        <TextInput className={classes.autocomplete} source="swift" disabled />
        <TextInput
          className={classes.autocomplete}
          source="banque"
          label="Banque"
          disabled
        />
        <TextInput className={classes.autocomplete} source="rib" disabled />
        <FormDataConsumer>
          {({ formData, ...rest }) => (
            <>
              <SelectInput
                className={classes.autocomplete}
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
