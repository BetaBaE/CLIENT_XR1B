import { useEffect, useState } from "react";
import {
  AutocompleteInput,
  Create,
  NumberInput,
  required,
  SimpleForm,
  useDataProvider,
} from "react-admin";

export const EcheancefournisseurCreate = () => {
  const dataProvider = useDataProvider();
  const [fournisseur, setFournisseur] = useState([]);
  useEffect(() => {
    dataProvider
      .getList("getAllFournissuersClean", {
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
  return (
    <Create title="Créer une échéance fournisseur">
      <SimpleForm>
        <AutocompleteInput
          label="fournisseur"
          validate={required("choisir le fournisseur")}
          // className={classes.autocomplete}
          source="idFournisseur"
          choices={fournisseur_choices}
        />
        {/* <NumberInput source="idFournisseur" label="Fournisseur" /> */}
        <NumberInput source="EcheanceJR" label="Echeance en Jour" />
        <NumberInput source="ConvJR" label="Convention en Jour" />
      </SimpleForm>
    </Create>
  );
};
