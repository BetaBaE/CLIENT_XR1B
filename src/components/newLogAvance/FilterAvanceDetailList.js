import { DateInput, Filter, SelectInput, TextInput } from "react-admin";
import { useTheme } from "@mui/material/styles";
const FilterAvanceDetailList = (props) => {
  const theme = useTheme();
  return (
    <Filter {...props}>
      <DateInput
        sx={{
          input: {
            backgroundColor: theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
            color: theme.palette.mode === "dark" ? "#fff" : "inherit",
            borderRadius: "4px",
          },
        }}
        source="dateExercices"
        alwaysOn
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
      <TextInput
        sx={{
          input: {
            backgroundColor: theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
            color: theme.palette.mode === "dark" ? "#fff" : "inherit",
            borderRadius: "4px",
          },
        }}
        source="Fn"
      />
      <TextInput
        sx={{
          input: {
            backgroundColor: theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
            color: theme.palette.mode === "dark" ? "#fff" : "inherit",
            borderRadius: "4px",
          },
        }}
        source="BonCommande"
      />
      <SelectInput
        sx={{
          input: {
            backgroundColor: theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
            color: theme.palette.mode === "dark" ? "#fff" : "inherit",
            borderRadius: "4px",
          },
        }}
        source="Etat"
        label="Etat Avance"
        choices={[
          { id: "Saisie", name: "Saisie" },
          { id: "En cours", name: "En cours" },
          { id: "Reglee", name: "Reglee" },
        ]}
      />
      <SelectInput
        sx={{
          input: {
            backgroundColor: theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
            color: theme.palette.mode === "dark" ? "#fff" : "inherit",
            borderRadius: "4px",
          },
        }}
        source="modepaiement"
        choices={[
          { id: "paiement cheque", name: "paiement cheque" },
          { id: "paiement virement", name: "paiement virement" },
          { id: "paiement espece", name: "paiement espece" },
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
        source="RefPay"
      />
      <DateInput
        sx={{
          input: {
            backgroundColor: theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
            color: theme.palette.mode === "dark" ? "#fff" : "inherit",
            borderRadius: "4px",
          },
        }}
        source="DateOperation"
      />
      <TextInput
        sx={{
          input: {
            backgroundColor: theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
            color: theme.palette.mode === "dark" ? "#fff" : "inherit",
            borderRadius: "4px",
          },
        }}
        source="Bank"
      />
    </Filter>
  );
};
export default FilterAvanceDetailList;
