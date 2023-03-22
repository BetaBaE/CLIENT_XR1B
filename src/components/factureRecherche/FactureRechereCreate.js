import { useEffect, useState } from "react";
import {
  AutocompleteInput,
  Create,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
  useDataProvider,
} from "react-admin";
import { makeStyles } from "@material-ui/styles";
const useStyles = makeStyles(() => ({
  autocomplete: {
    width: "650px",
  },
  chip: {
    fontWeight: "bold",
  },
}));
export const FactureRechereCreate = (props) => {
  const dataProvider1 = useDataProvider();
  const [fournisseur, setFournisseur] = useState([]);
  const [facture, setFacture] = useState([{ id: "", BonCommande: "" }]);
  const dataProvider = useDataProvider();

  const [fournisseurIdField, setFournisseurIdField] = useState(true);
  const [chantier, setChantier] = useState([]);
  // const [onchangefacture, setOnchangefacture] = useState([]);
  // const [BCommande, setBcommande] = useState([{ id: '', BonCommande: '' }]);
  function formatDate(string) {
    var options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toLocaleDateString([], options);
  }
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
  const getFactureByFourniseur = (nom) => {
    let url = "http://localhost:8080/facturebyfournisseur/" + nom;
    fetch(url)
      .then((response) => response.json())
      .then((json) => setFacture(json));
  };
  let facture_choices = { id: "", BonCommande: "" };
  let fournisseurs_choices = fournisseur.map(({ nom, CodeFournisseur }) => ({
    id: nom,
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
  let chantier_choices = chantier.map(({ id, LIBELLE, CODEAFFAIRE }) => ({
    id: id,
    name: `${LIBELLE} | ${CODEAFFAIRE} `,
  }));
  // const validateBc = regex(
  //   /^CF[0-9]{3}[0-9]{3}$/,
  //   "ce bon commande n'est pas valide"
  // );
  const classes = useStyles();
  return (
    <Create>
      <SimpleForm>
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
          source="orderVirementId"
          choices={fournisseurs_choices}
          onChange={(e) => {
            // setOnchangefournisseur(e);
            if (!e) {
              setFournisseurIdField(true);
            } else {
              setFournisseurIdField(false);
              getFactureByFourniseur(e);
            }
          }}
        />
        <SelectInput
          validate={required("Ce champ est obligatoire")}
          disabled={fournisseurIdField}
          className={classes.autocomplete}
          source="idFacture"
          choices={facture_choices}
          label="facture"
        />
        <TextInput
          label="Fiche navette"
          validate={required("La confirmation est obligatoire")}
          className={classes.autocomplete}
          source="ficheNavette"
        />
      </SimpleForm>
    </Create>
  );
};
