import { makeStyles } from "@material-ui/core";
import {
  DateInput,
  Edit,
  required,
  SaveButton,
  SelectInput,
  SimpleForm,
  TextInput,
  Toolbar,
} from "react-admin";

// Styles personnalisés pour le composant
const useStyles = makeStyles(() => ({
  autocomplete: {
    width: "650px",
  },
  chip: {
    fontWeight: "bold",
  },
}));

// Barre d'outils personnalisée pour l'édition
const EditToolbar = (props) => (
  <Toolbar {...props}>
    <SaveButton id="save" />
  </Toolbar>
);

export const UserEdit = (props) => {
  const classes = useStyles();

  return (
    <Edit {...props}>
      <SimpleForm toolbar={<EditToolbar />}>
        {/* Champ pour le nom complet de l'utilisateur */}
        <TextInput
          source="fullname"
          validate={required("Le nom est obligatoire")}
          className={classes.autocomplete}
        />

        {/* Champ pour le nom d'utilisateur */}
        <TextInput
          source="username"
          validate={required("Username est obligatoire")}
          className={classes.autocomplete}
        />

        {/* Sélecteur pour le rôle de l'utilisateur */}
        <SelectInput
          validate={required("Le Role est obligatoire")}
          className={classes.autocomplete}
          source="Role"
          choices={[
            { id: "admin", name: "Admin" },
            { id: "normal user", name: "Normal user" },
            {
              id: "superviseur comptabilite",
              name: "Superviseur Comptabilité",
            },
            { id: "comptable", name: "Comptable" },
            { id: "comptable midelt", name: "Comptable Midelt" },
            {
              id: "superviseur comptabilite midelt",
              name: "Superviseur Comptabilité Midelt",
            },
          ]}
        />

        {/* Sélecteur pour l'état d'activation de l'utilisateur */}
        <SelectInput
          validate={required("Le status est obligatoire")}
          className={classes.autocomplete}
          source="isActivated"
          choices={[
            { id: "true", name: "Activer" },
            { id: "false", name: "Désactiver" },
          ]}
        />

        {/* Champ pour la date de création (non modifiable) */}
        <DateInput source="created" disabled />
      </SimpleForm>
    </Edit>
  );
};
