import { makeStyles } from "@material-ui/core"; // Importation de la méthode makeStyles de Material-UI pour le style
import { useEffect, useState } from "react"; // Importation des hooks useEffect et useState de React
import {
  Create,
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
    fontWeight: "bold", // Style de police en gras pour les étiquettes
  },
}));

// Composant principal pour la création d'un ordre de virement de fonds
export const OrdervirementFondCreate = () => {
  const { identity, isLoading: identityLoading } = useGetIdentity(); // Récupération de l'identité de l'utilisateur
  const dataProvider = useDataProvider(); // Récupération du fournisseur de données
  const [ribAtner, setRibAtner] = useState([]); // État pour stocker les données RIB

  // Effet pour récupérer les données RIB depuis l'API
  useEffect(() => {
    dataProvider
      .getList("ribatner", {
        pagination: { page: 1, perPage: 20 }, // Pagination des résultats
        sort: { field: "nom", order: "ASC" }, // Tri par nom de manière ascendante
      })
      .then(({ data }) => {
        setRibAtner(data); // Mise à jour de l'état avec les données récupérées
      })
      .catch((error) => {
        console.log(error); // Gestion des erreurs
      });
  }, [dataProvider]); // Dépendance sur dataProvider

  // Effet pour désactiver l'autocomplétion des champs après le chargement du DOM
  useEffect(() => {
    const inputRibAtner = document.getElementById("ribAtner");
    const inputDirecteurSigne = document.getElementById("directeursigne");

    if (inputRibAtner || inputDirecteurSigne) {
      inputRibAtner.autocomplete = "off";
      inputDirecteurSigne.autocomplete = "off";
    }
  }, []);

  // Transformation des données RIB pour les utiliser dans le composant SelectInput
  let rib_choices = ribAtner.map(({ id, nom, rib }) => ({
    id: id,
    name: `(${nom}) ${rib}`,
  }));

  const classes = useStyles(); // Utilisation des styles définis plus haut

  const { isLoading, error } = useGetIdentity(); // Récupération des états de chargement et d'erreur pour l'identité
  if (isLoading) return <>Loading</>; // Affichage du texte de chargement si l'identité est en cours de chargement
  if (error) return <>Error</>; // Affichage du texte d'erreur en cas d'erreur

  return (
    <Create>
      <SimpleForm>
        <TextInput
          defaultValue={identity?.fullName} // Pré-remplissage avec le nom complet de l'utilisateur
          label="Vous êtes" // Étiquette du champ
          hidden={false} // Le champ n'est pas caché
          className={classes.autocomplete} // Application des styles personnalisés
          disabled={true} // Champ désactivé
          source="Redacteur" // Source de données pour React Admin
        />
        <SelectInput
          className={classes.autocomplete} // Application des styles personnalisés
          validate={required("Le RIB est obligatoire")} // Validation requise pour le champ
          source="ribAtner" // Source de données pour React Admin
          choices={rib_choices} // Options pour le champ de sélection
        />
        <SelectInput
          validate={required("Le directeur est obligatoire")} // Validation requise pour le champ
          emptyText="Sélectionnez le directeur" // Texte par défaut si aucune option n'est sélectionnée
          source="directeursigne" // Source de données pour React Admin
          choices={[
            { id: "Youness ZAMANI", name: "Youness ZAMANI" },
            { id: "Mohamed ZAMANI", name: "Mohamed ZAMANI" },
          ]} // Options pour le champ de sélection
        />
      </SimpleForm>
    </Create>
  );
};
