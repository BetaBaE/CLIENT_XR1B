import {
  Edit,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
  useGetIdentity,
} from "react-admin";

export const DesignationEdit = () => {
  const { identity, isLoading: identityLoading } = useGetIdentity();

  return (
    <Edit>
      <SimpleForm>
        <TextInput
          defaultValue={identity?.fullName}
          label="vous êtes"
          hidden={false}
          sx={{ width: 650 }}
          disabled={true}
          source="ModifierPar"
        />
        <TextInput disabled source="designation" sx={{ width: 650 }} />
        <TextInput source="codeDesignation" sx={{ width: 650 }} />
        <TextInput source="PourcentageTVA" sx={{ width: 650 }} />
        <TextInput source="PosteTVA" sx={{ width: 650 }} />
        <SelectInput
          sx={{ width: 650 }}
          validate={required("Etat Designation est obligatoire")}
          source="Etat"
          label="Etat Designation"
          choices={[
            { id: "actif", name: "Actif" },
            { id: "inactif", name: "Inactif" },
          ]}
        />
      </SimpleForm>
    </Edit>
  );
};
