// src/pages/beneficiaries/BeneficiaryCreate.jsx
import {
  Create,
  SimpleForm,
  TextInput,
  required,
  email,
  useGetIdentity,
  SelectInput,
  NumberInput,
} from "react-admin";
import { useInputStyleFilters } from "../global/DarkInputStyle";
import { Grid } from "@mui/material";

export const BeneficiaryCreate = () => {
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
              source="lastName"
              label="Nom"
              validate={required()}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextInput
              sx={useInputStyleFilters}
              source="firstName"
              label="Prénom"
              validate={required()}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <SelectInput
              validate={required()}
              source="IdentityType"
              label="Type d'identité"
              choices={[
                { id: "1", name: "Carte d'identité nationale" },
                { id: "2", name: "Carte de séjour" },
              ]}
              sx={useInputStyleFilters}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextInput
              sx={useInputStyleFilters}
              source="identityNumber"
              label="Numéro d'identité"
              validate={required()}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextInput
              sx={useInputStyleFilters}
              source="address"
              label="Adresse"
              validate={required()}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextInput
              sx={useInputStyleFilters}
              source="city"
              label="Ville"
              validate={required()}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <NumberInput
              sx={useInputStyleFilters}
              source="postalCode"
              label="Code postal"
              validate={required()}
              max={99999}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextInput
              sx={useInputStyleFilters}
              source="email"
              label="Email"
              validate={email()}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextInput
              sx={useInputStyleFilters}
              source="phone"
              label="Téléphone"
              validate={required()}
            />
          </Grid>
        </Grid>
      </SimpleForm>
    </Create>
  );
};
