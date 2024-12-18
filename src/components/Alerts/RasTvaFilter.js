import { useEffect, useState } from "react";
import { Filter, SelectInput } from "react-admin";
import apiUrl from "../../config";

const RasTvaFilter = (props) => {
  const [filterRas, setFilterRas] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}/rastvafilter`)
      .then((response) => response.json())
      .then((json) => setFilterRas(json));
  }, []);

  let filter_choices = filterRas.map(({ id, DateFilter }) => ({
    id: id,
    name: DateFilter,
  }));
  return (
    <Filter {...props}>
      <SelectInput
        source="DateOperation2"
        label="Date Operation"
        choices={filter_choices}
      />
    </Filter>
  );
};
export default RasTvaFilter;
