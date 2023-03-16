import { Datagrid, DateField, List, NumberField, TextField } from "react-admin";
import OrderVirementFilter from "./OrderVirementFilter";

export const OrdervirementList = () => (
  <List filters={<OrderVirementFilter />} title="Order Virement">
    <Datagrid rowClick="edit" bulkActionButtons={false}>
      <TextField source="id" />
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
