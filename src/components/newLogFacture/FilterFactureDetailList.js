import {
  DateInput,
  Filter,
  SelectInput,
  TextInput,
  usePermissions,
} from "react-admin";
import { useTheme } from "@mui/material/styles";
const FilterFactureDetailList = (...props) => {
  const theme = useTheme();
  const { permissions } = usePermissions();
  let checkPermission =
    permissions === "electricite" || permissions === "montage";

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
        source="codechantier"
        sx={{
          input: {
            backgroundColor: theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
            color: theme.palette.mode === "dark" ? "#fff" : "inherit",
            borderRadius: "4px",
          },
        }}
        alwaysOn={checkPermission}
        disabled={checkPermission}
      />
      <TextInput
        source="nom"
        sx={{
          input: {
            backgroundColor: theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
            color: theme.palette.mode === "dark" ? "#fff" : "inherit",
            borderRadius: "4px",
          },
        }}
      />
      <TextInput
        source="Fn"
        sx={{
          input: {
            backgroundColor: theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
            color: theme.palette.mode === "dark" ? "#fff" : "inherit",
            borderRadius: "4px",
          },
        }}
      />
      <TextInput
        source="numeroFacture"
        sx={{
          input: {
            backgroundColor: theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
            color: theme.palette.mode === "dark" ? "#fff" : "inherit",
            borderRadius: "4px",
          },
        }}
      />
      <DateInput
        source="DateFacture"
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
        label="Etat Facture"
        choices={[
          { id: "Saisie", name: "Saisie" },
          { id: "En cours", name: "En cours" },
          { id: "Reglee", name: "Reglee" },
          { id: "RegleeAV", name: "RegleeAV" },
        ]}
        sx={{
          input: {
            backgroundColor: theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
            color: theme.palette.mode === "dark" ? "#fff" : "inherit",
            borderRadius: "4px",
          },
        }}
      />
      <SelectInput
        source="modepaiement"
        choices={[
          { id: "paiement cheque", name: "paiement cheque" },
          { id: "paiement virement", name: "paiement virement" },
          { id: "paiement espece", name: "paiement espece" },
        ]}
        sx={{
          input: {
            backgroundColor: theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
            color: theme.palette.mode === "dark" ? "#fff" : "inherit",
            borderRadius: "4px",
          },
        }}
      />
      <TextInput
        source="RefPay"
        sx={{
          input: {
            backgroundColor: theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
            color: theme.palette.mode === "dark" ? "#fff" : "inherit",
            borderRadius: "4px",
          },
        }}
      />
      <DateInput
        source="DateOperation"
        sx={{
          input: {
            backgroundColor: theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
            color: theme.palette.mode === "dark" ? "#fff" : "inherit",
            borderRadius: "4px",
          },
        }}
      />
      <TextInput
        source="Bank"
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
export default FilterFactureDetailList;
