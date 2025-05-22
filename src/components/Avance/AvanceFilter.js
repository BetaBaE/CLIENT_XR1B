import React from "react";
import { Filter, regex, SelectInput, TextInput } from "react-admin";
import { useTheme } from "@mui/material/styles";
const validateNoSpecialChars = regex(
  /^[a-zA-Z0-9 ]*$/,
  "Interdit les caractères spéciaux"
);
const AvanceFilter = (props) => {
  const theme = useTheme();
  return (
    <Filter {...props}>
      <TextInput
        source="BonCommande"
        label="BonCommande"
        validate={[validateNoSpecialChars]}
        sx={{
          input: {
            backgroundColor: theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
            color: theme.palette.mode === "dark" ? "#fff" : "inherit",
            borderRadius: "4px",
          },
        }}
      />
      {/* <TextInput
        source="chantier"
        label="chantier"
        validate={[validateNoSpecialChars]}
      /> */}
      <TextInput
        source="fournisseur"
        label="fournisseur"
        validate={[validateNoSpecialChars]}
        sx={{
          input: {
            backgroundColor: theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
            color: theme.palette.mode === "dark" ? "#fff" : "inherit",
            borderRadius: "4px",
          },
        }}
      />

      <TextInput
        source="ficheNavette"
        label="ficheNavette"
        validate={[validateNoSpecialChars]}
        sx={{
          input: {
            backgroundColor: theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
            color: theme.palette.mode === "dark" ? "#fff" : "inherit",
            borderRadius: "4px",
          },
        }}
      />

      <SelectInput
        source="Etat"
        label="Etat Restit"
        required
        choices={[
          { id: "Annuler", name: "Annuler" },
          { id: "En cours", name: "En cours" },
          { id: "Reglee", name: "Reglee" },
        ]}
        sx={{
          input: {
            backgroundColor: theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
            color: theme.palette.mode === "dark" ? "#fff" : "inherit",
            borderRadius: "4px",
          },
        }}
      />
    </Filter>
  );
};

export default AvanceFilter;
