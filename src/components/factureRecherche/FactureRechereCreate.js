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
  ArrayInput,
  SimpleFormIterator,
  DateInput,
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
  const [factureSelected, setFactureSelected] = useState(null); // Change to null
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
        console.error(error); // Use console.error for errors
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
      console.error(error); // Use console.error for errors
    }
  };

  const fetchFactureByFournisseur = (id) => {
    fetch(`${apiUrl}/facturebyfournisseur/${id}`)
      .then((response) => response.json())
      .then((json) => setFacture(json))
      .catch((error) => {
        console.error(error); // Use console.error for errors
      });
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
        console.error(error); // Use console.error for errors
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

  const chantier_choices = chantier.map(({ id, LIBELLE }) => ({
    id: id,
    name: `${LIBELLE} | ${id} `,
  }));

  const { isLoading, error } = useGetIdentity();
  if (isLoading) return <>Loading</>;
  if (error) return <>Error</>;

  const validateBc = regex(/^CF[0-9]{3}[0-9]{3}$/, "Ce bon de commande n'est pas valide"); 
console.log("la facture ",factureSelected)
  return (
    <Create>
      <SimpleForm>
        <TextInput
          defaultValue={identity.fullName}
          label="Vous êtes"
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
              setFacture([]); // Clear facture when changing fournisseur
              setFactureSelected(null); // Clear selected facture
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
          emptyValue={null} // Use null instead of true
          onChange={(e) => {
            if (!e) {
              setFactureidField(true);
              setChantierIdField(false);
              setFactureSelected(null); // Clear selected facture
            } else {
              setFactureidField(false);
              setChantierIdField(true);
              fetchChantierByFactureId(e.target.value);
              setFactureSelected(e.target.value); // Set selected facture
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
              { id: 'QUALITE', name: 'Qualité' }, // Fix typo
              { id: 'MC', name: 'Moyen commun' },
            ]}
          />
        )}

     
        <TextInput
          label="Fiche navette"
          validate={required("La fiche navette est obligatoire")}
          className={classes.autocomplete}
          source="ficheNavette"
        />

        <TextInput
          label="Bon de commande d'avance"
          className={classes.autocomplete}
          validate={
            factureSelected === null
                ? required("Le bon de  commande est obligatoire")
                : null
            }
          source="Bcommande"
          disabled={factureSelected !== null}
        />
<TextInput
  label="Montant d'avance"
  className={classes.autocomplete}
  validate={(value) => {
    const numericValue = parseFloat(value);
    console.log("numericValue", numericValue);

    if (factureSelected === null) {
      return numericValue >= 1
        ? null
        : "Le montant d'avance doit être supérieur ou égal à 1";
    }

    if (facture.length === 0) {
      return required("Le montant d'avance est obligatoire");
    }

    if (
      factureSelected === null 
    ) {
      return "Le montant d'avance doit être supérieur à 0";
    }

    return null; 
  }}
  source="montantAvance"
  defaultValue={factureSelected === null ? null : 0}
  disabled={factureSelected !== null}
/>

<ArrayInput source="BonLivraisons">
          <SimpleFormIterator>
            <TextInput
              source="BonLivraison" 
              label="BonLivraison"
             
            />
            <DateInput
              source="Datelivraison"
                  label="date livraison"
            
            >


            </DateInput>
  </SimpleFormIterator>
        </ArrayInput>

      </SimpleForm>
    </Create>
  );
};
