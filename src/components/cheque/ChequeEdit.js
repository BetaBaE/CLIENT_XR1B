// Importation des modules et composants nécessaires depuis react-admin et autres bibliothèques

import {
  DateInput,
  Edit,
  required,
  SaveButton,
  SelectInput,
  SimpleForm,
  TextInput,
  Toolbar,
  useEditController,
  useRedirect,
} from "react-admin";
import Swal from "sweetalert2";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import apiUrl from "../../config";
// Composant personnalisé pour la barre d'outils de l'édition d'utilisateur

// Composant ChequeEdit pour éditer les chèques
export const ChequeEdit = (props) => {
  const theme = useTheme(); // Utilisation du thème Material-UI
  const redirect = useRedirect(); // Hook pour rediriger les utilisateurs
  // Utilisation des styles définis
  const { record } = useEditController();
    const [orderVirement, setOrderVirement] = useState([]);
  
  console.log(record);
   useEffect(() => {
      fetch(`${apiUrl}/ribatner`)
        .then((response) => response.json())
        .then((json) => setOrderVirement(json));
    }, []);
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

    const orderVirement_choices = orderVirement.map(({ id, nom }) => ({
    id: id,
    name: nom,
  }));

  // Composant pour la barre d'outils de l'édition avec le bouton de sauvegarde
  const EditToolbar = (props) => (
    <Toolbar {...props}>
      <SaveButton id="save" />
    </Toolbar>
  );

  return (
    <Edit {...props}>
      {/* Formulaire simple pour l'édition d'un chèque */}
      <SimpleForm toolbar={<EditToolbar />}>
        <DateInput
          source="dateOperation"
          label="Date d'opération"
          sx={{ width: 650 }}
          disabled={
            record.Etat === "Reglee" || record.Etat === "Annuler" ? true : false
          }
          validate={[required("Ce champ est obligatoire")]}
        />
        <SelectInput
          source="Etat"
          sx={{ width: 650 }}
          onChange={(e) => {
            console.log(e.target.value);
            annuleAlert(e.target.value);
          }}
          validate={required()}
          disabled={
            record.Etat === "Reglee" || record.Etat === "Annuler" ? true : false
          }
          choices={[
            { id: "Reglee", name: "Reglee" },
            { id: "En cours", name: "En cours" },
            { id: "Annuler", name: "Annuler" },
          ]}
        />

        <TextInput
          source="numerocheque"
          label="Numéro de chèque"
          slotProps={{
            input: {
              readOnly: true,
            },
          }}
          sx={{
            width: 650,
            input: {
              backgroundColor:
                theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
              color: theme.palette.mode === "dark" ? "#fff" : "inherit",
              borderRadius: "4px",
            },
          }}
        />
        <SelectInput
          validate={required("Ce champ est obligatoire")}
          sx={{
            width: 650,
            input: {
              backgroundColor:
                theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
              color: theme.palette.mode === "dark" ? "#fff" : "inherit",
              borderRadius: "4px",
            },
          }}
          source="ribatnerid"
          label="banque"
          choices={orderVirement_choices}
          slotProps={{
            input: {
              readOnly: true,
            },
          }}
        />
      </SimpleForm>
    </Edit>
  );
};
