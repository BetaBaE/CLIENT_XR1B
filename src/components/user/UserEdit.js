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

const useStyles = makeStyles(() => ({
  autocomplete: {
    width: "650px",
  },
  chip: {
    fontWeight: "bold",
  },
}));

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
        <TextInput
          source="fullname"
          validate={required("Le nom est obligatoire")}
          className={classes.autocomplete}
        />
        <TextInput
          source="username"
          validate={required("Username est obligatoire")}
          className={classes.autocomplete}
        />
        {/* <TextInput source="Role" /> */}
        <SelectInput
          validate={required("Le Role est obligatoire")}
          className={classes.autocomplete}
          source="Role"
          choices={[
            { id: "admin", name: "Admin" },
            { id: "normal user", name: "normal user" },
            //   { id: "photography", name: "Photography" },
          ]}
        />
        {/* <TextInput source="password" /> */}
        <SelectInput
          validate={required("Le status est obligatoire")}
          className={classes.autocomplete}
          source="isActivated"
          choices={[
            { id: "true", name: "activer" },
            { id: "false", name: "desactiver" },
            //   { id: "photography", name: "Photography" },
          ]}
        />
        <DateInput source="created" disabled />
      </SimpleForm>
    </Edit>
  );
};
