import {
  Edit,
  required,
  SaveButton,
  SelectInput,
  SimpleForm,
  TextInput,
  Toolbar,
  useGetIdentity,
} from "react-admin";
import { Grid } from "@mui/material";
import { useInputStyleFilters } from "../global/DarkInputStyle";
const CustomToolbar = () => (
  <Toolbar>
    <SaveButton />
  </Toolbar>
);

export const DesignationEdit = () => {
  const { identity, isLoading: identityLoading } = useGetIdentity();
  if (identityLoading) return <>Loading</>;
  return (
    <Edit title="Modifier Designation">
      <SimpleForm toolbar={<CustomToolbar />} redirect="list">
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextInput
              defaultValue={identity?.username}
              label="vous êtes"
              hidden={false}
              sx={useInputStyleFilters}
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
              source="ModifierPar"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextInput
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
              source="designation"
              sx={useInputStyleFilters}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextInput source="codeDesignation" sx={useInputStyleFilters} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextInput source="PourcentageTVA" sx={useInputStyleFilters} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextInput source="PosteTVA" sx={useInputStyleFilters} />
          </Grid>
          <Grid item xs={12} md={6}>
            <SelectInput
              validate={required("Etat Designation est obligatoire")}
              source="Etat"
              label="Etat Designation"
              choices={[
                { id: "actif", name: "Actif" },
                { id: "inactif", name: "Inactif" },
              ]}
              sx={useInputStyleFilters}
            />
          </Grid>
        </Grid>
      </SimpleForm>
    </Edit>
  );
};
