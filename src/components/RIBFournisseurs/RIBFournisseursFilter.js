import { Filter, SelectInput, TextInput } from "react-admin";

const FilterRIBFournisseurs = (props) => (
  <Filter {...props}>
    <TextInput source="fournisseur" />
    <TextInput source="rib" />
    <SelectInput
      source="validation"
      choices={[
        { id: "Valide", name: "Validé" },
        { id: "Non Valider", name: "Non Valider" },
        { id: "Ignorer", name: "Ignorer" },
      ]}
    />
       <TextInput source="banque" />
     
  </Filter>
);
export default FilterRIBFournisseurs;
