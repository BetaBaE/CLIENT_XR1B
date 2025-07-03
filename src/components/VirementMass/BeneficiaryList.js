// src/pages/beneficiaries/BeneficiaryList.jsx
import {
  List,
  Datagrid,
  TextField,
  TextInput,
  useRecordContext,
} from "react-admin";
import { useInputStyleFilters } from "../global/DarkInputStyle";

const filters = [
  <TextInput label="Nom" source="LastName" sx={useInputStyleFilters} />,
  <TextInput label="Prénom" source="FirstName" sx={useInputStyleFilters} />,
  <TextInput label="Ville" source="City" sx={useInputStyleFilters} />,
  <TextInput
    label="Numéro d'identité"
    source="IdentityNumber"
    sx={useInputStyleFilters}
  />,
];

const RecordField = ({ label, render }) => {
  const record = useRecordContext();
  if (!record) return null;

  return <span>{render(record)}</span>;
};

export const BeneficiaryList = () => (
  <List filters={filters}>
    <Datagrid bulkActionButtons={false} rowClick="edit">
      <TextField source="LastName" label="nom" />
      <TextField source="FirstName" label="prénom" />
      <RecordField
        label="Type d'identité"
        render={(record) =>
          record.IdentityType === "1" ? "CIN" : "Carte de séjour"
        }
      />
      <TextField source="IdentityNumber" label="numéro d'identité" />
      <TextField source="Address" label="adresse" />
      <TextField source="City" label="ville" />
      <TextField source="PostalCode" label="code postal" />
      <TextField source="Email" label="email" />
      <TextField source="Phone" label="téléphone" />
    </Datagrid>
  </List>
);
