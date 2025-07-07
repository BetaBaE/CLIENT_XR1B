// src/pages/transfers/TransferList.jsx
import {
  List,
  Datagrid,
  TextField,
  DateField,
  NumberField,
  TextInput,
  SelectInput,
} from "react-admin";
import { useInputStyleFilters } from "../global/DarkInputStyle";

const TransferListFilter = [
  <TextInput source="Reference" label="Reference" sx={useInputStyleFilters} />,
  <TextInput
    source="Description"
    label="Description"
    sx={useInputStyleFilters}
  />,
  <SelectInput
    choices={[
      { id: "Saisie", name: "Saisie" },
      { id: "Générer", name: "Générer" },
      { id: "Reglee", name: "Reglee" },
      { id: "Annuler", name: "Annuler" },
    ]}
    source="Status"
    label="Statut"
    sx={useInputStyleFilters}
  />,
];
export const TransferList = () => {
  return (
    <List filters={TransferListFilter}>
      <Datagrid bulkActionButtons={false} rowClick="edit">
        <TextField source="Reference" label="Référence" />
        <TextField source="Description" label="Description" />
        <DateField source="DueDate" label="Date d’échéance" />
        <TextField source="Status" label="Statut" />
        <TextField source="BankCode" label="Code Banque" />
        <TextField source="AccountNumber" label="N° de Compte" />
        <NumberField source="TotalAmount" label="Montant Total" />
        <NumberField
          source="BeneficiaryCount"
          label="Nombre de Bénéficiaires"
        />
        <TextField source="CompanyCode" label="Code Société" />
        <TextField source="BranchCode" label="Code Agence" />
        <TextField source="CreatedBy" label="Créé par" />
        <DateField
          source="CreatedAt"
          label="Créé le"
          showTime
          locales="fr-FR"
          options={{
            timeZone: "UTC", // Disables timezone conversion
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
          }}
        />
      </Datagrid>
    </List>
  );
};
