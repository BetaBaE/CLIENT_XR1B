import { DateInput, Filter, SelectInput, TextInput } from "react-admin";

const AvanceRestituerDetatailFilter = (props) => (
  <Filter {...props}>
    <TextInput source="chantier" label="chantier" />

    <TextInput source="BonCommande" label="BonCommande" />

    <TextInput source="numerofacture" label="numerofacture" />

    <TextInput source="fournisseur" label="fournisseur" />
    <TextInput source="ficheNavette" label="ficheNavette" />
  </Filter>
);
export default AvanceRestituerDetatailFilter;
