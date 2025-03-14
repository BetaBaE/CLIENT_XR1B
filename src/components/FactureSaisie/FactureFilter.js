import { DateInput, Filter, TextInput } from "react-admin";

const FactureFilter = (props) => (
  <Filter {...props}>
    <TextInput source="LIBELLE" label="chantier" />

    <TextInput source="BonCommande" label="BonCommande" />

    <TextInput source="fournisseur" label="fournisseur" />
    <TextInput source="designation" label="designation" />
    <TextInput source="numeroFacture" label="numeroFacture" />
    <TextInput source="CodeFournisseur" label="CodeFournisseur" />
    <TextInput source="fullname" label="createur" />
    <DateInput source="Datedebut" label="mindate" />
    <DateInput source="Datefin" label="maxdate" />
  </Filter>
);
export default FactureFilter;
