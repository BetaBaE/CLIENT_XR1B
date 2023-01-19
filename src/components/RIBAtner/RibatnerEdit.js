import { makeStyles } from "@material-ui/core";
import {
  Edit,
  required,
  SaveButton,
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

export const RibatnerEdit = (props) => {
  const classes = useStyles();
  return (
    <Edit {...props}>
      <SimpleForm toolbar={<EditToolbar />}>
        {/* <TextInput source="id" /> */}
        <TextInput
          validate={required("Le nom est obligatoire")}
          className={classes.autocomplete}
          source="nom"
        />
        <TextInput
          validate={required("Le RIB est obligatoire")}
          className={classes.autocomplete}
          source="rib"
        />
      </SimpleForm>
    </Edit>
  );
};
