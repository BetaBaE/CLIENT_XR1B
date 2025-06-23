import React, { useState } from "react";
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
import { useTheme } from "@mui/material/styles";

// Styles pour le composant

export const FournisseurCreate = (props) => {
  // eslint-disable-next-line
  const [loadingSuggestions, setLoadingSuggestions] = useState(false); // État pour gérer le chargement des suggestions
  // eslint-disable-next-line
  const [errorSuggestions, setErrorSuggestions] = useState(null); // État pour gérer les erreurs de suggestions
  const theme = useTheme();
  const [NomFournisseur, setNomFournisseur] = useState([]); // État pour stocker les noms des fournisseurs
  const validateMail = [email()];
  const { identity } = useGetIdentity(); // Récupération de l'identité de l'utilisateur

  // Application des styles
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
      <SimpleForm {...props}>
        <TextInput
          defaultValue={identity.fullName}
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
          slotProps={{
            input: {
              readOnly: true,
              autoComplete: "off",
            },
          }}
          source="Redacteur"
        />

        <TextInput
          validate={[
            required("Le Code fournisseur est obligatoire"), // Validation requise
            validationcodefournisseur,
          ]}
          sx={{
            width: 650,
            input: {
              backgroundColor:
                theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
              color: theme.palette.mode === "dark" ? "#fff" : "inherit",
              borderRadius: "4px",
            },
          }}
          source="CodeFournisseur"
          inputProps={{ autoComplete: "off" }}
        />
        <TextInput
          validate={required("Le fournisseur est obligatoire")}
          sx={{
            width: 650,
            input: {
              backgroundColor:
                theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
              color: theme.palette.mode === "dark" ? "#fff" : "inherit",
              borderRadius: "4px",
            },
          }}
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
          sx={{
            width: 650,
            input: {
              backgroundColor:
                theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
              color: theme.palette.mode === "dark" ? "#fff" : "inherit",
              borderRadius: "4px",
            },
          }}
          source="IF"
          label="Identifiant Fiscal"
        />
        <TextInput
          inputProps={{ autoComplete: "off" }}
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
          inputProps={{ autoComplete: "off" }}
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
          validate={validateMail}
          inputProps={{ autoComplete: "off" }}
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
      </SimpleForm>
    </Create>
  );
};
