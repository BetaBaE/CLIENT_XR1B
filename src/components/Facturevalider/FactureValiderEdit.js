import {
  AutocompleteInput,
  Edit,
  ReferenceInput,
  regex,
  SelectInput,
  SimpleForm,
  TextInput,
  useGetIdentity,
} from "react-admin";

export const FactureValiderEdit = () => {
  const { identity, isLoading: identityLoading } = useGetIdentity();

  // Validation du bon de commande avec une expression régulière
  const validateBc = regex(
    /^CF[0-9]{3}[0-9]{3}$/,
    "Ce bon de commande n'est pas valide"
  );

  return (
    <Edit>
      <SimpleForm>
        <TextInput
          defaultValue={identity?.username}
          label="Vous êtes"
          slotProps={{
            input: {
              readOnly: true,
              autoComplete: "off",
            },
          }}
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
        <ReferenceInput
          source="codechantier"
          reference="Chantier"
          perPage={50}
          sort={{ field: "LIBELLE", order: "ASC" }}
        >
          <AutocompleteInput
            label="Chantier"
            sx={{ width: 650 }}
            filterToQuery={(searchText) => ({ q: searchText })}
            matchSuggestion={() => true}
            optionText={(record) =>
              record?.id ? `${record.LIBELLE} | ${record.id}` : ""
            }
          />
        </ReferenceInput>
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
