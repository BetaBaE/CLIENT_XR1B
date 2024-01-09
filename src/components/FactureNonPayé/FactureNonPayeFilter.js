import * as React from 'react';
import { Filter, SelectInput, TextInput } from 'react-admin';

const FactureNonPayeFilter = (props) => {
  const [factures, setFactures] = React.useState([]);
  const currentYear = new Date().getFullYear();

  React.useEffect(() => {
    fetch("http://10.111.1.95:8080/getAnneeSuivieFacture")
      .then((response) => response.json())
      .then((data) => {
        setFactures(data.map(facture => facture));
      })
      .catch((error) => {
        console.error("Error fetching record count:", error);
      });
  }, []);

  let Annee_choices = factures.map(({ year }) => ({
    id: year,
    name: `${year}`,
  }));

  const isCurrentYearInData = factures.some(({ year }) => year === currentYear);

  if (!isCurrentYearInData) {
    Annee_choices = [
      ...Annee_choices,
      {
        id: currentYear,
        name: `${currentYear}`,
      },
    ];
  }

  return (
    <Filter {...props}>
      <SelectInput
      alwaysOn
        label="annee de l'exercice"
        source="annee"
        choices={Annee_choices}
      />

      <TextInput source="fournisseur" />
      
      <TextInput source="chantier" />
    </Filter>
  );
};

export default FactureNonPayeFilter;
