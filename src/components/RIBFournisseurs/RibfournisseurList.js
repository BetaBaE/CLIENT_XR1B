import { Datagrid, List, TextField } from "react-admin";
import FilterRIBFournisseurs from "./FilterRIBFournisseurs";

export const RibfournisseurList = () => (
  <List filters={<FilterRIBFournisseurs />} title="Rib Fournisseur Validé">
    <Datagrid rowClick="edit" bulkActionButtons={false}>
      <TextField source="fournisseur" />
      <TextField source="rib" />
      <TextField source="validation" />
      {/* <TextField source="validation" /> */}

      {/* <BooleanField
        source="validation"
        valueLabelTrue="true"
        valueLabelFalse="false"
      /> */}
    </Datagrid>
  </List>
);
