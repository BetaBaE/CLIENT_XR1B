import React, { useState } from "react";
import { useEffect } from "react";
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

const EcheanceLoiCreate = (props) => {
  const { identity, isLoading: identityLoading } = useGetIdentity();

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
          sx={{ width: 650 }}
          disabled={true}
          source="Redacteur"
        ></TextInput>
        <AutocompleteInput
          label="fournisseur"
          validate={required("choisir le fournisseur")}
          sx={{ width: 650 }}
          source="idfournisseur"
          choices={fournisseur_choices}
        />
        <DateInput
          source="dateecheance"
          label="date debut convention"
          validate={[required("Date obligatoire")]}
          sx={{ width: 650 }}
        />

        <SelectInput
          source="modalitePaiement"
          sx={{ width: 650 }}
          label="Échéance loi"
          choices={[
            { id: "30", name: "30jour net" },
            { id: "30fm", name: "30jour fin de mois" },
            { id: "60", name: "60 NET" },
            { id: "60fm", name: "60jour fin de mois" },
            { id: "90", name: "90 NET" },
            { id: "90fm", name: "90jour fin de mois" },
            { id: "120", name: "120Net" },
            { id: "120fm", name: "120jour fin de mois" },
          ]}
        />
      </SimpleForm>
    </Create>
  );
};
export default EcheanceLoiCreate;
