import {
  AutocompleteInput,
  Create,
  DateInput,
  regex,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
  useDataProvider,
  useGetIdentity,
} from "react-admin";
import { makeStyles } from "@material-ui/styles";
import { useEffect, useState } from "react";
const useStyles = makeStyles(() => ({
  autocomplete: {
    width: "580px",
  },
  chip: {
    fontWeight: "bold",
  },
}));
export const FactureResCreate = () => {
  const classes = useStyles();
  const dataProvider1 = useDataProvider();
  const dataProvider = useDataProvider();
  const [fournisseurIdField, setFournisseurIdField] = useState(true);
  const [designation, setDesignation] = useState([]);
  // const [newIdentity, setNewIdentity] = useState('');
  const [tva, setTVA] = useState([]);
  const [fournisseur, setFournisseur] = useState([]);

  const { identity, isLoading: identityLoading } = useGetIdentity();
  useEffect(() => {
    dataProvider1
      .getList("designation", {
        pagination: { page: 1, perPage: 3000 },
        sort: { field: "id", order: "ASC" },
      })

      .then(({ data }) => {
        setDesignation(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dataProvider1]);

  useEffect(() => {
    dataProvider
      .getList("fournisseurs", {
        pagination: { page: 1, perPage: 3000 },
        sort: { field: "id", order: "ASC" },
      })

      .then(({ data }) => {
        setFournisseur(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dataProvider]);

  let fournisseur_choices = fournisseur.map(({ id, nom, CodeFournisseur }) => ({
    id: id,
    name: `${nom} | ${CodeFournisseur} `,
  }));

  let designation_choices = designation.map(({ id, designation }) => ({
    id: id,
    name: `${designation} `,
  }));
  const getTVA = (id) => {
    let url = "http://localhost:8080/designationbycode/" + id;
    // console.log(url);
    fetch(url)
      .then((response) => response.json())
      .then((json) => setTVA(json));
  };
  let tva_choices = tva.map(({ id, PourcentageTVA }) => ({
    id: id,
    name: `${PourcentageTVA}% `,
  }));
  const { isLoading, error } = useGetIdentity();
  if (isLoading) return <>Loading</>;
  if (error) return <>Error</>;
  const validateBc = regex(
    /^CF[0-9]{3}[0-9]{3}$/,
    "ce bon commande n'est pas valide"
  );
  const validateprice = regex(
    /[+-]?([0-9]*[.])?[0-9]+/,
    "ce prix  n'est pas au bon format"
  );
  return (
    <Create label="ajouter">
      <SimpleForm>
        <TextInput
          defaultValue={identity.fullName}
          label="vous êtes"
          hidden={false}
          className={classes.autocomplete}
          disabled={true}
          source="fullName"
        ></TextInput>
        <TextInput
          source="numeroFacture"
          label="numeroFacture"
          validate={required("Le numeroFacture est obligatoire")}
          className={classes.autocomplete}
        />
        <TextInput
          source="TTC"
          label="TTC"
          validate={[
            required("Le MontantApayer est obligatoire"),
            validateprice,
          ]}
          className={classes.autocomplete}
        />
        <AutocompleteInput
          label="designation"
          validate={required(" selectionnez la designation")}
          className={classes.autocomplete}
          source="codechantier"
          choices={designation_choices}
          onChange={(e) => {
            if (!e) {
              setFournisseurIdField(true);
            } else {
              setFournisseurIdField(false);
              getTVA(e);
            }
          }}
        />
        <SelectInput
          validate={required("Ce champ est obligatoire")}
          disabled={fournisseurIdField}
          className={classes.autocomplete}
          source="iddesignation"
          choices={tva_choices}
          label="Pourcentage TVA"
        />
        <TextInput
          source="BonCommande"
          label="BonCommande"
          validate={validateBc}
          className={classes.autocomplete}
        />

        <AutocompleteInput
          label="fournisseur"
          validate={required("choisir le fournisseur")}
          className={classes.autocomplete}
          source="idfournisseur"
          choices={fournisseur_choices}
        />
        <DateInput
          source="DateFacture"
          label="date de la facture"
          validate={required("date obligatoire")}
          className={classes.autocomplete}
        />
      </SimpleForm>
    </Create>
  );
};
