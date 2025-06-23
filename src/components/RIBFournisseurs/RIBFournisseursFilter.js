import { Filter, SelectInput, TextInput } from "react-admin";
import { useTheme } from "@mui/material/styles";
const FilterRIBFournisseurs = (props) => {
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
        source="fournisseur"
      />
      <TextInput
        sx={{
          input: {
            backgroundColor: theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
            color: theme.palette.mode === "dark" ? "#fff" : "inherit",
            borderRadius: "4px",
          },
        }}
        source="rib"
      />
      <SelectInput
        sx={{
          input: {
            backgroundColor: theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
            color: theme.palette.mode === "dark" ? "#fff" : "inherit",
            borderRadius: "4px",
          },
        }}
        source="validation"
        choices={[
          { id: "Valide", name: "Validé" },
          { id: "Non Valider", name: "Non Valider" },
          { id: "Ignorer", name: "Ignorer" },
        ]}
      />
      <TextInput
        sx={{
          input: {
            backgroundColor: theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
            color: theme.palette.mode === "dark" ? "#fff" : "inherit",
            borderRadius: "4px",
          },
        }}
        source="banque"
      />
    </Filter>
  );
};
export default FilterRIBFournisseurs;
