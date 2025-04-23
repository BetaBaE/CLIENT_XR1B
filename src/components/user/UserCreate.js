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
      {/* Champ pour le nom complet de l'utilisateur */}
      <TextInput source="fullname" />

      {/* Champ pour le nom d'utilisateur */}
      <TextInput source="username" />

      {/* Champ pour le mot de passe */}
      <TextInput source="password" />

      {/* Champ pour le rôle de l'utilisateur */}
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
          { id: "comptable PdT", name: "Comptable PdT" },
          { id: "comptable midelt", name: "Comptable Midelt" },
          {
            id: "superviseur comptabilite midelt",
            name: "Superviseur Comptabilité Midelt",
          },
          {
            id: "direction générale",
            name: "Direction générale",
          },
          {
            id: "consultation directeur",
            name: "Consultation directeur",
          },
          {
            id: "achateur",
            name: "Achateur",
          },
        ]}
      />
    </SimpleForm>
  </Create>
);
