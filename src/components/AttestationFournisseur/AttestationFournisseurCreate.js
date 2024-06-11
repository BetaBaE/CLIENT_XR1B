import { makeStyles } from "@material-ui/styles";
import React, { useState } from "react";
import { useEffect } from "react";
import { AutocompleteInput, Create, DateInput,required, SelectInput, SimpleForm,  TextInput,  useDataProvider, useGetIdentity } from "react-admin";

const useStyles = makeStyles(() => ({
  autocomplete: {
    width: "650px",
  },
  chip: {
    fontWeight: "bold",
  },
}));

const AttestationFournisseurCreate = (props) => {
  const { identity, isLoading: identityLoading } = useGetIdentity();
  const classes = useStyles();
  const [fournisseur, setFournisseur] = useState([]);
  const dataProvider = useDataProvider();
  useEffect(() => {
    dataProvider
      .getList("fournisseurs", {
        pagination: { page: 1, perPage: 10000 },
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
          source="redacteur"
        >
        </TextInput>
       
      <AutocompleteInput
          label="fournisseur"
          validate={required("choisir le fournisseur")}
          className={classes.autocomplete}
          source="idfournisseur"
          choices={fournisseur_choices}
          
        />
        <DateInput
          source="dateDebut"
          label="date debut convention"
          validate={[required("Date obligatoire")]}
          className={classes.autocomplete}
        />

<TextInput
          source="numAttestation"
          label="numero d'attestation"
          // validate={[required("Date obligatoire")]}
          className={classes.autocomplete}
        />



      </SimpleForm>
    </Create>
  );
};
export default AttestationFournisseurCreate;
