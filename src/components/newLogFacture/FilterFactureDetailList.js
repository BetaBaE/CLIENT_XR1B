import {
  DateInput,
  Filter,
  SelectInput,
  TextInput,
  usePermissions,
} from "react-admin";

const FilterFactureDetailList = (...props) => {
  const { permissions } = usePermissions();
  let checkPermission =
    permissions === "electricite" || permissions === "montage";

  return (
    <Filter {...props}>
      <DateInput source="dateExercices" alwaysOn />
      <TextInput
        source="codechantier"
        alwaysOn={checkPermission}
        disabled={checkPermission}
      />
      <TextInput source="nom" />
      <TextInput source="Fn" />
      <TextInput source="numeroFacture" />
      <DateInput source="DateFacture" />
      <SelectInput
        source="Etat"
        label="Etat Facture"
        choices={[
          { id: "Saisie", name: "Saisie" },
          { id: "En cours", name: "En cours" },
          { id: "Reglee", name: "Reglee" },
          { id: "RegleeAV", name: "RegleeAV" },
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
};
export default FilterFactureDetailList;
