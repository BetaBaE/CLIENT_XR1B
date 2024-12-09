import { makeStyles } from "@material-ui/styles";
import React, { useEffect, useState } from "react";

import {
  Create,
  email,
  regex,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
  useGetIdentity,
} from "react-admin";
import apiUrl from "../../config";
import _debounce from "lodash/debounce";

// Styles pour le composant
const useStyles = makeStyles(() => ({
  autocomplete: {
    width: "650px", // Largeur personnalisée pour les champs d'autocomplétion
  },
  chip: {
    fontWeight: "bold", // Style pour le texte en gras
  },
}));

export const FournisseurCreate = (props) => {
  // eslint-disable-next-line
  const [loadingSuggestions, setLoadingSuggestions] = useState(false); // État pour gérer le chargement des suggestions
  // eslint-disable-next-line
  const [errorSuggestions, setErrorSuggestions] = useState(null); // État pour gérer les erreurs de suggestions

  const [NomFournisseur, setNomFournisseur] = useState([]); // État pour stocker les noms des fournisseurs
  const validateMail = [email()];
  const { identity } = useGetIdentity(); // Récupération de l'identité de l'utilisateur

  useEffect(() => {
    // Désactivation de l'autocomplétion pour certains champs après le chargement du DOM
    const inputNom = document.getElementById("nom");
    const inputCodeFournisseur = document.getElementById("CodeFournisseur");
    const inputICE = document.getElementById("ICE");
    const inputIF = document.getElementById("IF");
    const inputaddresse = document.getElementById("addresse");
    const inputmail = document.getElementById("mail");
    if (
      inputNom ||
      inputCodeFournisseur ||
      inputICE ||
      inputIF ||
      inputaddresse ||
      inputmail
    ) {
      inputNom.autocomplete = "off";
      inputCodeFournisseur.autocomplete = "off";
      inputICE.autocomplete = "off";
      inputIF.autocomplete = "off";
      inputaddresse.autocomplete = "off";
      inputmail.autocomplete = "off";
    }
  }, []); // Dépendances vides pour exécuter uniquement au montage

  const classes = useStyles(); // Application des styles
  const { isLoading, error } = useGetIdentity(); // Gestion de l'état de chargement et des erreurs
  if (isLoading) return <>Loading</>; // Affichage d'un indicateur de chargement
  if (error) return <>Error</>; // Affichage d'une erreur si elle se produit

  // Fonction délayée pour récupérer les fournisseurs
  const debouncedGetNominationFournisseur = _debounce(async (nom) => {
    try {
      setLoadingSuggestions(true); // Activation de l'état de chargement

      let url = `${apiUrl}/getNomfournisseur`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nom }), // Envoi du nom au serveur
      });

      const json = await response.json(); // Transformation de la réponse en JSON
      setNomFournisseur(json); // Mise à jour de l'état avec les fournisseurs
      setErrorSuggestions(null); // Réinitialisation de l'état d'erreur
    } catch (error) {
      console.error("Error fetching data from server:", error); // Log de l'erreur
      setErrorSuggestions("Error fetching suggestions"); // Mise à jour de l'état d'erreur
    } finally {
      setLoadingSuggestions(false); // Désactivation de l'état de chargement
    }
  }, 500); // Délai de 500ms pour limiter les appels API

  const handleInputChange = (event) => {
    const nom = event.target.value; // Récupération de la valeur saisie
    console.log(nom); // Log pour le débogage
    if (!nom.trim()) {
      setNomFournisseur([]); // Réinitialisation si le champ est vide
      return;
    }

    debouncedGetNominationFournisseur(nom); // Appel à la fonction délayée
  };

  const validationcodefournisseur = regex(
    /^[0-9]+$/,
    "Ce code n'est pas valide" // Validation pour le code fournisseur
  );

  return (
    <Create>
      <SimpleForm {...props} autocomplete="off">
        <TextInput
          defaultValue={identity.fullName}
          label="Vous êtes"
          hidden={false}
          className={classes.autocomplete}
          disabled={true}
          source="Redacteur"
        ></TextInput>

        <TextInput
          validate={[
            required("Le Code fournisseur est obligatoire"), // Validation requise
            validationcodefournisseur,
          ]}
          className={classes.autocomplete}
          source="CodeFournisseur"
        />
        <TextInput
          validate={required("Le fournisseur est obligatoire")}
          className={classes.autocomplete}
          source="nom"
          id="nom"
          onChange={handleInputChange} // Gestionnaire d'événements pour les changements de saisie
        />
        {NomFournisseur ? (
          <div>
            <p>Les fournisseurs existent: </p>
            {NomFournisseur.map(({ nom }) => (
              <div key={nom}>{nom}</div> // Affichage des noms de fournisseurs existants
            ))}
          </div>
        ) : null}

        <TextInput
          className={classes.autocomplete}
          source="IF"
          label="Identifiant Fiscal"
        />
        <TextInput
          autocomplete="off"
          className={classes.autocomplete}
          source="ICE"
          label="ICE"
        />
        <TextInput
          className={classes.autocomplete}
          source="addresse"
          label="Adresse"
        />
        <TextInput
          className={classes.autocomplete}
          source="mail"
          label="Mail"
          validate={validateMail}
        />

        <SelectInput
          className={classes.autocomplete}
          source="catFournisseur"
          label="Catégorie Fournisseur"
          validate={required()} // Validation requise
          choices={[
            { id: "personne physique", name: "personne physique" },
            { id: "personne morale", name: "personne morale" },
          ]}
        />

        <SelectInput
          className={classes.autocomplete}
          source="exonorer"
          label="Exonération fournisseur"
          validate={required()} // Validation requise
          choices={[
            { id: "Oui", name: "Oui" },
            { id: "Non", name: "Non" },
          ]}
        />

        <SelectInput
          className={classes.autocomplete}
          source="RasIr"
          label="RAS IR"
          validate={required()} // Validation requise
          choices={[
            { id: "Oui", name: "Oui" },
            { id: "Non", name: "Non" },
          ]}
        />
      </SimpleForm>
    </Create>
  );
};
