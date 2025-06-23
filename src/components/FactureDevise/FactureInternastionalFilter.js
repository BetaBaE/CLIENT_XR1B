import { Filter, SelectInput, TextInput } from "react-admin";
import { useInputStyleFilters } from "../global/DarkInputStyle";
const FactureInternationalFilter = (props) => {
  return (
    <Filter {...props}>
      <TextInput
        source="NumDossier"
        label="N° Dossier"
        sx={useInputStyleFilters}
      />
      <SelectInput
        source="Devise"
        choices={[
          { id: "USD", name: "USD - US Dollar" },
          { id: "EUR", name: "EUR - Euro" },
          { id: "GBP", name: "GBP - British Pound" },
          { id: "CAD", name: "CAD - Canadian Dollar" },
          { id: "AUD", name: "AUD - Australian Dollar" },
          { id: "CHF", name: "CHF - Swiss Franc" },
          { id: "JPY", name: "JPY - Japanese Yen" },
          { id: "CNY", name: "CNY - Chinese Yuan" },
          { id: "SAR", name: "SAR - Saudi Riyal" },
          { id: "AED", name: "AED - Emirati Dirham" },
        ]}
        sx={useInputStyleFilters}
        slotProps={{
          input: {
            autoComplete: "off",
          },
        }}
      />

      <TextInput sx={useInputStyleFilters} source="nom" label="Fournisseur" />
      <TextInput sx={useInputStyleFilters} source="numDoc" label="N° facture" />
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
      <TextInput
        sx={useInputStyleFilters}
        source="codeChantier"
        label="Chantier"
      />
      <TextInput
        sx={useInputStyleFilters}
        source="Redacteur"
        label="Createur"
      />
    </Filter>
  );
};
export default FactureInternationalFilter;
