import React from "react";
import {
  DateInput,
  Edit,
  required,
  SaveButton,
  SimpleForm,
  TextInput,
  Toolbar,
  useGetIdentity,
} from "react-admin";
import { makeStyles } from "@material-ui/styles";

// Styles spécifiques pour ce composant
const useStyles = makeStyles(() => ({
  autocomplete: {
    width: "580px",
  },
}));

// Composant de modification de la facture
export const FactureSaisieEdit = () => {
  const classes = useStyles(); // Utilisation des styles définis

  // Récupération de l'identité de l'utilisateur actuel
  const { isLoading, error } = useGetIdentity();

  // Gestion des cas de chargement et d'erreur de récupération d'identité
  if (isLoading) return <>Chargement...</>;
  if (error) return <>Erreur</>;

  // Composant personnalisé de la barre d'outils pour l'édition
  const UserEditToolbar = (props) => (
    <Toolbar {...props}>
      <SaveButton id="save" />
    </Toolbar>
  );

  // Rendu du formulaire de modification
  return (
    <Edit label="Modifier" undoable={false}>
      <SimpleForm toolbar={<UserEditToolbar />}>
        <TextInput
          source="numeroFacture"
          label="Numéro de Facture"
          validate={required("Le numéro de facture est obligatoire")}
          className={classes.autocomplete}
        />
        <TextInput
          source="TTC"
          label="TTC"
          validate={required("Le montant TTC est obligatoire")}
          className={classes.autocomplete}
        />
        <TextInput
          source="designation"
          label="Désignation"
          validate={required("Sélectionnez une désignation")}
          className={classes.autocomplete}
          disabled
        />
        <TextInput
          source="BonCommande"
          label="Bon de Commande"
          validate={required("Le bon de commande est obligatoire")}
          className={classes.autocomplete}
        />
        <TextInput
          source="fournisseur"
          label="Fournisseur"
          validate={required("Choisissez un fournisseur")}
          className={classes.autocomplete}
          disabled
        />
        <DateInput
          source="DateFacture"
          label="Date de Facture"
          validate={required("La date de facture est obligatoire")}
          className={classes.autocomplete}
        />
      </SimpleForm>
    </Edit>
  );
};
