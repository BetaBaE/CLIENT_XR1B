import { Datagrid, DateField, List, TextField } from "react-admin";
import FilterEcheanceLoiFournisseur from "./EcheanceLoiFilter";

export const EcheanceLoiList = () => {
  return (
    <List filters={<FilterEcheanceLoiFournisseur />}>
      <Datagrid bulkActionButtons={false} rowClick="edit">
        {/* <TextField source="id" /> */}
        <TextField source="nom"></TextField>

        <TextField source="modalitePaiement" label="modalitePaiement" />
        <DateField source="dateecheance" label="date debut convention" />
      </Datagrid>
    </List>
  );
};
