import { Datagrid, DateField, List, NumberField, TextField } from "react-admin";
import VirmentAvanceFilter from "./VirmentAvanceFilter";

export const VirementAvanceList = () => {
    return ( <
        List filters = { < VirmentAvanceFilter / > } >
        <
        Datagrid rowClick = "edit"
        bulkActionButtons = { false } > { /* <TextField source="id" /> */ } <
        TextField source = "orderVirementId" / >
        <
        TextField source = "nom" / >
        <
        TextField source = "rib" / >
        <
        NumberField source = "montantVirement" / >
        <
        TextField source = "Etat" / >
        <
        DateField source = "dateoperation" > < /DateField> < /
        Datagrid > <
        /List>
    );
};