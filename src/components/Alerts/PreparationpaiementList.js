import {
  List,
  DatagridConfigurable,
  TextField,
  NumberField,
  DateField,
  TextInput,
  NumberInput,
  SelectInput,
  Filter,
  TopToolbar,
  ExportButton,
  SelectColumnsButton,
  FilterButton,
} from "react-admin";
import { useInputStyleFilters } from "../global/DarkInputStyle";
import { createExporter } from "../GlobalFunction/CustomExportCsv";

// Filter component
const PreparationpaiementFilter = (props) => {
  return (
    <Filter {...props}>
      <TextInput label="Nom" source="nom" sx={useInputStyleFilters} />
      <TextInput
        label="Numéro Facture"
        source="numeroFacture"
        sx={useInputStyleFilters}
      />
      <NumberInput
        label="Inférieur (Ancienneté mois)"
        source="ans_inf"
        min={-1e12}
        defaultValue={0}
        onChange={(e) => {
          if (e.target.value < 0) e.target.value = 0; // Force to 0 if negative
          return e.target.value; // Otherwise, allow the value
        }}
        sx={useInputStyleFilters}
      />
      <NumberInput
        label="Supérieur (Ancienneté mois)"
        source="ans_sup"
        min={1e12}
        defaultValue={0}
        onChange={(e) => {
          if (e.target.value < 0) e.target.value = 0; // Force to 0 if negative
          return e.target.value; // Otherwise, allow the value
        }}
        sx={useInputStyleFilters}
      />
      <TextInput
        source="codechantier"
        label="Chantier"
        sx={useInputStyleFilters}
      />
      <SelectInput
        source="fn"
        label="Facture Avec FN"
        choices={[
          { id: "oui", name: "Oui" },
          { id: "non", name: "Non" },
        ]}
        sx={useInputStyleFilters}
      />
    </Filter>
  );
};

const PreparationpaiementFilters = [
  <TextInput label="Nom" source="nom" />,
  <TextInput source="codechantier" label="Chantier" />,
  <TextInput label="Numéro Facture" source="numeroFacture" />,
  <NumberInput
    label="Supérieur (Ancienneté mois)"
    source="ans_sup"
    min={-1e12} // Allows very large negative numbers (practically -∞)
    defaultValue={0}
  />, // Optional: Sets default value to 0
  <NumberInput
    label="Inférieur (Ancienneté mois)"
    source="ans_inf"
    min={-1e12} // Allows very large negative numbers (practically -∞)
    defaultValue={0}
  />, // Optional: Sets default value to 0
  <SelectInput
    source="fn"
    choices={[
      { id: "oui", name: "Oui" },
      { id: "non", name: "Non" },
    ]}
  />,
];
// Custom actions
const ListActions = () => (
  <TopToolbar>
    <SelectColumnsButton />
    <ExportButton />
    <FilterButton filters={PreparationpaiementFilters} />
  </TopToolbar>
);

// Main list component
export const PreparationpaiementList = () => {
  const resource = "preparationpaiement";
  const fileName = "Preparation Paiemenet";
  const exporter = createExporter(resource, fileName);

  return (
    <List
      exporter={exporter}
      filters={<PreparationpaiementFilter />}
      actions={<ListActions />}
      title="Préparation Paiement"
    >
      <DatagridConfigurable bulkActionButtons={false}>
        <TextField source="nom" />
        <NumberField source="modaliteJrs" label="Modalité (Jours)" />
        <TextField source="numeroFacture" label="N° Facture" />
        <DateField source="DateFacture" />
        <NumberField source="ttc" label="TTC" />
        <NumberField source="Acompte" label="Acompte" />
        <NumberField source="netApayer" label="Net à Payer" />
        <TextField source="fn" label="FN" />
        <DateField source="dateEcheance" label="Date Échéance" />
        <DateField source="moisEcheance" label="Mois Échéance" />
        <NumberField source="CumulFournisseur" label="Cumul Fournisseur" />
        <NumberField source="CumulTotal" label="Cumul Total" />
        <NumberField source="echuDepuisJrs" label="Ancienneté (Jours)" />
        <NumberField source="echuDepuisMnt" label="Ancienneté (Mois)" />
        {/* <NumberField source="ANC" label="Ancienneté (Mois)" /> */}
        <TextField source="codechantier" label="Chantier" />
      </DatagridConfigurable>
    </List>
  );
};
