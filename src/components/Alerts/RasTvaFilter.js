import { useEffect, useMemo, useState } from "react";
import { Filter, SelectInput } from "react-admin";
import apiUrl from "../../config";

const sortMonthsDesc = (rows) =>
  [...rows].sort((a, b) => String(b.id).localeCompare(String(a.id)));

const RasTvaFilter = (props) => {
  const [filterRas, setFilterRas] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}/rastvafilter`, { credentials: "include" })
      .then((response) => response.json())
      .then((json) => setFilterRas(sortMonthsDesc(json)));
  }, []);

  const filter_choices = useMemo(
    () =>
      filterRas.map(({ id, DateFilter }) => ({
        id,
        name: DateFilter,
      })),
    [filterRas]
  );

  return (
    <Filter {...props}>
      <SelectInput
        source="DateOperation2"
        label="Date Operation"
        choices={filter_choices}
        translateChoice={false}
      />
    </Filter>
  );
};

export default RasTvaFilter;
