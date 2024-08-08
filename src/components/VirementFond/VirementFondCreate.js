import { useEffect, useState } from "react";
import {
  AutocompleteInput,
  Create,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
  useGetIdentity,
} from "react-admin";
import { makeStyles } from "@material-ui/styles";
import apiUrl from "../../config";

// Styles personnalisés pour le formulaire
const useStyles = makeStyles(() => ({
  autocomplete: {
    width: "650px", // Largeur des champs de saisie
  },
  chip: {
    fontWeight: "bold", // Style pour les chips (non utilisé ici)
  },
  // Styles pour SweetAlert
  "swal2-popup.swal2-left": {
    right: 0,
    transform: "translateX(0)",
  },
}));

// Composant pour la création d'un virement
export const VirementFondCreate = () => {
  const { identity, isLoading: identityLoading } = useGetIdentity(); // Récupération de l'identité de l'utilisateur
  const [orderVirement, setOrderVirement] = useState([
    // État pour les commandes de virement
    {
      id: "null",
      ribAtner: 0,
      datecreation: "",
      etat: "",
    },
  ]);
  const [RibAtner, setRibAtner] = useState([
    // État pour les RIB des bénéficiaires
    {
      nom: "",
      id: 0,
      rib: "",
      validation: "",
    },
  ]);
  const [orderVirementField, setOrderVirementField] = useState(true); // État pour contrôler l'affichage du champ de commande de virement

  // Récupération des commandes de virement en cours
  useEffect(() => {
    fetch(`${apiUrl}/ordervirementencoursFond`)
      .then((response) => response.json())
      .then((json) => setOrderVirement(json));
  }, []);

  // Récupération des RIB validés pour une commande de virement spécifique
  const getFournisseurFilteredByOv = (id) => {
    fetch(`${apiUrl}/ribatnerValid/${id}?ordervirment={"id":"${id}"}`)
      .then((response) => response.json())
      .then((json) => setRibAtner(json));
  };

  // Préparation des choix pour le champ Select des commandes de virement
  let orderVirement_choices = orderVirement.map(({ id }) => ({
    id: id,
    name: id,
  }));

  // Préparation des choix pour le champ Autocomplete des RIB des bénéficiaires
  let ribAtner_choices = RibAtner.map(({ id, nom, rib }) => ({
    id: id,
    name: `${nom}|||${rib}`,
  }));

  const classes = useStyles();
  const { isLoading, error } = useGetIdentity(); // Vérification de l'état de chargement de l'identité
  if (isLoading) return <>Loading</>; // Affichage d'un message de chargement
  if (error) return <>Error</>; // Affichage d'un message d'erreur

  return (
    <Create>
      <SimpleForm>
        <TextInput
          defaultValue={identity?.fullName} // Affichage du nom de l'utilisateur
          label="vous êtes"
          hidden={false}
          className={classes.autocomplete}
          disabled={true} // Champ désactivé
          source="Redacteur"
        />
        <SelectInput
          validate={required("Ce champ est obligatoire")} // Validation requise
          className={classes.autocomplete}
          source="orderVirementFondId"
          onChange={(e) => {
            if (e.target.value === "") {
              setOrderVirementField(true);
            } else {
              setOrderVirementField(false);
              getFournisseurFilteredByOv(e.target.value); // Récupération des RIB pour la commande sélectionnée
            }
          }}
          choices={orderVirement_choices}
        />
        <AutocompleteInput
          validate={required("Ce champ est obligatoire")} // Validation requise
          disabled={orderVirementField} // Champ désactivé si nécessaire
          className={classes.autocomplete}
          source="RibAtnerDestId"
          choices={ribAtner_choices}
        />

        <TextInput
          validate={[required("Le Montant est obligatoire")]} // Validation requise
          className={classes.autocomplete}
          source="montantVirement"
        />
      </SimpleForm>
    </Create>
  );
};
