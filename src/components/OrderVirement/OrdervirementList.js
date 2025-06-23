import { Datagrid, DateField, List, NumberField, TextField } from "react-admin";
import OrderVirementFilter from "./OrderVirementFilter";
import { useDataProvider } from "react-admin";
import { exporter } from "../global/exportsToCsv";

// Custom exporter that fetches all records

export const OrdervirementList = () => {
  const dataProvider = useDataProvider();

  return (
    <List
      filters={<OrderVirementFilter />}
      title="Order Virement"
      exporter={(records, fetchRelatedRecords) =>
        exporter(records, fetchRelatedRecords, dataProvider, {
          resource: "ordervirement",
          filter: {
            ...records,
          },
        })
      }
    >
      <Datagrid rowClick="edit" bulkActionButtons={false}>
        <TextField source="id" />
        <TextField source="directeursigne" label="signature" />
        <TextField source="nom" />
        <TextField source="rib" />
        <NumberField source="total" />
        <TextField source="etat" />
        <DateField
          showTime
          source="datecreation"
          options={{ timeZone: "UTC" }}
        />
        <DateField
          showTime
          source="dateExecution"
          options={{ timeZone: "UTC" }}
        />
      </Datagrid>
    </List>
  );
};
