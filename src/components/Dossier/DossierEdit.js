import {
  Edit,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
  useRecordContext,
  SaveButton,
  Toolbar,
} from "react-admin";
import React from "react";
import { useInputStyle } from "../global/DarkInputStyle";

// Custom toolbar without the Delete button
const NoDeleteToolbar = (props) => (
  <Toolbar {...props}>
    <SaveButton />
  </Toolbar>
);

// SelectInput with conditional disabling
const EtatInput = ({ sx }) => {
  const record = useRecordContext();
  const isDisabled = record?.Etat === "Annuler" || record?.Etat === "Clouture";

  return (
    <SelectInput
      source="Etat"
      sx={sx}
      disabled={isDisabled}
      validate={required("Ce champ est obligatoire")}
      choices={[
        { id: "Ouvert", name: "Ouvert" },
        { id: "Clouture", name: "Clouture" },
        { id: "Annuler", name: "Annuler" },
      ]}
    />
  );
};

export const DossierEdit = () => {
  const inputSyle = useInputStyle();

  return (
    <Edit>
      <SimpleForm toolbar={<NoDeleteToolbar />}>
        <TextInput
          source="NumDossier"
          slotProps={{ input: { readOnly: true } }}
          sx={inputSyle}
        />
        <TextInput
          source="Libele"
          slotProps={{ input: { readOnly: true } }}
          sx={inputSyle}
        />
        <TextInput
          source="nom"
          slotProps={{ input: { readOnly: true } }}
          sx={inputSyle}
        />
        <EtatInput sx={inputSyle} />
      </SimpleForm>
    </Edit>
  );
};
