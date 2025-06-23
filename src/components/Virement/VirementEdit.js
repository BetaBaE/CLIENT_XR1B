// Importation des styles personnalisés
import {
  DateInput,
  Edit,
  NumberInput,
  required,
  SaveButton,
  SelectInput,
  SimpleForm,
  TextInput,
  Toolbar,
  useEditController,
  useRedirect,
} from "react-admin"; // Importation des composants de React Admin
import Swal from "sweetalert2"; // Importation de SweetAlert pour les alertes personnalisées
import { useTheme } from "@mui/material/styles"; // Importation du hook useTheme pour les styles Material-UI
// Toolbar personnalisée avec un bouton de sauvegarde
const UserEditToolbar = (props) => (
  <Toolbar {...props}>
    <SaveButton id="save" />
  </Toolbar>
);

// Composant principal pour l'édition d'un virement
export const VirementEdit = (props) => {
  const redirect = useRedirect(); // Hook pour rediriger après une action
  const { record } = useEditController();
  const theme = useTheme(); // Utilisation du thème Material-UI
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

  // Application des styles personnalisés

  return (
    <Edit {...props}>
      <SimpleForm toolbar={<UserEditToolbar />}>
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
          source="orderVirementId"
          slotProps={{
            input: {
              readOnly: true,
              autoComplete: "off",
            },
          }} // Champ désactivé
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
          source="nom"
          slotProps={{
            input: {
              readOnly: true,
              autoComplete: "off",
            },
          }}
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
          source="rib"
          slotProps={{
            input: {
              readOnly: true,
              autoComplete: "off",
            },
          }}
        />
        <NumberInput
          sx={{
            width: 650,
            input: {
              backgroundColor:
                theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
              color: theme.palette.mode === "dark" ? "#fff" : "inherit",
              borderRadius: "4px",
            },
          }}
          source="montantVirement"
          slotProps={{
            input: {
              readOnly: true,
              autoComplete: "off",
            },
          }}
        />
        <DateInput
          source="DateOperation"
          label="dateOperation"
          sx={{
            width: 650,
            input: {
              backgroundColor:
                theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
              color: theme.palette.mode === "dark" ? "#fff" : "inherit",
              borderRadius: "4px",
            },
          }}
          disabled={
            record.Etat === "Reglee" || record.Etat === "Annuler" ? true : false
          }
          validate={[required("Ce champ est obligatoire")]}
        />
        {/* <FormDataConsumer>
          {({ formData, ...rest }) =>
            formData.Etat !== "Reglee" &&
            formData.Etat !== "Annuler" && ( */}
        <SelectInput
          // {...rest}
          source="Etat"
          sx={{
            width: 650,
            input: {
              backgroundColor:
                theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
              color: theme.palette.mode === "dark" ? "#fff" : "inherit",
              borderRadius: "4px",
            },
          }}
          onChange={(e) => {
            console.log(e.target.value); // Affiche la valeur sélectionnée
            annuleAlert(e.target.value); // Appelle la fonction d'alerte
          }}
          validate={required()} // Validation requise
          disabled={
            record.Etat === "Reglee" || record.Etat === "Annuler" ? true : false
          }
          choices={[
            { id: "Reglee", name: "Reglee" },
            { id: "En cours", name: "En cours" },
            { id: "Annuler", name: "Annuler" },
          ]}
        />
        {/* </FormDataConsumer> */}
      </SimpleForm>
    </Edit>
  );
};
