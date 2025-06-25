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
import { useTheme } from "@mui/material/styles";
// Définition des styles personnalisés

// Composant principal pour la création d'un ordre de virement de fonds
export const OrdervirementFondCreate = () => {
  const { identity, isLoading, error } = useGetIdentity(); // Single call
  const dataProvider = useDataProvider(); // Récupération du fournisseur de données
  const [ribAtner, setRibAtner] = useState([]); // État pour stocker les données RIB
  const theme = useTheme();
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

  // Utilisation des styles définis plus haut

  if (isLoading) return <>Loading</>; // Affichage du texte de chargement si l'identité est en cours de chargement
  if (error) return <>Error</>; // Affichage du texte d'erreur en cas d'erreur

  return (
    <Create>
      <SimpleForm>
        <TextInput
          defaultValue={identity?.username} // Pré-remplissage avec le nom complet de l'utilisateur
          label="Vous êtes" // Étiquette du champ
          hidden={false} // Le champ n'est pas caché
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
          source="Redacteur" // Source de données pour React Admin
        />
        <SelectInput
          sx={{ width: 650 }} // Application des styles personnalisés
          validate={required("Le RIB est obligatoire")} // Validation requise pour le champ
          source="ribAtner" // Source de données pour React Admin
          choices={rib_choices} // Options pour le champ de sélection
        />
        <SelectInput
          sx={{ width: 650 }}
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
