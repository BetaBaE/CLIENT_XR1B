import {
  Create,
  SimpleForm,
  TextInput,
  useGetIdentity,
  AutocompleteInput,
  required,
} from "react-admin";
import apiUrl from "../../config";
import useFetchFournisseurInternational from "../global/InternastionalFournisseur";
import { useTheme } from "@mui/material/styles";
export const DossierCreate = () => {
  const { identity } = useGetIdentity();
  const { fournisseurs, loading } = useFetchFournisseurInternational(apiUrl);
  const theme = useTheme();

  const inputSyle = {
    width: 650,
    input: {
      backgroundColor: theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
      color: theme.palette.mode === "dark" ? "#fff" : "inherit",
      borderRadius: "4px",
    },
  };

  if (loading) return <div>Chargement des fournisseurs...</div>;

  return (
    <Create>
      <SimpleForm>
        <TextInput
          slotProps={{
            input: {
              readOnly: true,
            },
          }}
          source="Redacteur"
          sx={inputSyle}
          label="Vous êtes"
          defaultValue={identity?.username}
        />
        <TextInput
          source="Libele"
          sx={inputSyle}
          validate={required("Ce champ est obligatoire")}
        />
        <AutocompleteInput
          label="Fournisseur"
          sx={inputSyle}
          source="idFournisseur"
          choices={fournisseurs}
          validate={required("Ce champ est obligatoire")}
        />
      </SimpleForm>
    </Create>
  );
};
