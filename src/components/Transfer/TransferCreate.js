// src/pages/transfers/TransferCreate.jsx
import {
  Create,
  SimpleForm,
  TextInput,
  DateInput,
  required,
  useGetIdentity,
  SaveButton,
  Toolbar,
} from "react-admin";
import { useInputStyleFilters } from "../global/DarkInputStyle";
import { Grid } from "@mui/material";

const getDatePlus60Days = () => {
  const date = new Date();
  date.setDate(date.getDate() + 60);
  return date.toISOString().split("T")[0]; // Format as yyyy-MM-dd
};

const AlwaysEnabledSaveButton = (props) => (
  <SaveButton {...props} alwaysEnable />
);

const CustomToolbar = (props) => (
  <Toolbar {...props}>
    <AlwaysEnabledSaveButton />
  </Toolbar>
);

export const TransferCreate = (props) => {
  const { identity, isLoading, error } = useGetIdentity();
  if (isLoading) return <>Loading</>;
  if (error) return <>Error</>;
  return (
    <Create {...props}>
      <SimpleForm toolbar={<CustomToolbar />}>
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
              defaultValue={getDatePlus60Days()}
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
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
