import { Filter, SelectInput, TextInput } from "react-admin";
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
        source="nom"
        label="Fournisseur"
      />
      <TextInput
        sx={{
          input: {
            backgroundColor: theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
            color: theme.palette.mode === "dark" ? "#fff" : "inherit",
            borderRadius: "4px",
          },
        }}
        source="FN"
        label="Fiche navette"
      />
      <TextInput
        sx={{
          input: {
            backgroundColor: theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
            color: theme.palette.mode === "dark" ? "#fff" : "inherit",
            borderRadius: "4px",
          },
        }}
        source="codechantier"
        label="Code chantier"
      />
      <TextInput
        sx={{
          input: {
            backgroundColor: theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
            color: theme.palette.mode === "dark" ? "#fff" : "inherit",
            borderRadius: "4px",
          },
        }}
        source="NumeroDoc"
        label="N° Document"
      />

      <SelectInput
        source="CatDoc"
        label="Catégorie Document"
        choices={[
          { id: "Facture", name: "Facture" },
          { id: "Avance", name: "Avance" },
        ]}
      />
    </Filter>
  );
};

export default FicheNavetteFilter;
