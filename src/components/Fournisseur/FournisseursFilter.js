import { Filter, SelectInput, TextInput } from "react-admin";
import { useTheme } from "@mui/material/styles";
const FournisseursFilter = (props) => {
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
        source="codeFournisseur"
      />
      <TextInput
        sx={{
          input: {
            backgroundColor: theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
            color: theme.palette.mode === "dark" ? "#fff" : "inherit",
            borderRadius: "4px",
          },
        }}
        source="nom"
      />
      <SelectInput
        sx={{
          input: {
            backgroundColor:
              theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
            color: theme.palette.mode === "dark" ? "#fff" : "inherit",
            borderRadius: "4px",
          },
        }}
        source="actif"
        label="Actif"
        choices={[
          { id: "Oui", name: "Oui" },
          { id: "Non", name: "Non" },
        ]}
      />
    </Filter>
  );
};
export default FournisseursFilter;
