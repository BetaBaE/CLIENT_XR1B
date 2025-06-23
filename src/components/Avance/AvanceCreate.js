import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  AutocompleteInput,
  Create,
  NumberInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
  useDataProvider,
  useGetIdentity,
} from "react-admin";

import apiUrl from "../../config";

export const AvanceCreate = () => {
  const theme = useTheme();
  const dataProvider = useDataProvider(); // Hook pour accéder au fournisseur de données
  const { identity } = useGetIdentity(); // Hook pour récupérer l'identité de l'utilisateur actuel

  // États pour les données des fournisseurs et chantiers
  const [fournisseur, setFournisseur] = useState([]);
  const [chantier, setChantier] = useState([]);

  // États pour la gestion de l'affichage des champs ID
  const [fournisseurIdField, setFournisseurIdField] = useState(true);
  const [chantierIdField, setChantierIdField] = useState(false);

  // État pour stocker le code du chantier sélectionné
  const [selectedCodeChantier, setSelectedCodeChantier] = useState("");

  // État pour la catégorie de fournisseur sélectionnée
  const [selectedSupplierCategory, setSelectedSupplierCategory] = useState("");

  // Effet pour charger la liste des fournisseurs au montage du composant
  useEffect(() => {
    const fetchFournisseurs = async () => {
      try {
        // Appel à l'API pour récupérer la liste des fournisseurs
        const response = await dataProvider.getList("getAllFournissuersClean", {
          pagination: { page: 1, perPage: 3000 }, // Pagination pour récupérer tous les fournisseurs
          sort: { field: "nom", order: "ASC" }, // Tri par nom ascendant
        });
        setFournisseur(response.data); // Mise à jour de l'état avec les données des fournisseurs
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des fournisseurs :",
          error
        ); // Affichage de l'erreur en cas de problème
      }
    };
    fetchFournisseurs(); // Appel de la fonction pour charger les fournisseurs au montage
  }, [dataProvider]); // Dépendance au fournisseur de données pour l'exécution de l'effet

  // Effet pour charger la liste des chantiers au montage du composant
  useEffect(() => {
    const fetchChantier = async () => {
      try {
        // Requête HTTP pour récupérer les chantiers depuis l'API
        const response = await fetch(`${apiUrl}/Chantier?range=[0,1000]`);
        const json = await response.json(); // Conversion de la réponse en JSON
        setChantier(json); // Mise à jour de l'état avec les données des chantiers
      } catch (error) {
        console.error("Erreur lors de la récupération des chantiers :", error); // Affichage de l'erreur en cas de problème
      }
    };
    fetchChantier(); // Appel de la fonction pour charger les chantiers au montage
  }, []); // Utilisation d'un tableau de dépendances vide pour que cet effet s'exécute une seule fois au montage

  // Transformation des fournisseurs en choix pour l'autocomplétion
  const fournisseurs_choices = fournisseur.map(
    ({ id, nom, CodeFournisseur, catFournisseur }) => ({
      id: id,
      name: `${nom} ${CodeFournisseur}, ${catFournisseur}`,
      categorie: catFournisseur,
    })
  );

  // Transformation des chantiers en choix pour l'autocomplétion
  const chantier_choices = chantier.map(({ id, LIBELLE }) => ({
    id: id,
    name: `${LIBELLE} | ${id}`,
  }));

  // Gestion de l'état de chargement et d'erreur pour l'identité de l'utilisateur
  const { isLoading, error } = useGetIdentity();
  if (isLoading) return <>Chargement...</>; // Affichage d'un message de chargement si l'identité est en cours de récupération
  if (error) return <>Erreur...</>; // Affichage d'un message d'erreur si la récupération de l'identité a échoué

  return (
    <Create>
      <SimpleForm>
        {/* Champ de texte pour afficher le nom complet de l'utilisateur */}
        <TextInput
          defaultValue={identity.fullName}
          label="Vous êtes"
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
          source="fullName"
        />

        {/* Sélecteur d'autocomplétion pour choisir un fournisseur */}
        <AutocompleteInput
          label="Fournisseur"
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
          inputProps={{ autoComplete: "off" }}
          source="idfournisseur"
          choices={fournisseurs_choices}
          onChange={(e) => {
            if (!e) {
              // Si aucun fournisseur n'est sélectionné
              setFournisseurIdField(true); // Désactiver le champ ID fournisseur
              setChantierIdField(false); // Activer le champ ID chantier

              setSelectedSupplierCategory(""); // Remettre à zéro la catégorie de fournisseur sélectionnée
            } else {
              // Si un fournisseur est sélectionné
              const selectedFournisseur = fournisseurs_choices.find(
                (f) => f.id === e
              );
              setFournisseurIdField(false); // Activer le champ ID fournisseur
              setChantierIdField(true); // Désactiver le champ ID chantier

              setSelectedSupplierCategory(selectedFournisseur.categorie); // Mettre à jour la catégorie de fournisseur sélectionnée
            }
          }}
        />

        {/* Sélecteur d'autocomplétion pour choisir un chantier */}
        <AutocompleteInput
          validate={required("Le chantier est obligatoire")}
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
          source="codechantier"
          choices={chantier_choices}
          onChange={(e) => setSelectedCodeChantier(e)}
        />

        {/* Condition pour afficher le sélecteur de service si le chantier sélectionné est "A-9999" */}
        {selectedCodeChantier === "A-9999" && (
          <SelectInput
            sx={{ width: 650 }}
            source="service"
            choices={[
              { id: "comm", name: "Communication" },
              { id: "SI", name: "Service informatique" },
              { id: "RH", name: "Ressource Humaine" },
              { id: "QUALITE", name: "Qualité" },
              { id: "MC", name: "Moyen commun" },
            ]}
          />
        )}

        {/* Champ de texte pour entrer la fiche navette */}
        <TextInput
          label="Fiche navette"
          validate={required("La fiche navette est obligatoire")}
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
          source="ficheNavette"
        />

        {/* Champ de texte pour entrer le bon de commande d'avance */}
        <TextInput
          label="Bon de commande d'avance"
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
          validate={required("Le bon de commande est obligatoire")}
          source="Bcommande"
        />

        {/* Champ de texte pour entrer le montant d'avance */}
        <NumberInput
          label="Montant d'avance"
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
          validate={(value) => {
            const numericValue = parseFloat(value);
            return numericValue >= 1
              ? undefined
              : "Le montant d'avance doit être supérieur ou égal à 1";
          }}
          source="montantAvance"
        />

        {/* Condition pour afficher le sélecteur de catégorie de document */}
        {selectedSupplierCategory !== "personne morale" && (
          <SelectInput
            disabled={fournisseurIdField}
            sx={{ width: 650 }}
            validate={required("Mentionnez la catégorie")}
            source="CatFn"
            choices={[
              { id: "FET", name: "Fourniture Equipement Travaux" },
              { id: "Service", name: "Service" },
            ]}
            label="Catégorie de document"
          />
        )}

        {/* Champ de texte pour entrer le montant TTC d'avance */}
        <NumberInput
          label="TTC D'Avance"
          validate={required("Le montant d'avance est obligatoire")}
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
          source="TTC"
        />

        {/* Champ de texte pour entrer le montant HT */}
        <NumberInput
          label="Mentionnez HT"
          validate={required("HT est obligatoire")}
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
          source="HT"
        />

        {/* Champ de texte pour entrer le montant TVA */}
        <NumberInput
          label="Mentionnez TVA"
          validate={required("TVA est obligatoire")}
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
          source="MontantTVA"
        />
        <SelectInput
          disabled={fournisseurIdField}
          sx={{ width: 650 }}
          validate={required("Mentionnez la catégorie")}
          source="CatFn"
          choices={[
            { id: "FET", name: "Fourniture Equipement Travaux" },
            { id: "Service", name: "Service" },
          ]}
          label="Catégorie de document"
        />
      </SimpleForm>
    </Create>
  );
};
