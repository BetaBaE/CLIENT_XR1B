import {
  Datagrid,
  DateField,
  FunctionField,
  List,
  NumberField,
  TextField,
} from "react-admin";
import FactureFilter from "./FactureFilter";

export const FactureList = () => {
  return (
    <List filters={<FactureFilter />}>
      <Datagrid bulkActionButtons={false}>
        <TextField source="id" />
        <DateField source="DATEDOC" label="Datedoc" />
        <TextField source="nom" />
        <NumberField source="NETAPAYER" label="Net A Payer" />
        <NumberField source="MontantFacture" />
        <FunctionField
          label="Deference"
          render={(record) =>
            record.MontantFacture > 0
              ? (record.MontantFacture - record.NETAPAYER).toFixed(3)
              : 0
          }
        />
      </Datagrid>
    </List>
  );
};
