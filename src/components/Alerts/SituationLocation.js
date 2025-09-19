import {
  Datagrid,
  DateField,
  Filter,
  List,
  NumberField,
  SelectInput,
  TextField,
  TextInput,
} from "react-admin";
import { useInputStyleFilters } from "../global/DarkInputStyle";

// Generate past 24 months
const generatePastMonths = () => {
  const options = [];
  const start = new Date(); // current date

  for (let i = 0; i < 24; i++) {
    const date = new Date(start.getFullYear(), start.getMonth() - i, 1);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const formatted = `${year}-${month}`;

    options.push({
      id: formatted, // value stored
      name: formatted, // label displayed
    });
  }

  return options;
};
const LocationFilter = (props) => {
  const monthsChoices = generatePastMonths();
  return (
    <Filter {...props}>
      <TextInput label="Nom" source="nom" sx={useInputStyleFilters} />
      <TextInput
        label="Désignation"
        source="designation"
        sx={useInputStyleFilters}
      />
      <TextInput source="codeAffaire" sx={useInputStyleFilters} />
      <TextInput
        label="Catégorie"
        source="categorie"
        sx={useInputStyleFilters}
      />
      <SelectInput
        label="Mois"
        source="mois"
        choices={monthsChoices}
        optionText="name"
        optionValue="id"
      />
    </Filter>
  );
};

export const LocationsituationList = () => (
  <List filters={<LocationFilter />}>
    <Datagrid bulkActionButtons={false}>
      <TextField source="nom" />
      <TextField source="designation" />
      <NumberField source="quantite" />
      <NumberField source="prixUnitaire" />
      <NumberField source="totalLigneHT" label="Tot. Ligne HT" />
      <NumberField source="totFourniHT" label="Tot. Fourni HT" />
      <TextField source="codeAffaire" />
      <NumberField source="totAffaireHT" label="Tot. Affaire HT" />
      <TextField source="mois" />
      <NumberField source="totMoisHT" label="Tot. Mois HT" />
      <TextField source="ann" label="Année" />
      <NumberField source="totAnHT" label="Tot. Année HT" />
      <TextField source="categorie" />
    </Datagrid>
  </List>
);
