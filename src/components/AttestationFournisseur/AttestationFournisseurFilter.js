import { Filter, TextInput } from "react-admin";
import { regex } from "react-admin";
import { useTheme } from "@mui/material/styles";
const validateNoSpecialChars = regex(
  /^[a-zA-Z0-9 ]*$/,
  "Interdit les caractères spéciaux"
);

const FilterAttestationFournisseur = (props) => {
  const theme = useTheme();
  return (
    <Filter {...props}>
      <TextInput
        source="nom"
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

export default FilterAttestationFournisseur;
