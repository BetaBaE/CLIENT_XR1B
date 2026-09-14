import { useEffect, useMemo, useState } from "react";
import {
  Datagrid,
  DateField,
  List,
  NumberField,
  SelectInput,
  TextField,
  useListContext,
} from "react-admin";
import apiUrl from "../../config";
import { createExporter } from "../GlobalFunction/CustomExportCsv";

const sortMonthsDesc = (rows) =>
  [...rows].sort((a, b) => String(b.id).localeCompare(String(a.id)));

export const RastvaList = () => {
  const resource = "rastva";
  const fileName = "Ras TVA";
  const [monthChoices, setMonthChoices] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}/rastvafilter`, { credentials: "include" })
      .then((response) => response.json())
      .then((json) =>
        setMonthChoices(
          sortMonthsDesc(json).map(({ id, DateFilter }) => ({
            id,
            name: DateFilter,
          }))
        )
      );
  }, []);

  const filters = useMemo(
    () => [
      <SelectInput
        key="DateOperation2"
        source="DateOperation2"
        label="Date Operation"
        choices={monthChoices}
        translateChoice={false}
        alwaysOn
      />,
    ],
    [monthChoices]
  );

  let activeExporter;

  const ExporterBridge = () => {
    const { filterValues } = useListContext();
    activeExporter = async () => {
      const exportFunction = createExporter(resource, fileName);
      return exportFunction(filterValues);
    };
    return null;
  };

  return (
    <List
      sort={{ field: "DateOperation", order: "DESC" }}
      perPage={25}
      exporter={() => activeExporter?.()}
      filters={filters}
    >
      <ExporterBridge />
      <Datagrid bulkActionButtons={false}>
        <TextField source="catFournisseur" />
        <TextField source="Identifiant fiscal" />
        <TextField source="ICE" label="ICE" />
        <TextField source="nom" />
        <TextField source="RefernceDOC" label="Refernce Document" />
        <TextField source="CategorieFn" />
        <DateField source="dateFactue" label="Date Facture" />
        <DateField source="DateOperation" label="Date Operation" />
        <NumberField source="HT" label="HT" />
        <TextField source="Pourcentage TVA" label="Pourcentage TVA" />
        <NumberField source="TauxTva" label="TauxTva" />
        <TextField source="Pourcentage Ras" label="Pourcentage Ras" />
        <NumberField source="RaS" label="RaS" />
      </Datagrid>
    </List>
  );
};
