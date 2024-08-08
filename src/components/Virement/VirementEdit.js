import { makeStyles } from "@material-ui/core"; // Importation des styles personnalisés
import {
  DateInput,
  Edit,
  FormDataConsumer,
  NumberInput,
  required,
  SaveButton,
  SelectInput,
  SimpleForm,
  TextInput,
  Toolbar,
  useRedirect,
} from "react-admin"; // Importation des composants de React Admin
import Swal from "sweetalert2"; // Importation de SweetAlert pour les alertes personnalisées

// Création de styles personnalisés avec makeStyles
const useStyles = makeStyles(() => ({
  autocomplete: {
    width: "650px", // Largeur des champs de saisie
  },
  chip: {
    fontWeight: "bold", // Poids de la police pour les éléments Chip
  },
}));

// Toolbar personnalisée avec un bouton de sauvegarde
const UserEditToolbar = (props) => (
  <Toolbar {...props}>
    <SaveButton id="save" />
  </Toolbar>
);

// Composant principal pour l'édition d'un virement
export const VirementEdit = (props) => {
  const redirect = useRedirect(); // Hook pour rediriger après une action

  // Fonction pour gérer l'alerte d'annulation
  function annuleAlert(params) {
    if (params === "Annuler") {
      Swal.fire({
        title: "Êtes-vous sûr?",
        text: "Voulez-vous vraiment Annule cette virement?",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "Non!",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Oui, Annule!",
      }).then((result) => {
        if (result.isConfirmed) {
          document.querySelector("#save").click(); // Clique sur le bouton de sauvegarde
          Swal.fire("Annule!", "Virement Annuler", "success");
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            "Modification annulée",
            "Virement pour ne pas changer.",
            "error"
          );
          redirect("list", "virements"); // Redirection vers la liste des virements
        }
      });
    }
  }

  const classes = useStyles(); // Application des styles personnalisés

  return (
    <Edit {...props}>
      <SimpleForm toolbar={<UserEditToolbar />}>
        <TextInput
          className={classes.autocomplete}
          source="orderVirementId"
          disabled // Champ désactivé
        />
        <TextInput className={classes.autocomplete} source="nom" disabled />
        <TextInput className={classes.autocomplete} source="rib" disabled />
        <NumberInput
          className={classes.autocomplete}
          source="montantVirement"
          disabled // Champ désactivé
        />
        <FormDataConsumer>
          {({ formData, ...rest }) =>
            formData.Etat !== "Reglee" &&
            formData.Etat !== "Annuler" && (
              <SelectInput
                {...rest}
                source="Etat"
                className={classes.autocomplete}
                onChange={(e) => {
                  console.log(e.target.value); // Affiche la valeur sélectionnée
                  annuleAlert(e.target.value); // Appelle la fonction d'alerte
                }}
                validate={required()} // Validation requise
                choices={[
                  { id: "Reglee", name: "Reglee" },
                  { id: "En cours", name: "En cours" },
                  { id: "Annuler", name: "Annuler" },
                ]}
              />
            )
          }
        </FormDataConsumer>

        <DateInput
          source="dateOperation"
          label="dateOperation"
          className={classes.autocomplete}
        ></DateInput>
      </SimpleForm>
    </Edit>
  );
};
