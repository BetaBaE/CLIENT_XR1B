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
} from "react-admin";
import Swal from "sweetalert2";

import { useInputStyleFilters } from "../global/DarkInputStyle";

// Toolbar personnalisée pour le formulaire d'édition
const UserEditToolbar = (props) => (
  <Toolbar {...props}>
    <SaveButton id="save" /> {/* Bouton de sauvegarde */}
  </Toolbar>
);

// Composant principal pour l'édition d'un virement
export const VirementFondEdit = (props) => {
  const redirect = useRedirect(); // Fonction pour rediriger après l'édition
  // Fonction pour afficher une alerte avant d'annuler un virement
  function annuleAlert(params) {
    if (params === "Annuler") {
      Swal.fire({
        title: "Êtes-vous sûr?",
        text: "Voulez-vous vraiment Annuler ce virement?",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "Non!",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Oui, Annule!",
      }).then((result) => {
        if (result.isConfirmed) {
          document.querySelector("#save").click(); // Clique sur le bouton de sauvegarde
          Swal.fire("Annulé!", "Virement annulé", "success");
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            "Modification annulée",
            "Aucune modification apportée au virement.",
            "error"
          );
          redirect("list", "virements"); // Redirection vers la liste des virements
        }
      });
    }
  }

  // Application des styles personnalisés

  return (
    <Edit {...props}>
      <SimpleForm toolbar={<UserEditToolbar />}>
        <TextInput
          sx={useInputStyleFilters}
          source="orderVirementId"
          slotProps={{
            input: {
              readOnly: true,
              autoComplete: "off",
            },
          }}
        />
        <TextInput
          sx={useInputStyleFilters}
          source="nom"
          slotProps={{
            input: {
              readOnly: true,
              autoComplete: "off",
            },
          }}
        />
        <TextInput
          sx={useInputStyleFilters}
          source="rib"
          slotProps={{
            input: {
              readOnly: true,
              autoComplete: "off",
            },
          }}
        />
        <NumberInput
          sx={useInputStyleFilters}
          source="montantVirement"
          slotProps={{
            input: {
              readOnly: true,
              autoComplete: "off",
            },
          }} // Champ désactivé
        />
        <FormDataConsumer>
          {({ formData, ...rest }) =>
            formData.Etat !== "Reglee" &&
            formData.Etat !== "Annuler" && (
              <SelectInput
                {...rest}
                source="Etat"
                sx={{ width: 650 }}
                onChange={(e) => {
                  console.log(e.target.value);
                  annuleAlert(e.target.value); // Appel de la fonction d'alerte
                }}
                validate={required()} // Validation requise
                choices={[
                  { id: "En cours", name: "En cours" },
                  { id: "Annuler", name: "Annuler" },
                ]}
              />
            )
          }
        </FormDataConsumer>

        <DateInput
          source="dateOperation"
          label="Date de l'opération"
          sx={{ width: 650 }}
        />
      </SimpleForm>
    </Edit>
  );
};
