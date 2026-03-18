import {
  Datagrid,
  DateField,
  Filter,
  List,
  NumberField,
    TextField,
  TextInput,
} from "react-admin";
import { useInputStyleFilters } from "../global/DarkInputStyle";



const AttestationSaisieFilter = (props) => {
  return (
    <Filter {...props}>
      <TextInput label="Nom" source="nom" sx={useInputStyleFilters} />
      <TextInput label="N° Facture" source="numeroFacture" sx={useInputStyleFilters} />
      <TextInput label="Mois (yyyy-MM)" source="mois" sx={useInputStyleFilters} />
    </Filter>
  );
};

export const AttestationSaisieList = () => (
  <List
    resource="attestationsaisie"
    filters={<AttestationSaisieFilter />}
    sort={{ field: "id", order: "ASC" }}
  >
    <Datagrid bulkActionButtons={false}>
      <TextField source="nom" label="Fournisseur" />
      <DateField source="DateFacture" label="Date Facture" />
      <TextField source="numeroFacture" label="N° Facture" />
      <NumberField source="TTC" label="Montant TTC" />
      <TextField source="mois" label="Mois" />
      <NumberField source="cumulMois" label="Cumul Mois (Saisie)" />
      <NumberField source="montantReglee" label="Montant Réglée" />
    </Datagrid>
  </List>
);