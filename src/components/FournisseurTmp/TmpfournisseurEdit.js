import {
  DateTimeInput,
  Edit,
  SelectInput,
  SimpleForm,
  TextInput,
  useGetIdentity,
} from "react-admin";
import { useTheme } from "@mui/material/styles";
import { required } from "react-admin";

// Styles personnalisés pour les composants

export const TmpfournisseurEdit = () => {
  const { identity, isLoading, error } = useGetIdentity(); // Single call for identity
  const theme = useTheme();
  if (isLoading) return <div>Chargement en cours...</div>;
  if (error) return <div>Une erreur est survenue.</div>;
  return (
    <Edit>
      <SimpleForm>
        <TextInput
          defaultValue={identity?.fullName}
          label="Vous êtes"
          slotProps={{
            input: {
              readOnly: true,
              autoComplete: "off",
            },
          }}
          source="Validateur"
          sx={{
            width: 650,
            input: {
              backgroundColor:
                theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
              color: theme.palette.mode === "dark" ? "#fff" : "inherit",
              borderRadius: "4px",
            },
          }}
          inputProps={{ autoComplete: "off" }}
        />
        <TextInput
          source="nom"
          slotProps={{
            input: {
              readOnly: true,
              autoComplete: "off",
            },
          }}
          sx={{
            width: 650,
            input: {
              backgroundColor:
                theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
              color: theme.palette.mode === "dark" ? "#fff" : "inherit",
              borderRadius: "4px",
            },
          }}
          inputProps={{ autoComplete: "off" }}
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
          sx={{
            width: 650,
            input: {
              backgroundColor:
                theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
              color: theme.palette.mode === "dark" ? "#fff" : "inherit",
              borderRadius: "4px",
            },
          }}
          inputProps={{ autoComplete: "off" }}
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
          sx={{
            width: 650,
            input: {
              backgroundColor:
                theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
              color: theme.palette.mode === "dark" ? "#fff" : "inherit",
              borderRadius: "4px",
            },
          }}
          inputProps={{ autoComplete: "off" }}
        />
        <TextInput
          source="etat"
          slotProps={{
            input: {
              readOnly: true,
              autoComplete: "off",
            },
          }}
          sx={{
            width: 650,
            input: {
              backgroundColor:
                theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
              color: theme.palette.mode === "dark" ? "#fff" : "inherit",
              borderRadius: "4px",
            },
          }}
          inputProps={{ autoComplete: "off" }}
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
