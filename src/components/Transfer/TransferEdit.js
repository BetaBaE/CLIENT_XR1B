// src/pages/transfers/TransferEdit.jsx
import {
  Edit,
  SimpleForm,
  TextInput,
  DateInput,
  required,
  ArrayField,
  Datagrid,
  TextField,
  NumberField,
  useRecordContext,
  Labeled,
  SelectInput,
  useGetRecordId,
  useGetOne,
  Toolbar,
  SaveButton,
} from "react-admin";
import { useInputStyleFilters } from "../global/DarkInputStyle";
import { Typography, Box, Grid } from "@mui/material";

const BeneficiariesList = () => {
  const record = useRecordContext();
  if (!record || !record.beneficiaries || record.beneficiaries.length === 0) {
    return <Typography variant="body2">No beneficiaries</Typography>;
  }

  const totalAmount = record.beneficiaries.reduce(
    (sum, beneficiary) => sum + beneficiary.Amount,
    0
  );

  return (
    <Box sx={{ marginTop: 2 }}>
      <Typography variant="h6" sx={{ marginTop: 2, marginBottom: 1 }}>
        Beneficiaries
      </Typography>
      <ArrayField source="beneficiaries">
        <Datagrid
          bulkActionButtons={false}
          rowClick={false}
          sx={{
            "& .RaDatagrid-headerCell": {
              fontWeight: "bold",
            },
          }}
        >
          <TextField source="TransferReference" label="Référence" />
          <TextField source="LastName" label="Nom" />
          <TextField source="FirstName" label="Prénom" />
          <NumberField
            source="Amount"
            label="Montant"
            options={{ style: "currency", currency: "MAD" }}
            sx={{ fontWeight: "bold" }}
          />
        </Datagrid>
      </ArrayField>
      <Labeled label="Total">
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {totalAmount.toFixed(2)}
        </Typography>
      </Labeled>
    </Box>
  );
};

const CustomToolbar = () => (
  <Toolbar>
    <SaveButton /> {/* Only keeps the Save button */}
  </Toolbar>
);

export const TransferEdit = () => {
  const recordId = useGetRecordId();
  const { data: record, isLoading } = useGetOne("transfers", { id: recordId });
  const isDisabled = record?.Status === "Reglee";
  const countBeneficiaries = record?.beneficiaries?.length || 0;

  if (isLoading) return <div>Loading...</div>;
  return (
    <Edit>
      <SimpleForm toolbar={<CustomToolbar />} disabled={isDisabled}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextInput
              sx={useInputStyleFilters}
              source="Reference"
              disabled // This is already disabled
              label="Référence"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextInput
              sx={useInputStyleFilters}
              source="Description"
              label="Description"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DateInput
              sx={useInputStyleFilters}
              disabled={isDisabled}
              source="DueDate"
              label="Date d'échéance"
              validate={required()}
            />
          </Grid>
          {countBeneficiaries > 0 && (
            <Grid item xs={12} sm={6}>
              <SelectInput
                disabled={isDisabled}
                sx={useInputStyleFilters}
                source="Status"
                validate={required()}
                label="Statut"
                choices={[
                  { id: "Reglee", name: "Reglee" },
                  { id: "Annuler", name: "Annuler" },
                ]}
              />
            </Grid>
          )}
          {countBeneficiaries === 0 && (
            <Grid item xs={12} sm={6}>
              <SelectInput
                disabled={isDisabled}
                sx={useInputStyleFilters}
                source="Status"
                validate={required()}
                label="Statut"
                choices={[{ id: "Annuler", name: "Annuler" }]}
              />
            </Grid>
          )}
          <Grid item xs={12} sm={6}>
            <TextInput
              sx={useInputStyleFilters}
              source="BankCode"
              label="Code Banque"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextInput
              sx={useInputStyleFilters}
              source="AccountNumber"
              label="N° de Compte"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextInput
              sx={{ ...useInputStyleFilters, width: "20%" }}
              source="CompanyCode"
              label="Code Société"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextInput
              sx={useInputStyleFilters}
              source="BranchCode"
              label="Code Agence"
            />
          </Grid>
        </Grid>
        <BeneficiariesList />
      </SimpleForm>
    </Edit>
  );
};
