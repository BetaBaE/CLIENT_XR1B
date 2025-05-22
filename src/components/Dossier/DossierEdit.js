import {
  Edit,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
} from "react-admin";

export const DossierEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="NumDossier" disabled sx={{ width: 650 }} />
        <TextInput source="Libele" disabled sx={{ width: 650 }} />
        <TextInput source="nom" disabled sx={{ width: 650 }} />
        <SelectInput
          source="Etat"
          sx={{ width: 650 }}
          validate={required("Ce champ est obligatoire")}
          choices={[
            { id: "Ouvert", name: "Ouvert" },
            { id: "Clouture", name: "Clouture" },
            { id: "Annuler", name: "Annuler" },
          ]}
        />
      </SimpleForm>
    </Edit>
  );
};
