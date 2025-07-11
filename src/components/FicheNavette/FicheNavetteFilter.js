import { Filter, TextInput } from "react-admin";
import { useTheme } from "@mui/material/styles";
const FicheNavetteFilter = (props) => {
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
      />
      <TextInput
        sx={{
          input: {
            backgroundColor: theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
            color: theme.palette.mode === "dark" ? "#fff" : "inherit",
            borderRadius: "4px",
          },
        }}
        source="chantier"
        label="chantier"
      />
      <TextInput
        sx={{
          input: {
            backgroundColor: theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
            color: theme.palette.mode === "dark" ? "#fff" : "inherit",
            borderRadius: "4px",
          },
        }}
        source="fournisseur"
        label="fournisseur"
      />
      <TextInput
        sx={{
          input: {
            backgroundColor: theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
            color: theme.palette.mode === "dark" ? "#fff" : "inherit",
            borderRadius: "4px",
          },
        }}
        source="designation"
        label="designation"
      />
      <TextInput
        sx={{
          input: {
            backgroundColor: theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
            color: theme.palette.mode === "dark" ? "#fff" : "inherit",
            borderRadius: "4px",
          },
        }}
        source="numeroFacture"
        label="numeroFacture"
      />
      <TextInput
        sx={{
          input: {
            backgroundColor: theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
            color: theme.palette.mode === "dark" ? "#fff" : "inherit",
            borderRadius: "4px",
          },
        }}
        source="CodeFournisseur"
        label="CodeFournisseur"
      />
      <TextInput
        sx={{
          input: {
            backgroundColor: theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
            color: theme.palette.mode === "dark" ? "#fff" : "inherit",
            borderRadius: "4px",
          },
        }}
        source="ficheNavette"
        label="ficheNavette"
      />
    </Filter>
  );
};

export default FicheNavetteFilter;
