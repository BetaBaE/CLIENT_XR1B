import { Datagrid, DateField, List, NumberField, TextField } from "react-admin";
import FilterRLogFacture from "./FilterRLogFacture";

export const LogfactureList = (props) => {
  return (
    <List filters={<FilterRLogFacture />} title="Log facture">
      <Datagrid bulkActionButtons={false} {...props}>
        {/* <TextField source="id" /> */}
        <TextField source="CODEDOCUTIL" label="Code" />
        <TextField source="CODECHT" label="Chantier" />
        <DateField
          source="DATEDOC"
          label="Date"
          options={{ timeZone: "UTC" }}
        />
        <TextField source="NOM" label="Nom" />
        <TextField source="LIBREGLEMENT" label="mode de paiement" />
        <NumberField source="TOTHTNET" label="HT" />
        <NumberField source="TOTTVANET" label="TVA" />
        <NumberField source="TOTALTTC" label="TTC" />
        <NumberField source="NETAPAYER" label="Net a payer" />
        {/* <NumberField source="MontantFacture" /> */}
        <TextField source="orderVirementId" />
        <TextField source="etat" />
      </Datagrid>
    </List>
  );
};
