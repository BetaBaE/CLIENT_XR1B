import { useEffect, useState } from "react";
import { AutocompleteInput, Filter, SelectInput, TextInput } from "react-admin";
import apiUrl from "../../config";
import { useTheme } from "@mui/material/styles";
const LogTvaFilter = (props) => {
  const theme = useTheme();
  const [filterRas, setFilterRas] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}/gettvalogfilter`)
      .then((response) => response.json())
      .then((json) => setFilterRas(json));
  }, []);

  let filter_choices = filterRas.map(({ date }) => ({
    id: date,
    name: date,
  }));

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
        source="CODECHT"
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
        source="CODEDOCUTIL"
        label="Code Doc"
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
        label="FN"
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
        label="RefPay"
      />

      <AutocompleteInput
        sx={{
          input: {
            backgroundColor: theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
            color: theme.palette.mode === "dark" ? "#fff" : "inherit",
            borderRadius: "4px",
          },
        }}
        source="DateDouc"
        label="Mois"
        choices={filter_choices}
      />

      <SelectInput
        sx={{
          input: {
            backgroundColor: theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
            color: theme.palette.mode === "dark" ? "#fff" : "inherit",
            borderRadius: "4px",
          },
        }}
        source="typeDoc"
        choices={[
          { id: "fr", name: "Facture" },
          { id: "Av", name: "Avance" },
        ]}
      />
    </Filter>
  );
};
export default LogTvaFilter;
