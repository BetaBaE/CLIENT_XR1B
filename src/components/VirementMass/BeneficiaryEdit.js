// src/pages/beneficiaries/BeneficiaryEdit.jsx
import { Grid } from "@mui/material";
import {
  Edit,
  SimpleForm,
  TextInput,
  required,
  email,
  SelectInput,
} from "react-admin";
import { useInputStyleFilters } from "../global/DarkInputStyle";

export const BeneficiaryEdit = () => (
  <Edit>
    <SimpleForm>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextInput
            source="LastName"
            label="Nom"
            sx={useInputStyleFilters}
            validate={required()}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextInput
            source="FirstName"
            label="Prénom"
            sx={useInputStyleFilters}
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
            source="IdentityNumber"
            label="Numéro d'identité"
            sx={useInputStyleFilters}
            validate={required()}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextInput
            source="Address"
            label="Adresse"
            sx={useInputStyleFilters}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextInput source="City" label="Ville" sx={useInputStyleFilters} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextInput
            source="PostalCode"
            label="Code postal"
            sx={useInputStyleFilters}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextInput
            source="Email"
            sx={useInputStyleFilters}
            validate={email()}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextInput
            source="Phone"
            label="Téléphone"
            sx={useInputStyleFilters}
          />
        </Grid>
      </Grid>
    </SimpleForm>
  </Edit>
);
// This component allows editing of beneficiary details, including validation for required fields and email format.
// It uses the `Edit` and `SimpleForm` components from React Admin to create a user-friendly form for updating beneficiary information.
// The `TextInput` components are used for each field, with validation rules applied where necessary.
// The `required` validator ensures that certain fields must be filled out, while the `email` validator checks the format of the email address.
// This setup is essential for maintaining data integrity and providing a smooth user experience when managing beneficiary records.
// The `Edit` component wraps the form, allowing users to modify existing beneficiary records.
// The `SimpleForm` component simplifies form creation by automatically handling form state and submission.
// This component is part of a larger application that manages beneficiaries, likely in a financial or administrative context.
// It is designed to be used within a React Admin framework, which provides a robust set of tools for building admin interfaces.
// The `BeneficiaryEdit` component is a key part of the beneficiary management system, enabling users to update beneficiary information easily.
// It is typically accessed through a route that includes the beneficiary's ID, allowing the form to load the existing data for editing.
// This component is essential for maintaining accurate and up-to-date beneficiary records in the application.
// It is part of a broader set of components that handle the creation, listing, and management of beneficiaries within the system.
// The use of React Admin's components ensures that the form is consistent with the overall design and functionality of the admin interface.
// The `BeneficiaryEdit` component is crucial for administrators or users with the appropriate permissions to modify beneficiary details.
// It provides a straightforward way to update beneficiary information, ensuring that the data remains accurate and relevant.
// The component is designed to be reusable and easily integrated into the existing React Admin setup, following best practices for form handling and validation.
