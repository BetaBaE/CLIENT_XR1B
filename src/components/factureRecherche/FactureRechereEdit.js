import React, { useEffect, useState } from "react";
import {
  AutocompleteInput,
  Edit,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
  FormDataConsumer,
  Toolbar,
  SaveButton,
  useDataProvider,
  useRedirect,
  useGetIdentity,
} from "react-admin";
import { makeStyles } from "@material-ui/styles";
import apiUrl from "../../config";
import Swal from "sweetalert2";

const useStyles = makeStyles(() => ({
  autocomplete: {
    width: "650px",
  },
  chip: {
    fontWeight: "bold",
  },
}));

export const FactureRechereEdit = (props) => {
  const UserEditToolbar = (props) => (
    <Toolbar {...props}>
      <SaveButton id="save" />
    </Toolbar>
  );

  const dataProvider1 = useDataProvider();
  const [fournisseur, setFournisseur] = useState([]);
  const [facture, setFacture] = useState([{ id: "", BonCommande: "" }]);
  const dataProvider = useDataProvider();
  const [fournisseurIdField, setFournisseurIdField] = useState(true);
  const [chantier, setChantier] = useState([]);
  const { identity, isLoading: identityLoading } = useGetIdentity();
 
  const redirect = useRedirect();

  const annuleAlert = (params) => {
    if (params === "Annuler") {
      Swal.fire({
        title: "Êtes-vous sûr?",
        text: "Voulez-vous vraiment Annuler cette ficheNavette?",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "Non!",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Oui, Annule!",
      }).then((result) => {
        if (result.isConfirmed) {
          document.querySelector("#save").click();
          Swal.fire("Annulé!", "FicheNavette Annulée", "success");
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            "Modification annulée",
            "FicheNavette ne sera pas modifiée.",
            "error"
          );
          redirect("list", "factureRech");
        }
      });
    }
  };

  const formatDate = (string) => {
    var options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toLocaleDateString([], options);
  };

  useEffect(() => {
    dataProvider
      .getList("fournisseurs", {
        pagination: { page: 1, perPage: 3000 },
        sort: { field: "nom", order: "ASC" },
      })
      .then(({ data }) => {
        setFournisseur(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dataProvider]);

  const getFactureByFournisseur = (id) => {
    let url = `${apiUrl}/facturebyfournisseur/` + id;
    fetch(url)
      .then((response) => response.json())
      .then((json) => setFacture(json));
  };

  let facture_choices = { id: "", BonCommande: "" };
  let fournisseurs_choices = fournisseur.map(({ id, nom, CodeFournisseur }) => ({
    id: id,
    name: `${nom} | ${CodeFournisseur} `,
  }));
  facture_choices = facture.map(({ id, numeroFacture, TTC, DateFacture }) => ({
    id: id,
    name: `${numeroFacture} | ${TTC} DH | ${formatDate(DateFacture)}`,
  }));

  useEffect(() => {
    dataProvider1
      .getList("chantier", {
        pagination: { page: 1, perPage: 3000 },
        sort: { field: "LIBELLE", order: "ASC" },
      })
      .then(({ data }) => {
        setChantier(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dataProvider1]);

  let chantier_choices = chantier.map(({ id, LIBELLE }) => ({
    id: id,
    name: `${LIBELLE} | ${id} `,
  }));



  const classes = useStyles();

  const { isLoading, error } = useGetIdentity();
  if (isLoading) return <>Loading</>;
  if (error) return <>Error</>;

  return (
    <Edit {...props}>
      <SimpleForm toolbar={<UserEditToolbar />}>
      <TextInput
          defaultValue={identity.fullName}
          label="vous êtes"
          hidden={false}
          className={classes.autocomplete}
          disabled={true}
          source="Validateur"
        ></TextInput>
      
      
        <AutocompleteInput
          label="chantier"
          validate={required("Le fournisseur est obligatoire")}
          className={classes.autocomplete}
          source="codechantier"
          choices={chantier_choices}
        />
        <AutocompleteInput
          label="Fournisseur"
          validate={required("Le fournisseur est obligatoire")}
          className={classes.autocomplete}
          source="idfournisseur"
          choices={fournisseurs_choices}
          onChange={(e) => {
            if (!e) {
              setFournisseurIdField(true);
            } else {
              setFournisseurIdField(false);
              getFactureByFournisseur(e);
            }
          }}
        />
        <SelectInput
          disabled={fournisseurIdField}
          className={classes.autocomplete}
          source="idFacture"
          choices={facture_choices}
          label="facture"
          emptyValue={true}
        />
        <TextInput
          label="Montant d'avance"
          className={classes.autocomplete}
          source="montantAvance"
        />
        
        <TextInput
          label="Fiche navette"
          validate={required("La fiche navette est obligatoire")}
          className={classes.autocomplete}
          source="ficheNavette"
        />

       
      </SimpleForm>
      </Edit>
  );
};