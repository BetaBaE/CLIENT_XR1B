import React, { useEffect, useState } from "react";
import {
  AutocompleteInput,
  Create,
  required,
  SelectInput,
  regex,
  SimpleForm,
  TextInput,
  useDataProvider,
  useGetIdentity,
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

const formatDate = (string) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(string).toLocaleDateString([], options);
};

export const FactureRechereCreate = (props) => {
  const dataProvider = useDataProvider();
  const [fournisseur, setFournisseur] = useState([]);
  const [facture, setFacture] = useState([]);
  const [chantier, setChantier] = useState([]);
  const [fournisseurIdField, setFournisseurIdField] = useState(true);
  const [factureidField, setFactureidField] = useState(true);
  const [chantierIdField, setChantierIdField] = useState(false);
  const [selectedCodeChantier, setSelectedCodeChantier] = useState("");
  const { identity, isLoading: identityLoading } = useGetIdentity();
  const classes = useStyles();

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

  const fetchChantier = async () => {
    try {
      const response = await fetch(`${apiUrl}/Chantier?range=[0,1000]`);
      const json = await response.json();
      setChantier(json);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFactureByFournisseur = (id) => {
    fetch(`${apiUrl}/facturebyfournisseur/${id}`)
      .then((response) => response.json())
      .then((json) => setFacture(json));
  };

  const fetchChantierByFactureId = (id) => {
    fetch(`${apiUrl}/getchantierbyfactureid/${id}`)
      .then((response) => response.json())
      .then((json) => {
        if (json && json.length > 0) {
          setChantier(json);
        } else {
          fetchChantier();
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
  
  const { isLoading, error } = useGetIdentity();
  if (isLoading) return <>Loading</>;
  if (error) return <>Error</>;
  
  const validateBc = regex(
    /^CF[0-9]{3}[0-9]{3}$/,
    "ce bon commande n'est pas valide"
  );

  return (
    <Create>
      <SimpleForm>
        <TextInput
          defaultValue={identity.fullName}
          label="vous êtes"
          hidden={false}
          className={classes.autocomplete}
          disabled={true}
          source="fullName"
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
              setChantierIdField(false);
            } else {
              setFournisseurIdField(false);
              setChantierIdField(true);
              fetchFactureByFournisseur(e);
              fetchChantier();
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
              fetchChantierByFactureId(e.target.value);
            }
          }}
        />

        <AutocompleteInput
          validate={required("Le chantier est obligatoire")}
          className={classes.autocomplete}
          source="codechantier"
          choices={chantier_choices.map(({ id, name }) => ({
            id: id,
            name: name,
          }))}
          onChange={(e) => {
            setSelectedCodeChantier(e);
          }}
        />

        {selectedCodeChantier === "A-9999" && (
          <SelectInput
            className={classes.autocomplete} 
            source="service"
            choices={[
              { id: 'comm', name: 'Communication' },
              { id: 'SI', name: 'Service informatique' },
              { id: 'RH', name: 'Ressource Humaine' },
              { id: 'QUALITE', name: 'QUALITE' },
              { id: 'MC', name: 'Moyen commun' },
            ]}
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


