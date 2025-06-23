import {
  Datagrid,
  DateField,
  List,
  NumberField,
  ReferenceField,
  TextField,
} from "react-admin";

export const OvcredocList = () => {
  return (
    <List title="Ordres de virement & Credoc">
      <Datagrid bulkActionButtons={false} rowClick="edit">
        <TextField source="id" />
        <TextField source="TypePaiement" />
        <ReferenceField source="ribAtner" reference="ribatner" label="nom">
          <TextField source="nom" />
        </ReferenceField>
        <DateField source="dateEcheance" />
        <NumberField source="joursEcheance" />
        <TextField source="etat" />
        <NumberField source="totalDevise" />
        <TextField source="Devise" />
        <DateField
          source="dateExecution"
          locales="fr-MA" // French-Morocco locale
          showTime
          options={{
            hour12: false,
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          }}
        />
        <TextField source="directeurSigne" />
        <TextField source="Redacteur" />
      </Datagrid>
    </List>
  );
};
