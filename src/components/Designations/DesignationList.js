import { Datagrid, List, TextField } from "react-admin";
import { FilterDesignation } from "./FilterDesignation";

export const DesignationList = () => {
  return (
    <List title="Designation List" filters={<FilterDesignation />}>
      <Datagrid bulkActionButtons={false} rowClick="edit">
        <TextField source="designation" label="Designation" />
        <TextField source="codeDesignation" label="Code" />
        <TextField source="PourcentageTVA" label="Pourcentage TVA" />
        <TextField source="PosteTVA" label="Poste TVA" />
        <TextField source="Etat" />
      </Datagrid>
    </List>
  );
};
