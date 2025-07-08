import {
  DateTimeInput,
  Edit,
  SelectInput,
  SimpleForm,
  TextInput,
  useGetIdentity,
  required,
} from "react-admin";
import { useInputStyleFilters } from "../global/DarkInputStyle";

// Styles personnalisés pour les composants

export const TmpfournisseurEdit = () => {
  const { identity, isLoading, error } = useGetIdentity(); // Single call for identity
  if (isLoading) return <div>Chargement en cours...</div>;
  if (error) return <div>Une erreur est survenue.</div>;
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
          source="Validateur"
          sx={useInputStyleFilters}
        />
        <TextInput
          source="nom"
          slotProps={{
            input: {
              readOnly: true,
              autoComplete: "off",
            },
          }}
          sx={useInputStyleFilters}
        />
        <TextInput
          label="Acheteur"
          source="Redacteur"
          slotProps={{
            input: {
              readOnly: true,
              autoComplete: "off",
            },
          }}
          sx={useInputStyleFilters}
        />
        <DateTimeInput
          source="dateCreation"
          slotProps={{
            input: {
              readOnly: true,
              autoComplete: "off",
            },
          }}
          sx={{ width: 650 }}
        />
        <TextInput
          source="catFournisseur"
          slotProps={{
            input: {
              readOnly: true,
              autoComplete: "off",
            },
          }}
          sx={useInputStyleFilters}
        />
        <TextInput
          source="etat"
          slotProps={{
            input: {
              readOnly: true,
              autoComplete: "off",
            },
          }}
          sx={useInputStyleFilters}
        />
        <SelectInput
          sx={{ width: 650 }}
          source="etat"
          label="Etat de validation"
          validate={required()} // Validation requise
          choices={[
            { id: "Valide", name: "Valide" },
            { id: "Ignore", name: "Ignore" },
          ]}
        />
      </SimpleForm>
    </Edit>
  );
};
