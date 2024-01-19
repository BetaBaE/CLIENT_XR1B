import { Datagrid, List, TextField } from "react-admin";
import FilterRIBTempo from "./FilterRIBTempo";

// import { FaCheck, FaShoppingCart } from "react-icons/fa";
// https://stackoverflow.com/questions/62073384/autocomplete-input-with-two-fields-in-react-admin
export const RibtempoList = (props) => {
  return (
    <List filters={<FilterRIBTempo />} title="RIB Temporaire">
      <Datagrid bulkActionButtons={false} {...props}>
        <TextField source="fournisseur" />
        <TextField source="rib" label="RIB" />
        <TextField source="swift" label="SWIFT" />
        <TextField source="banque" label="Banque"/>
        
   
      </Datagrid>
    </List>
  );
};
