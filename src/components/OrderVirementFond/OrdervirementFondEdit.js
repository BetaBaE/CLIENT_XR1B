import { useEffect, useState } from "react"; // Importation des hooks useEffect et useState de React
import {
  Edit,
  FormDataConsumer,
  required,
  SaveButton,
  SelectInput,
  SimpleForm,
  TextInput,
  Toolbar,
  useDataProvider,
  useRedirect,
} from "react-admin"; // Importation des composants nécessaires de React Admin
import Swal from "sweetalert2"; // Importation de SweetAlert2 pour les alertes
import { useTheme } from "@mui/material/styles";
// Définition des styles personnalisés

// Composant personnalisé pour la barre d'outils d'édition avec un bouton de sauvegarde
const EditToolbar = (props) => (
  <Toolbar {...props}>
    <SaveButton id="save" />
  </Toolbar>
);

// Composant principal pour l'édition d'un ordre de virement de fonds
export const OrdervirementFondEdit = (props) => {
  const theme = useTheme();
  const dataProvider = useDataProvider(); // Récupération du fournisseur de données
  const [ribAtner, setRibAtner] = useState([]); // État pour stocker les données RIB
  const redirect = useRedirect(); // Hook pour la redirection

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

  // Transformation des données RIB pour les utiliser dans le composant SelectInput
  let rib_choices = ribAtner.map(({ id, nom, rib }) => ({
    id: id,
    name: `(${nom}) ${rib}`,
  }));

  // Fonction pour afficher une alerte de confirmation avant de sauvegarder l'état
  function regleeAlert(params) {
    if (params === "Reglee") {
      Swal.fire({
        title: "Êtes-vous sûr?",
        text: "Voulez-vous vraiment régler cet ordre de virement?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Oui, régler!",
      }).then((result) => {
        if (result.isConfirmed) {
          document.querySelector("#save").click(); // Clique sur le bouton de sauvegarde
          Swal.fire("Régler!", "Ordre de virement réglé.", "success");
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            "Modification annulée",
            "Ordre de virement n'a pas été modifié.",
            "error"
          );
          redirect("list", "ordervirement"); // Redirection vers la liste des ordres de virement
        }
      });
    } else if (params === "Annuler") {
      Swal.fire({
        title: "Êtes-vous sûr?",
        text: "Voulez-vous vraiment annuler cet ordre de virement?",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "Non!",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Oui, annuler!",
      }).then((result) => {
        if (result.isConfirmed) {
          document.querySelector("#save").click(); // Clique sur le bouton de sauvegarde
          Swal.fire("Annulé!", "Ordre de virement annulé.", "success");
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            "Modification annulée",
            "Ordre de virement n'a pas été modifié.",
            "error"
          );
          redirect("list", "ordervirement"); // Redirection vers la liste des ordres de virement
        }
      });
    }
  }

  // Utilisation des styles définis plus haut

  return (
    <Edit {...props}>
      <SimpleForm toolbar={<EditToolbar />}>
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
          inputProps={{ autoComplete: "off" }}
          source="id"
          disabled
        />
        {/* Champ d'affichage de l'ID, désactivé */}
        <FormDataConsumer>
          {({ formData, ...rest }) =>
            formData.etat !== "Reglee" &&
            formData.etat !== "Annuler" && ( // Affiche les champs suivants seulement si l'état n'est ni "Réglé" ni "Annulé"
              <>
                <SelectInput
                  sx={{ width: 650 }}
                  source="ribAtner"
                  validate={required()} // Validation requise
                  choices={rib_choices} // Options pour le champ de sélection
                  {...rest}
                />
                <SelectInput
                  sx={{ width: 650 }}
                  validate={required()} // Validation requise
                  source="etat"
                  onChange={(e) => {
                    regleeAlert(e.target.value); // Appel de la fonction regleeAlert au changement de valeur
                  }}
                  choices={[
                    { id: "En cours", name: "En cours" },
                    { id: "Reglee", name: "Réglé" },
                    { id: "Annuler", name: "Annuler" },
                  ]} // Options pour le champ de sélection de l'état
                />
                <SelectInput
                  sx={{ width: 650 }}
                  validate={required("Le directeur est obligatoire")}
                  emptyText="Sélectionnez le directeur"
                  source="directeursigne"
                  choices={[
                    { id: "Youness ZAMANI", name: "Youness ZAMANI" },
                    { id: "Mohamed ZAMANI", name: "Mohamed ZAMANI" },
                  ]}
                />
              </>
            )
          }
        </FormDataConsumer>
      </SimpleForm>
    </Edit>
  );
};
