import {
  AutocompleteInput,
  Create,
  DateInput,
  Edit,
  regex,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
  useDataProvider,
  useGetIdentity,
  useNotify,
  useTranslate,
} from "react-admin";
import { makeStyles } from "@material-ui/styles";
import { useEffect, useState } from "react";
import apiUrl from "../../config";
const useStyles = makeStyles(() => ({
  autocomplete: {
    width: "580px",
  },
  chip: {
    fontWeight: "bold",
  },
}));
export const FactureResEdit = () => {
  const classes = useStyles();
  const dataProvider1 = useDataProvider();
  const dataProvider2 = useDataProvider();
  const dataProvider = useDataProvider();
  const [fournisseurIdField, setFournisseurIdField] = useState(true);
  const [designation, setDesignation] = useState([]);
  // const [newIdentity, setNewIdentity] = useState('');
  const [tva, setTVA] = useState([]);
  const [fournisseur, setFournisseur] = useState([]);
  const [chantier, setChantier] = useState([]);
  const { identity, isLoading: identityLoading } = useGetIdentity();
  const notify = useNotify();
  const translate = useTranslate();

  // Intercepter la réponse de modification
  const handleOnSuccess = () => {
    // Personnaliser le message de succès
    const successMessage = translate('custom.messages.edit_success');
    notify(successMessage, 'success');
  };

  useEffect(() => {
    dataProvider2
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
}, [dataProvider2]);
let chantier_choices = chantier.map(({ id, LIBELLE, CODEAFFAIRE }) => ({
    id: id,
    name: `${LIBELLE} | ${CODEAFFAIRE} `,
}));
 
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
    let url = `${apiUrl}/designationbycode/` + id;
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
    <Edit label="ajouter"undoable={false}>
     <SimpleForm   redirect="list" saveOnEnter={false} onSuccess={handleOnSuccess}>
      <TextInput
          source="numeroFacture"
          label="numeroFacture"
          validate={required("Le numeroFacture est obligatoire")}
          className={classes.autocomplete}
        />
        <TextInput
          source="TTC"
          label="TTC"
          validate={required("Le MontantApayer est obligatoire")}
          className={classes.autocomplete}
        />
        <TextInput
          label="designation"
          validate={required(" selectionnez la designation")}
          className={classes.autocomplete}
          source="designation"
          disabled={true}
        />
        <TextInput
          source="BonCommande"
          label="BonCommande"
          validate={required("BonCommande obligatoire")}
          className={classes.autocomplete}
        />
        <TextInput
          label="fournisseur"
          validate={required("choisir le fournisseur")}
          className={classes.autocomplete}
          source="nom"
          disabled={true}
        />
        <DateInput
          source="DateFacture"
          label="date de la facture"
          validate={required("date obligatoire")}
          className={classes.autocomplete}
        >
 
        </DateInput>
      </SimpleForm>
    </Edit>
  );
};
