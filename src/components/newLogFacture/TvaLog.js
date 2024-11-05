import { Datagrid, DateField, List, NumberField, TextField } from "react-admin";
import LogTvaFilter from "./TvaLogFilter";

export const TvalogList = () => (
  <List filters={<LogTvaFilter />} title="Log Tva">
    <Datagrid bulkActionButtons={false}>
      <TextField source="CODECHT" label="chantier" />
      <TextField source="nom" label="fournisseur" />
      <TextField source="CODEDOCUTIL" label="Code Doc" />
      <DateField source="DateDouc" label="date Doc" />
      <NumberField source="TOTHTNET" label="HT" />
      <NumberField source="TOTTVANET" label="TVA" />
      <NumberField source="TOTALTTC" label="TTC" />
      <TextField source="modepaiement" />
      <TextField source="RefPay" />
      <DateField source="DateOperation" />
      <NumberField source="Ras" />
      <NumberField source="NETAPAYER" label="Net A Payer" />
      <TextField source="typeDoc" />
    </Datagrid>
  </List>
);
