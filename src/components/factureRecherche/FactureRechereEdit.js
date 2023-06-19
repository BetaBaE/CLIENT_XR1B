import { useEffect, useState } from "react";
import {
  AutocompleteInput,
  Edit,
  required,
  SelectInput,
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

export const FactureRechereEdit = (props) => {
  const dataProvider1 = useDataProvider();
  const dataProvider = useDataProvider();
  const [fournisseur, setFournisseur] = useState([]);
  const [facture, setFacture] = useState([]);
  const [fournisseurIdField, setFournisseurIdField] = useState(true);
  const [chantier, setChantier] = useState([]);

  function formatDate(string) {
    var options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toLocaleDateString([], options);
  }

  useEffect(() => {
    const fetchFournisseurs = async () => {
      try {
        const response = await dataProvider.getList("fournisseurs", {
          pagination: { page: 1, perPage: 3000 },
          sort: { field: "nom", order: "ASC" },
        });
        setFournisseur(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFournisseurs();
  }, [dataProvider]);

  const getFactureByFourniseur = (id) => {
    let url = `${apiUrl}/facturebyfournisseur/` + id;
    fetch(url)
      .then((response) => response.json())
      .then((json) => setFacture(json));
  };
  useEffect(() => {
    const fetchChantiers = async () => {
      try {
        const response = await dataProvider1.getList("chantier", {
          pagination: { page: 1, perPage: 3000 },
          sort: { field: "LIBELLE", order: "ASC" },
        });
        setChantier(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchChantiers();
  }, [dataProvider1]);

  let fournisseursChoices = fournisseur.map(({ id, nom, CodeFournisseur }) => ({
    id: id,
    name: `${nom} | ${CodeFournisseur}`,
  }));

  let factureChoices = facture.map(({ id, numeroFacture, TTC, DateFacture }) => ({
    id: id,
    name: `${numeroFacture} | ${TTC} DH | ${formatDate(DateFacture)}`,
  }));

  let chantierChoices = chantier.map(({ id, LIBELLE, CODEAFFAIRE }) => ({
    id: CODEAFFAIRE,
    name: `${LIBELLE} | ${CODEAFFAIRE}`,
  }));

  const classes = useStyles();

  return (
    <Edit {...props}>
      <SimpleForm>
      <AutocompleteInput
          label="chantier"
          validate={required("Le fournisseur est obligatoire")}
          className={classes.autocomplete}
          source="CODEAFFAIRE"
          choices={chantierChoices}
         
        />
        <AutocompleteInput
          label="Fournisseur"
          validate={required("Le fournisseur est obligatoire")}
          className={classes.autocomplete}
          source="idfournisseur"
          choices={fournisseursChoices}
          onChange={(e) => {
            if (!e) {
              setFournisseurIdField(true);
              getFactureByFourniseur(e);
            } else {
              setFournisseurIdField(false);
              getFactureByFourniseur(e);
            }
          }}
        />
        <SelectInput
   
          className={classes.autocomplete}
          source="idFacture"
          choices={factureChoices}
          label="Facture"
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