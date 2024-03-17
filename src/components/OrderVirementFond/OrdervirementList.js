import { Datagrid, DateField, List, NumberField, TextField } from "react-admin";
import OrderVirementFondFilter from "./OrderVirementFilter";

export const OrdervirementFondList = () => (
  <List filters={<OrderVirementFondFilter />} title="Order Virement">
    <Datagrid rowClick="edit" bulkActionButtons={false}>
      <TextField source="id" />
      <TextField source="directeursigne" label="signature" />
      <TextField source="nom" />
      <TextField source="rib" />
      <NumberField source="total" />
      <TextField source="etat" />
      <DateField showTime source="datecreation" options={{ timeZone: "UTC" }} />
      <DateField
        showTime
        source="dateExecution"
        options={{ timeZone: "UTC" }}
      />
    </Datagrid>
  </List>
);
