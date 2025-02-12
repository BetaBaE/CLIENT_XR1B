import { makeStyles } from "@material-ui/core"; // Importation de makeStyles pour créer des styles personnalisés
import { useEffect, useState } from "react"; // Importation des hooks useEffect et useState de React
import {
  AutocompleteInput,
  Create,
  regex,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
  useDataProvider,
  useGetIdentity,
} from "react-admin"; // Importation des composants nécessaires de React Admin

// Définition des styles personnalisés
const useStyles = makeStyles(() => ({
  autocomplete: {
    width: "650px", // Largeur des champs d'autocomplétion
  },
  chip: {
    fontWeight: "bold", // Poids de la police pour les chips
  },
}));

// Composant principal pour la création des RIB temporaire
export const RibtempoCreate = (props) => {
  const dataProvider = useDataProvider(); // Utilisation du dataProvider de React Admin
  const [fournisseurs, setFournisseurs] = useState([]); // État pour stocker les fournisseurs

  // Utilisation de useEffect pour charger la liste des fournisseurs au montage du composant
  useEffect(() => {
    dataProvider
      .getList("fournisseurs", {
        pagination: { page: 1, perPage: 3000 },
        sort: { field: "nom", order: "ASC" },
      })
      .then(({ data }) => {
        setFournisseurs(data); // Mise à jour de l'état avec les fournisseurs récupérés
      })
      .catch((error) => {
        console.log(error); // Affichage de l'erreur en cas d'échec de la requête
      });
  }, [dataProvider]);

  // Transformation des fournisseurs en choix pour le champ AutocompleteInput
  let fournisseur_choices = fournisseurs.map(({ id, nom }) => ({
    id: id,
    name: nom,
  }));

  // Validation personnalisée pour le champ RIB
  const validateRib = regex(
    /^[0-9]{3}\s[0-9]{3}\s[0-9]{3}\s[0-9]{3}\s[0-9]{3}\s[0-9]{3}\s[0-9]{3}\s[0-9]{3}$/,
    "Le RIB doit être de la forme 111 222 333 444 555 666 777 888"
  );

  const { identity, isLoading: identityLoading } = useGetIdentity(); // Récupération de l'identité de l'utilisateur connecté

  // Utilisation de useEffect pour désactiver l'autocomplétion sur certains champs après le chargement du DOM
  useEffect(() => {
    const inputrib = document.getElementById("rib");
    const inputswift = document.getElementById("swift");

    if (inputrib || inputswift) {
      inputrib.autocomplete = "off";
      inputswift.autocomplete = "off";
    }
  }, []);

  const classes = useStyles(); // Utilisation des styles définis plus haut
  const { isLoading, error } = useGetIdentity(); // Récupération de l'état de chargement et des erreurs de l'identité de l'utilisateur

  // Affichage d'un message de chargement ou d'erreur si nécessaire
  if (isLoading) return <>Loading</>;
  if (error) return <>Error</>;

  return (
    <Create>
      <SimpleForm {...props}>
        {" "}
        {/* Formulaire simple pour la création */}
        <TextInput
          defaultValue={identity?.fullName}
          label="vous êtes"
          hidden={false}
          className={classes.autocomplete}
          disabled={true}
          source="Redacteur"
        />
        <AutocompleteInput
          label="Fournisseur"
          validate={required("Le fournisseur est obligatoire")}
          className={classes.autocomplete}
          source="FournisseurId"
          choices={fournisseur_choices}
        />
        <TextInput
          validate={[validateRib, required("Le RIB est obligatoire")]}
          className={classes.autocomplete}
          source="rib"
        />
        <TextInput className={classes.autocomplete} source="swift" />
        <SelectInput
          source="banque"
          label="banque"
          choices={[
            { id: "ABB", name: "Al Barid Bank" },
            { id: "AWB", name: "Attijari wafa banque" },
            { id: "CDM", name: "Credit du Maroc" },
            { id: "CAM", name: "Crédit agricole du Maroc" },
            { id: "CIH", name: "CIH" },
            {
              id: "BMCI",
              name: "Banque marocaine pour le commerce et l'industrie",
            },
            { id: "BMCE", name: "BMCE" },
            { id: "BCP", name: "Banque centrale populaire" },
            { id: "Arab Bank", name: "Arab Bank Maroc" },
            { id: "BAA", name: "Bank Al Amal" },
            { id: "CitiBank", name: "Citibank Morocco" },
            { id: "CFG", name: "CFG Bank" },
            { id: "Société générale Maroc", name: "SGMB" },
            { id: "Banco Sabadell", name: "Banco Sabadell Maroc" },
            { id: "La Caixa", name: "Caixabank" },
            { id: "Umnia bank", name: "Umnia bank" },
            { id: " TGR", name: " Trésorerie Générale du Royaume" },
          ]}
        />
      </SimpleForm>
    </Create>
  );
};
