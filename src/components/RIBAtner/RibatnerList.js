import { Datagrid, List, TextField } from "react-admin";
import { RibAtnerFilter } from "./FilterRIBAtner";

export const RibatnerList = (props) => (
  <List filters={<RibAtnerFilter />} title="RIB Atner">
    <Datagrid rowClick="edit" bulkActionButtons={false}>
      {/* <TextField source="id" /> */}
      <TextField source="nom" />
      <TextField source="rib" />
    </Datagrid>
  </List>
);
