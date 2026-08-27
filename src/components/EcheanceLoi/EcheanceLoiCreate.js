import React from "react";
import {
  AutocompleteInput,
  Create,
  DateInput,
  regex,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
  ReferenceInput,
  useGetIdentity,
} from "react-admin";

const EcheanceLoiCreate = (props) => {
  const { identity, isLoading: identityLoading } = useGetIdentity();

  const { isLoading, error } = useGetIdentity();
  if (isLoading) return <>Loading</>;
  if (error) return <>Error</>;

  return (
    <Create>
      <SimpleForm {...props}>
        <TextInput
          defaultValue={identity?.username}
          label="vous êtes"
          hidden={false}
          sx={{ width: 650 }}
          slotProps={{
            input: {
              readOnly: true,
            },
          }}
          source="Redacteur"
        ></TextInput>
        <ReferenceInput
          source="idfournisseur"
          reference="fournisseurs"
          perPage={50}
          sort={{ field: "nom", order: "ASC" }}
        >
          <AutocompleteInput
            label="fournisseur"
            validate={required("choisir le fournisseur")}
            sx={{ width: 650 }}
            filterToQuery={(searchText) => ({ q: searchText })}
            matchSuggestion={() => true}
            optionText={(record) =>
              record?.id ? `${record.nom} | ${record.CodeFournisseur} ` : ""
            }
          />
        </ReferenceInput>
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
