import { useEffect, useState } from "react";
import { AutocompleteInput, Filter, SelectInput, TextInput } from "react-admin";
import apiUrl from "../../config";

const LogTvaFilter = (props) => {
  const [filterRas, setFilterRas] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}/gettvalogfilter`)
      .then((response) => response.json())
      .then((json) => setFilterRas(json));
  }, []);

  let filter_choices = filterRas.map(({ date }) => ({
    id: date,
    name: date,
  }));

  return (
    <Filter {...props}>
      <TextInput source="nom" label="Fournisseur" />
      <TextInput source="CODECHT" label="chantier" />
      <TextInput source="CODEDOCUTIL" label="Code Doc" />
      <TextInput source="Fn" label="FN" />
      <SelectInput
        source="modepaiement"
        choices={[
          { id: "paiement cheque", name: "paiement cheque" },
          { id: "paiement virement", name: "paiement virement" },
          { id: "paiement espece", name: "paiement espece" },
        ]}
      />
      <TextInput source="RefPay" label="RefPay" />

      <AutocompleteInput
        source="DateDouc"
        label="Mois"
        choices={filter_choices}
      />

      <SelectInput
        source="typeDoc"
        choices={[
          { id: "fr", name: "Facture" },
          { id: "Av", name: "Avance" },
        ]}
      />
    </Filter>
  );
};
export default LogTvaFilter;
