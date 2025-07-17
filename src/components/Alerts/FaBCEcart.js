import {
  Datagrid,
  DateField,
  List,
  NumberField,
  SelectInput,
  TextField,
  TextInput,
} from "react-admin";
import { useInputStyleFilters } from "../global/DarkInputStyle";

const FabcFilters = [
  <TextInput source="BC" label="Bon Commande" sx={useInputStyleFilters} />,
  <TextInput
    source="numeroFacture"
    label="N° Facture"
    sx={useInputStyleFilters}
  />,
  <TextInput
    source="Fournisseur"
    label="Fournisseur"
    sx={useInputStyleFilters}
  />,
  <TextInput source="chantier" label="Chantier" sx={useInputStyleFilters} />,
  <SelectInput
    choices={[
      { id: "Oui", name: "Oui" },
      { id: "Non", name: "Non" },
    ]}
    source="EcartChantier"
    label="Ecart Chantier"
    sx={useInputStyleFilters}
  />,
  <SelectInput
    choices={[
      { id: "Oui", name: "Oui" },
      { id: "Non", name: "Non" },
    ]}
    source="EcartNom"
    label="Ecart Nom"
    sx={useInputStyleFilters}
  />,
  <SelectInput
    choices={[
      { id: "Oui", name: "Oui" },
      { id: "Non", name: "Non" },
    ]}
    source="EcartTTC"
    label="Risk Ecart TTC"
    sx={useInputStyleFilters}
  />,
];

export const FabcsamebcList = () => {
  return (
    <List title="FA BC Ecart" filters={FabcFilters}>
      <Datagrid bulkActionButtons={false}>
        <TextField source="BC" label="BC" />
        <TextField source="numeroFacture" label="N° Facture" />
        <DateField source="DateFacture" />
        <TextField source="FournisseurApp" />
        <TextField source="FournisseurSage" />
        <TextField source="chtApp" />
        <TextField source="chtSage" />
        <NumberField source="TTCApp" label="TTC App" />
        <NumberField source="TTCSage" label="TTC Sage" />
        <TextField source="EcartChantier" />
        <TextField source="EcartNom" />
        <TextField source="RiskEcartTTC" label="Risk Ecart TTC" />
      </Datagrid>
    </List>
  );
};
