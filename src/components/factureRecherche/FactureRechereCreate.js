import { useEffect, useState } from "react";
import {
  AutocompleteInput,
  Create,
  NumberInput,
  required,
  SelectInput,
  regex,
  SimpleForm,
  TextInput,
  useDataProvider,
} from "react-admin";
import { makeStyles } from "@material-ui/styles";
import apiUrl from "../../config";

const useStyles = makeStyles(() => ({
  autocomplete: {
    width: "650px",
  },
  chip: {
    fontWeight: "bold",
  },
}));

export const FactureRechereCreate = (props) => {
  const dataProvider = useDataProvider();
  const [fournisseur, setFournisseur] = useState([]);
  const [facture, setFacture] = useState([]);
  const [chantier, setChantier] = useState([]);
  const [fournisseurIdField, setFournisseurIdField] = useState(true);
  const [factureidField, setFactureidField] = useState(true);
  const [chantierIdField, setChantierIdField] = useState(false);

  const classes = useStyles();

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

  const getChantier = () => {
    let url = `${apiUrl}/Chantier?range=[0,1000]`;
    fetch(url)
      .then((response) => response.json())
      .then((json) => setChantier(json));
  };

  const getChantierByFactureId = (id) => {
    let url = `${apiUrl}/getchantierbyfactureid/` + id;
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        if (json && json.length > 0) {
          setChantier(json);
        } else {
          getChantier();
          setChantier([]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fournisseurs_choices = fournisseur.map(({ id, nom, CodeFournisseur }) => ({
    id: id,
    name: `${nom} | ${CodeFournisseur} `,
  }));

  const facture_choices = facture.map(({ id, numeroFacture, TTC, DateFacture }) => ({
    id: id,
    name: `${numeroFacture} | ${TTC} DH | ${formatDate(DateFacture)}`,
  }));

  const chantier_choices = chantier.map(({ id, LIBELLE, CODEAFFAIRE }) => ({
    id: id,
    name: `${LIBELLE} | ${CODEAFFAIRE} `,
  }));
  const validateBc = regex(
    /^CF[0-9]{3}[0-9]{3}$/,
    "ce bon commande n'est pas valide"
  );
  return (
    <Create>
      <SimpleForm>
        <AutocompleteInput
          label="Fournisseur"
          validate={required("Le fournisseur est obligatoire")}
          className={classes.autocomplete}
          source="idfournisseur"
          choices={fournisseurs_choices}
          onChange={(e) => {
            if (!e) {
              setFournisseurIdField(true);
              setChantierIdField(false);
            } else {
              setFournisseurIdField(false);
              setChantierIdField(true);
              getFactureByFournisseur(e);
              getChantier();
            }
          }}
        />

        <SelectInput
          disabled={fournisseurIdField}
          className={classes.autocomplete}
          source="idFacture"
          choices={facture_choices}
          label="Facture"
          emptyValue={true}
          onChange={(e) => {
            if (!e) {
              setFactureidField(true);
              setChantierIdField(false);
            } else {
              setFactureidField(false);
              setChantierIdField(true);
              getChantierByFactureId(e.target.value);
            }
          }}
        />

        {!factureidField ? (
          <AutocompleteInput
            validate={required("Le chantier est obligatoire")}
            className={classes.autocomplete}
            source="codechantier"
            choices={chantier_choices.map(({ id, name }) => ({
              id: id,
              name: name,
            }))}
          />
        ) : (
          <AutocompleteInput
            validate={required("Le chantier est obligatoire")}
            className={classes.autocomplete}
            source="codechantier"
            choices={chantier_choices.map(({ id, name }) => ({
              id: id,
              name: name,
            }))}
          />
        )}

        <TextInput
          label="Montant d'avance"
          className={classes.autocomplete}
          source="montantAvance"
          defaultValue={0}
        />

        <TextInput
          label="Fiche navette"
          validate={required("La confirmation est obligatoire")}
          className={classes.autocomplete}
          source="ficheNavette"
        />

        <TextInput
          label="Bon de commande d'avance"
          className={classes.autocomplete}
          source="Bcommande"
          validate={validateBc}
        />
      </SimpleForm>
    </Create>
  );
};
