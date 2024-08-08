import { Datagrid, DateField, List, TextField } from "react-admin";
import FilterFournisseurs from "./EcheanceReelFiter";

export const EcheanceReeList = () => {
  return (
    <List filters={<FilterFournisseurs />}>
      <Datagrid bulkActionButtons={false} rowClick="edit">
        {/* <TextField source="id" /> */}
        <TextField source="nom"></TextField>

        <TextField source="modalitePaiement" label="modalitePaiement" />
        <DateField source="dateecheance" label="date debut convention" />
      </Datagrid>
    </List>
  );
};
