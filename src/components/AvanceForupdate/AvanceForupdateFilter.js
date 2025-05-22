import React from "react";
import { Filter, regex, TextInput } from "react-admin";
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
        sx={{
          input: {
            backgroundColor: theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
            color: theme.palette.mode === "dark" ? "#fff" : "inherit",
            borderRadius: "4px",
          },
        }}
        source="BonCommande"
        label="BonCommande"
        validate={[validateNoSpecialChars]}
      />
      <TextInput
        source="chantier"
        label="chantier"
        sx={{
          input: {
            backgroundColor: theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
            color: theme.palette.mode === "dark" ? "#fff" : "inherit",
            borderRadius: "4px",
          },
        }}
        validate={[validateNoSpecialChars]}
      />
      <TextInput
        source="fournisseur"
        label="fournisseur"
        sx={{
          input: {
            backgroundColor: theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
            color: theme.palette.mode === "dark" ? "#fff" : "inherit",
            borderRadius: "4px",
          },
        }}
        validate={[validateNoSpecialChars]}
      />
      <TextInput
        source="designation"
        label="designation"
        sx={{
          input: {
            backgroundColor: theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
            color: theme.palette.mode === "dark" ? "#fff" : "inherit",
            borderRadius: "4px",
          },
        }}
        validate={[validateNoSpecialChars]}
      />
      <TextInput
        source="numeroFacture"
        label="numeroFacture"
        sx={{
          input: {
            backgroundColor: theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
            color: theme.palette.mode === "dark" ? "#fff" : "inherit",
            borderRadius: "4px",
          },
        }}
        validate={[validateNoSpecialChars]}
      />
      <TextInput
        source="CodeFournisseur"
        label="CodeFournisseur"
        sx={{
          input: {
            backgroundColor: theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
            color: theme.palette.mode === "dark" ? "#fff" : "inherit",
            borderRadius: "4px",
          },
        }}
        validate={[validateNoSpecialChars]}
      />
      <TextInput
        source="ficheNavette"
        label="ficheNavette"
        sx={{
          input: {
            backgroundColor: theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
            color: theme.palette.mode === "dark" ? "#fff" : "inherit",
            borderRadius: "4px",
          },
        }}
        validate={[validateNoSpecialChars]}
      />
    </Filter>
  );
};

export default AvanceFilter;
