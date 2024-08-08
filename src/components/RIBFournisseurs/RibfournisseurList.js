import { Datagrid, Link, List, TextField } from "react-admin";
import FilterRIBFournisseurs from "./RIBFournisseursFilter";

export const RibfournisseurList = () => (
  <List filters={<FilterRIBFournisseurs />} title="Rib Fournisseur Validé">
    <Datagrid rowClick="edit" bulkActionButtons={false}>
      <TextField source="fournisseur" />
      <TextField source="rib" />
      <TextField source="swift" />
      <TextField source="validation" />
      <TextField source="banque" label="Banque" />
      <Link>
        <TextField source="path_rib" label="Attestation de Rib" />
      </Link>
    </Datagrid>
  </List>
);
