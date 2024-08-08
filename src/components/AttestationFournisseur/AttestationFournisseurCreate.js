// Importation des modules et composants nécessaires depuis react et react-admin
import { makeStyles } from "@material-ui/styles";
import React, { useState, useEffect } from "react";
import {
  AutocompleteInput,
  Create,
  DateInput,
  required,
  SimpleForm,
  TextInput,
  useDataProvider,
  useGetIdentity,
} from "react-admin";

// Définition des styles personnalisés avec makeStyles
const useStyles = makeStyles(() => ({
  autocomplete: {
    width: "650px",
  },
  chip: {
    fontWeight: "bold",
  },
}));

// Définition et exportation du composant AttestationFournisseurCreate
const AttestationFournisseurCreate = (props) => {
  // Récupération de l'identité de l'utilisateur courant
  const { identity } = useGetIdentity();
  // Application des styles personnalisés
  const classes = useStyles();
  // Déclaration de l'état local pour les fournisseurs
  const [fournisseur, setFournisseur] = useState([]);
  // Récupération du dataProvider pour effectuer des requêtes
  const dataProvider = useDataProvider();

  // Utilisation de useEffect pour charger la liste des fournisseurs au montage du composant
  useEffect(() => {
    dataProvider
      .getList("fournisseurs", {
        pagination: { page: 1, perPage: 10000 },
        sort: { field: "id", order: "ASC" },
      })
      .then(({ data }) => {
        setFournisseur(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dataProvider]);

  // Transformation des données des fournisseurs pour l'AutocompleteInput
  let fournisseur_choices = fournisseur.map(({ id, nom, CodeFournisseur }) => ({
    id: id,
    name: `${nom} | ${CodeFournisseur} `,
  }));

  // Récupération de l'état de chargement et des erreurs pour l'identité de l'utilisateur
  const { isLoading, error } = useGetIdentity();
  if (isLoading) return <>Loading</>;
  if (error) return <>Error</>;

  return (
    <Create>
      <SimpleForm {...props}>
        {/* Champ texte pour afficher le nom de l'utilisateur courant */}
        <TextInput
          defaultValue={identity?.fullName}
          label="vous êtes"
          hidden={false}
          className={classes.autocomplete}
          disabled={true}
          source="redacteur"
        />

        {/* Champ de saisie avec autocomplétion pour choisir un fournisseur */}
        <AutocompleteInput
          label="fournisseur"
          validate={required("choisir le fournisseur")}
          className={classes.autocomplete}
          source="idfournisseur"
          choices={fournisseur_choices}
        />

        {/* Champ de saisie de date pour la date de début de la convention */}
        <DateInput
          source="dateDebut"
          label="date debut convention"
          validate={[required("Date obligatoire")]}
          className={classes.autocomplete}
        />

        {/* Champ texte pour le numéro d'attestation */}
        <TextInput
          source="numAttestation"
          label="numero d'attestation"
          className={classes.autocomplete}
        />
      </SimpleForm>
    </Create>
  );
};

export default AttestationFournisseurCreate;
