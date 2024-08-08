// Importation des modules et composants nécessaires depuis react-admin et autres bibliothèques
import { makeStyles } from "@material-ui/core";
import {
  DateInput,
  Edit,
  FormDataConsumer,
  required,
  SaveButton,
  SelectInput,
  SimpleForm,
  TextInput,
  Toolbar,
  useRedirect,
} from "react-admin";
import Swal from "sweetalert2";

// Définition des styles avec makeStyles de Material-UI
const useStyles = makeStyles(() => ({
  autocomplete: {
    width: "650px",
  },
  chip: {
    fontWeight: "bold",
  },
}));

// Composant personnalisé pour la barre d'outils de l'édition d'utilisateur
const UserEditToolbar = (props) => (
  <Toolbar {...props}>
    <SaveButton id="save" />
  </Toolbar>
);

// Composant ChequeEdit pour éditer les chèques
export const ChequeEdit = (props) => {
  const redirect = useRedirect(); // Hook pour rediriger les utilisateurs
  const classes = useStyles(); // Utilisation des styles définis

  // Fonction pour afficher une alerte de confirmation d'annulation
  function annuleAlert(params) {
    if (params === "Annuler") {
      Swal.fire({
        title: "Êtes-vous sûr?",
        text: "Voulez-vous vraiment annuler ce chèque?",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "Non!",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Oui, annuler!",
      }).then((result) => {
        if (result.isConfirmed) {
          document.querySelector("#save").click();
          Swal.fire("Annulé!", "Chèque annulé", "success");
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            "Modification annulée",
            "Le chèque n'a pas été modifié.",
            "error"
          );
          redirect("list", "cheque");
        }
      });
    }
  }

  // Composant pour la barre d'outils de l'édition avec le bouton de sauvegarde
  const EditToolbar = (props) => (
    <Toolbar {...props}>
      <SaveButton id="save" />
    </Toolbar>
  );

  return (
    <Edit {...props}>
      {/* Formulaire simple pour l'édition d'un chèque */}
      <SimpleForm toolbar={<UserEditToolbar />}>
        <FormDataConsumer>
          {({ formData, ...rest }) => (
            <>
              {/* Affiche les champs si l'état du chèque n'est ni "Reglee" ni "Annuler" */}
              {formData.Etat !== "Reglee" && formData.Etat !== "Annuler" && (
                <>
                  <DateInput
                    validate={required()}
                    source="dateOperation"
                    label="Date d'opération"
                    className={classes.autocomplete}
                  />
                  <SelectInput
                    {...rest}
                    source="Etat"
                    className={classes.autocomplete}
                    onChange={(e) => {
                      console.log(e.target.value);
                      annuleAlert(e.target.value);
                    }}
                    validate={required()}
                    choices={[
                      { id: "Reglee", name: "Reglee" },
                      { id: "En cours", name: "En cours" },
                      { id: "Annuler", name: "Annuler" },
                    ]}
                  />
                </>
              )}
            </>
          )}
        </FormDataConsumer>

        <TextInput
          source="numerocheque"
          label="Numéro de chèque"
          disabled
          className={classes.autocomplete}
        />
      </SimpleForm>
    </Edit>
  );
};
