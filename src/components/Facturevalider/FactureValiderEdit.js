import {
  AutocompleteInput,
  Edit,
  regex,
  SelectInput,
  SimpleForm,
  TextInput,
  useDataProvider,
  useGetIdentity,
} from "react-admin";

import { useEffect, useState } from "react";

export const FactureValiderEdit = () => {
  const [chantier, setChantier] = useState([]);

  const { identity, isLoading: identityLoading } = useGetIdentity();
  const dataProvider = useDataProvider();

  // Récupération des chantiers lors du montage du composant
  useEffect(() => {
    dataProvider
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
  }, [dataProvider]);

  // Validation du bon de commande avec une expression régulière
  const validateBc = regex(
    /^CF[0-9]{3}[0-9]{3}$/,
    "Ce bon de commande n'est pas valide"
  );

  // Transformation des chantiers pour le dropdown
  const chantierChoices = chantier.map(({ id, LIBELLE }) => ({
    id: id,
    name: `${LIBELLE} | ${id}`,
  }));

  return (
    <Edit>
      <SimpleForm>
        <TextInput
          defaultValue={identity?.fullName}
          label="Vous êtes"
          disabled={true}
          source="updatedBy"
        />
        <SelectInput
          source="verifiyMidelt"
          choices={[{ id: "verifié", name: "verifié" }]}
        />
        <TextInput
          source="BonCommande"
          label="Bon de Commande"
          validate={validateBc} // Ajout de la validation ici
        />
        <AutocompleteInput
          label="Chantier"
          source="codechantier"
          choices={chantierChoices}
          sx={{ width: 650 }}
        />
        <SelectInput
          sx={{ width: 650 }}
          source="CatFn"
          choices={[
            { id: "FET", name: "Fourniture Equipement Travaux" },
            { id: "Service", name: "Service" },
          ]}
          label="Catégorie de document"
        />
      </SimpleForm>
    </Edit>
  );
};
