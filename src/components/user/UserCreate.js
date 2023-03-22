import * as React from "react";
import {
  Create,
  SelectInput,
  SimpleForm,
  TextInput,
  // DateInput,
  // required,
} from "react-admin";
export const UserCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="fullname" />
      <TextInput source="username" />
      <TextInput source="password" />
      {/* <TextInput source="role" /> */}
      <SelectInput
        source="role"
        allowEmpty
        choices={[
          { id: "admin", name: "Admin" },
          { id: "normal user", name: "Normal user" },
          {
            id: "superviseur comptabilite",
            name: "Superviseur Comptabilité",
          },
          { id: "comptable", name: "Comptable" },
          { id: "comptable midelt", name: "comptable midelt" },
          {
            id: "superviseur comptabilite midelt",
            name: "superviseur comptabilite midelt",
          },

          //   { id: "photography", name: "Photography" },
        ]}
      />
      {/* <DateInput source="created" /> */}
    </SimpleForm>
  </Create>
);

// <SimpleForm>
//   <TextInput source="fullname" />
//   <TextInput source="username" />
//   <SelectInput
//     source="Role"
//     choices={[
//       { id: "admin", name: "Admin" },
//       { id: "normal user", name: "normal user" },
//       //   { id: "photography", name: "Photography" },
//     ]}
//   />
//   <TextInput source="password" />
//   <SelectInput
//     source="isActivated"
//     choices={[
//       { id: "true", name: "activer" },
//       { id: "false", name: "desactiver" },
//     ]}
//   />
// </SimpleForm>;
