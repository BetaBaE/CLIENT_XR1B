import { DateInput, Filter, SelectInput, TextInput } from "react-admin";

const FilterAvanceDetailList = (props) => (
  <Filter {...props}>
    <DateInput source="dateExercices" alwaysOn />
    <TextInput source="codechantier" />
    <TextInput source="nom" />
    <TextInput source="Fn" />
    <TextInput source="BonCommande" />
    <SelectInput
      source="Etat"
      label="Etat Avance"
      choices={[
        { id: "Saisie", name: "Saisie" },
        { id: "En cours", name: "En cours" },
        { id: "Reglee", name: "Reglee" },
      ]}
    />
    <SelectInput
      source="modepaiement"
      choices={[
        { id: "paiement cheque", name: "paiement cheque" },
        { id: "paiement virement", name: "paiement virement" },
        { id: "paiement espece", name: "paiement espece" },
      ]}
    />
    <TextInput source="RefPay" />
    <DateInput source="DateOperation" />
    <TextInput source="Bank" />
  </Filter>
);
export default FilterAvanceDetailList;
