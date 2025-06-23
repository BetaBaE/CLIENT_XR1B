import React, { useEffect, useState } from "react";
import {
  AutocompleteInput,
  Create,
  DateInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
  useDataProvider,
  useGetIdentity,
} from "react-admin";

const EcheanceReelCreate = (props) => {
  const { identity, isLoading: identityLoading } = useGetIdentity();

  const [fournisseur, setFournisseur] = useState([]);
  const dataProvider = useDataProvider();

  useEffect(() => {
    // Récupération des fournisseurs
    dataProvider
      .getList("fournisseurswithecheanceLoi", {
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

  // Préparation des choix pour l'Autocomplete
  const fournisseur_choices = fournisseur.map(
    ({ id, nom, CodeFournisseur }) => ({
      id: id,
      name: `${nom} | ${CodeFournisseur}`,
    })
  );

  // Gestion des états de chargement et d'erreur
  if (identityLoading) return <>Loading</>;
  if (!identity) return <>Error</>;

  return (
    <Create>
      <SimpleForm {...props}>
        <TextInput
          defaultValue={identity?.fullName}
          label="Vous êtes"
          slotProps={{
            input: {
              readOnly: true,
            },
          }}
          sx={{ width: 650 }}
          source="Redacteur"
        />

        <AutocompleteInput
          label="Fournisseur"
          validate={required("Choisir le fournisseur")}
          sx={{ width: 650 }}
          source="idfournisseur"
          choices={fournisseur_choices}
        />

        <DateInput
          source="dateecheance"
          label="Date début convention"
          validate={required("Date obligatoire")}
          sx={{ width: 650 }}
        />

        <SelectInput
          source="modalitePaiement"
          sx={{ width: 650 }}
          label="Échéance réelle"
          choices={[
            { id: "30", name: "30 jours net" },
            { id: "30fm", name: "30 jours fin de mois" },
            { id: "60", name: "60 NET" },
            { id: "60fm", name: "60 jours fin de mois" },
            { id: "90", name: "90 NET" },
            { id: "90fm", name: "90 jours fin de mois" },
            { id: "120", name: "120 NET" },
            { id: "120fm", name: "120 jours fin de mois" },
          ]}
        />
      </SimpleForm>
    </Create>
  );
};

export default EcheanceReelCreate;
