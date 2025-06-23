import { DateInput, Filter, TextInput } from "react-admin";
import { useInputStyleFilters } from "../global/DarkInputStyle";
const FactureFilter = (props) => {
  return (
    <Filter {...props}>
      <TextInput source="LIBELLE" sx={useInputStyleFilters} label="chantier" />

      <TextInput
        sx={useInputStyleFilters}
        source="BonCommande"
        label="BonCommande"
      />

      <TextInput
        sx={useInputStyleFilters}
        source="fournisseur"
        label="fournisseur"
      />
      <TextInput
        sx={useInputStyleFilters}
        source="designation"
        label="designation"
      />
      <TextInput
        sx={useInputStyleFilters}
        source="numeroFacture"
        label="numeroFacture"
      />
      <TextInput
        sx={useInputStyleFilters}
        source="CodeFournisseur"
        label="CodeFournisseur"
      />
      <TextInput sx={useInputStyleFilters} source="fullname" label="createur" />
      <DateInput sx={useInputStyleFilters} source="Datedebut" label="mindate" />
      <DateInput sx={useInputStyleFilters} source="Datefin" label="maxdate" />
    </Filter>
  );
};
export default FactureFilter;
