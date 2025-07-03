// src/pages/transfers/TransferList.jsx
import { List, Datagrid, TextField, DateField, NumberField } from "react-admin";

export const TransferList = () => (
  <List>
    <Datagrid bulkActionButtons={false} rowClick="edit">
      {/* <TextField source="id" /> */}
      <TextField source="Reference" label="Référence" />
      <TextField source="Description" label="Description" />
      <DateField source="DueDate" label="Date d’échéance" />
      <TextField source="Status" label="Statut" />
      <TextField source="BankCode" label="Code Banque" />
      <TextField source="AccountNumber" label="N° de Compte" />
      <NumberField source="TotalAmount" label="Montant Total" />
      <NumberField source="BeneficiaryCount" label="Nombre de Bénéficiaires" />
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
