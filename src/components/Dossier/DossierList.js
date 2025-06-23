import {
  Datagrid,
  DateField,
  List,
  SelectInput,
  TextField,
  TextInput,
} from "react-admin";
import { useInputStyleFilters } from "../global/DarkInputStyle";

const DossierFilters = [
  <TextInput
    sx={useInputStyleFilters}
    label="N° Dossier"
    source="NumDossier"
  />,
  <TextInput sx={useInputStyleFilters} label="Libele" source="Libele" />,
  <TextInput sx={useInputStyleFilters} label="Fournissur" source="nom" />,
  <SelectInput
    source="Etat"
    sx={useInputStyleFilters}
    choices={[
      { id: "Ouvert", name: "Ouvert" },
      { id: "Clouture", name: "Clouture" },
      { id: "Annuler", name: "Annuler" },
    ]}
  />,
];

export const DossierList = () => (
  <List filters={DossierFilters}>
    <Datagrid bulkActionButtons={false} rowClick="edit">
      <TextField source="NumDossier" />
      <TextField source="Libele" />
      <TextField source="nom" />
      <TextField source="MontantHtTotal" />
      <TextField source="Redacteur" />
      <TextField source="Etat" />
      <DateField source="dateCreation" />
    </Datagrid>
  </List>
);
