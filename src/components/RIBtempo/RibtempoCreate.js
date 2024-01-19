import { makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import {
  AutocompleteInput,
  Create,
  FileField,
  FileInput,
  regex,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
  useDataProvider,
  useGetIdentity,
} from "react-admin";

const useStyles = makeStyles(() => ({
  autocomplete: {
    width: "650px",
  },
  chip: {
    fontWeight: "bold",
  },
}));

export const RibtempoCreate = (props) => {
  const dataProvider = useDataProvider();
  const [fournisseurs, setFournisseurs] = useState([]);

  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState();
  useEffect(() => {
    dataProvider
      .getList("fournisseurs", {
        pagination: { page: 1, perPage: 3000 },
        sort: { field: "nom", order: "ASC" },
      })
      .then(({ data }) => {
        setFournisseurs(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dataProvider]);

  let fournisseur_choices = fournisseurs.map(({ id, nom }) => ({
    id: id,
    name: nom,
  }));
  const validateRib = regex(
    /^[0-9]{3}\s[0-9]{3}\s[0-9]{3}\s[0-9]{3}\s[0-9]{3}\s[0-9]{3}\s[0-9]{3}\s[0-9]{3}$/,
    "Le RIB doit être de la forme 111 222 333 444 555 666 777 888"
  );
  const { identity, isLoading: identityLoading } = useGetIdentity();
  // console.log(project_choices);
  // TODO: [0-9]{3}\s[0-9]{3}\s[0-9]{3}\s[0-9]{3}\s[0-9]{3}\s[0-9]{3}\s[0-9]{3}\s[0-9]{3}

  useEffect(() => {
    // Désactiver l'autocomplétion après le chargement du DOM
    const inputrib = document.getElementById("rib");
    const inputswift = document.getElementById("swift");
 
    if (inputrib ||inputswift  ) {
      inputrib.autocomplete = "off";
      inputswift.autocomplete = "off";
     
    }
  }, []);

  const classes = useStyles();
  const { isLoading, error } = useGetIdentity();
  if (isLoading) return <>Loading</>;
  if (error) return <>Error</>;
  return (
    <Create>
      <SimpleForm {...props}>
      <TextInput
          defaultValue={identity?.fullName}
          label="vous êtes"
          hidden={false}
          className={classes.autocomplete}
          disabled={true}
          source="Redacteur"
        >

        </TextInput>
       
        <AutocompleteInput
          label="Fournisseur"
          validate={required("Le fournisseur est obligatoire")}
          className={classes.autocomplete}
          source="FournisseurId"
          choices={fournisseur_choices}
        />
        <TextInput
          validate={[validateRib, required("Le RIB est obligatoire")]}
          className={classes.autocomplete}
          source="rib"
        />
         <TextInput
          className={classes.autocomplete}
          source="swift"
        />
       <SelectInput
           source="banque"
           label="banque"
           choices={[
            { id: "ABB", name: "Al Barid Bank" },
            { id: "AWB", name: "Attijari wafa banque" },
            { id: "CDM", name: "Credit du Maroc" },
            {id: "CAM",name: "Crédit agricole du Maroc"},
            {id: "CIH", name: "CIH" },
            {id: "BMCI", name: "Banque marocaine pour le commerce et l'industrie" },
            {id: "BMCE",name: "BMCE"},
            {id: "BCP",name: "Banque centrale populaire"},
            {id: "Arab Bank", name: "Arab Bank Maroc" },
            {id: "BAA", name: "Bank Al Amal" },
            {id: "CitiBank", name: "Citibank Morocco" },
            {id: "CFG", name: "CFG Bank" },
            {id: "Société générale Maroc",name: "SGMB"},
            {id: "Banco Sabadell",name: "Banco Sabadell Maroc"},
            {id: "La Caixa", name: "Caixabank"}
          ]}>
        </SelectInput>
<FileInput source="path_rib"  
           label="Uploder rib" accept="application/pdf,image/png,image/jpeg" 
        className={classes.autocomplete}>
    <FileField source="src" title="title"

    />
</FileInput>
      </SimpleForm>
    </Create>
  );
};
