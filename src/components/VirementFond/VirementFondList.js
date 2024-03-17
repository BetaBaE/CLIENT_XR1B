import { Datagrid, DateField, List, NumberField, TextField } from "react-admin";
import VirmentFondFilter from "./VirmentFondFilter";

export const VirementFondList = () => {
  return (
    <List filters={<VirmentFondFilter />}>
      <Datagrid rowClick="edit" bulkActionButtons={false}>
        {/* <TextField source="id" /> */}
        <TextField source="orderVirementFondId" />
        <TextField source="nom" label="Banque ATNER Destination"/>
        <TextField source="rib" label="Compte ATNER Destination"/>
        <NumberField source="montantVirement" />
        <TextField source="Etat" />
        <DateField source="dateoperation"></DateField>
      </Datagrid>
    </List>
  );
};
