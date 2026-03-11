import { Filter, TextInput, SelectInput } from "react-admin";
import { regex } from "react-admin";
import { useTheme } from "@mui/material/styles";

const validateNoSpecialChars = regex(
  /^[a-zA-Z0-9 ]*$/,
  "Interdit les caractères spéciaux"
);

const FilterAttestationFournisseur = (props) => {
  const theme = useTheme();
  
  const inputStyle = {
    input: {
      backgroundColor: theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
      color: theme.palette.mode === "dark" ? "#fff" : "inherit",
      borderRadius: "4px",
    },
  };

  return (
    <Filter {...props}>
      <TextInput
        source="nom"
        label="Nom du fournisseur"
        sx={inputStyle}
        validate={[validateNoSpecialChars]}
      />
      
      <SelectInput
        source="statut"
        label="Statut"
        sx={inputStyle}
        choices={[
          { id: "pas_attestation", name: "⚠️ Pas d'attestation" },
          { id: "nouveau_fournisseur", name: "🆕 Nouveau fournisseur (< 5 mois)" },
          { id: "expire", name: "❌ Expiré" },
          { id: "expire_aujourdhui", name: "🚨 Expire aujourd'hui" },
          { id: "alerte", name: "⚡ Alerte (≤20 jours)" },
          { id: "ok", name: "✅ OK (>20 jours)" },
        ]}
        emptyText="Tous les statuts"
        emptyValue=""
      />
    </Filter>
  );
};

export default FilterAttestationFournisseur;