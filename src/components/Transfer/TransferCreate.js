// src/pages/transfers/TransferCreate.jsx
import {
  Create,
  SimpleForm,
  TextInput,
  DateInput,
  required,
  useGetIdentity,
} from "react-admin";
import { useInputStyleFilters } from "../global/DarkInputStyle";
import { Grid } from "@mui/material";

export const TransferCreate = () => {
  const { identity, isLoading, error } = useGetIdentity();
  if (isLoading) return <>Loading</>;
  if (error) return <>Error</>;
  return (
    <Create>
      <SimpleForm>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextInput
              defaultValue={identity?.username}
              label="vous êtes"
              hidden={false}
              sx={useInputStyleFilters}
              slotProps={{
                input: {
                  readOnly: true,
                  autoComplete: "off",
                },
              }}
              source="redacteur"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextInput
              sx={useInputStyleFilters}
              source="description"
              label="Description"
              // validate={required()}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <DateInput
              sx={useInputStyleFilters}
              source="dueDate"
              label="Date d’échéance"
              validate={required()}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextInput
              sx={useInputStyleFilters}
              source="bankCode"
              label="Code Banque"
              defaultValue="504"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextInput
              sx={useInputStyleFilters}
              source="accountNumber"
              label="N° de Compte"
              defaultValue="2121147161920003"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextInput
              sx={useInputStyleFilters}
              source="companyCode"
              label="Code Société"
              defaultValue="ATNERSARL"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextInput
              sx={useInputStyleFilters}
              source="branchCode"
              label="Code Agence"
              defaultValue="0018181002"
            />
          </Grid>
        </Grid>
      </SimpleForm>
    </Create>
  );
};
