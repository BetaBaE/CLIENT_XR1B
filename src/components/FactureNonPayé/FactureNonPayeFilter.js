import * as React from 'react';
import { Filter, SelectInput } from 'react-admin';

const FactureNonPayeFilter = (props) => {
  const [factures, setFactures] = React.useState([]);

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
  return (
    <Filter {...props}>
 
 <SelectInput
        label="annee de l'exercice"
          source="annee"
          choices={Annee_choices}
        />

      {/* 
      Other DateInput components are commented out for brevity. 
      If you need them, uncomment and adjust as necessary.
      */}
    </Filter>
  );
};

export default FactureNonPayeFilter;
