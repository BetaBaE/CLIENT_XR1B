import {
  BooleanField,
  DatagridConfigurable,
  DateField,
  ExportButton,
  List,
  NumberField,
  SelectColumnsButton,
  TextField,
  TextInput,
  TopToolbar,
} from "react-admin";

const AlerteListActions = () => (
  <TopToolbar>
    <SelectColumnsButton />
    <ExportButton />
  </TopToolbar>
);

const alerteFilters = [
  <TextInput
    key="numeroFacture"
    source="numeroFacture"
    label="numeroFacture"
    alwaysOn
  />,
  <TextInput key="fournisseur" source="fournisseur" label="fournisseur" alwaysOn />,
];

export const FactureAlerteSansPapierList = () => {
  return (
    <List
      actions={<AlerteListActions />}
      title="Alerte - Factures sans papier reçu"
      exporter={false}
      filters={alerteFilters}
    >
      <DatagridConfigurable rowClick="edit" bulkActionButtons={false}>
        <TextField source="LIBELLE" label="chantier" />
        <TextField source="designation" label="designation" />
        <TextField source="CatFn" label="CatFn" />
        <DateField source="DateFacture" label="DateFacture" />
        <TextField source="numeroFacture" label="numeroFacture" />
        <NumberField source="HT" label="HT" />
        <NumberField source="MontantTVA" label="MontantTVA" />
        <NumberField source="TTC" label="TTC" />
        <TextField source="BonCommande" label="BonCommande" />
        <TextField source="nom" label="fournisseur" />
        <TextField source="CodeFournisseur" label="CodeFournisseur" />
        <TextField source="fullName" label="crée par" />
        <TextField source="etat" label="Etat" />
        <BooleanField source="papierRecu" label="Papier reçu" />
        <DateField
          showTime
          source="createdDate"
          options={{ timeZone: "UTC" }}
        />
        <DateField source="dateecheance" />
      </DatagridConfigurable>
    </List>
  );
};
