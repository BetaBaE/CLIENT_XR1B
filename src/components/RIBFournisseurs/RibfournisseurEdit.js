import { makeStyles } from "@material-ui/core";
import {
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

export const RibfournisseurEdit = () => {
  const classes = useStyles();
  return (
    <Edit>
      <SimpleForm toolbar={<EditToolbar />}>
        {/* <TextInput source="id" /> */}
        <TextInput
          className={classes.autocomplete}
          source="fournisseur"
          disabled
        />
         <TextInput
          className={classes.autocomplete}
          source="swift"
          disabled
        />
           
        <TextInput className={classes.autocomplete}   source="banque"
           label="Banque" disabled />
      
        <TextInput className={classes.autocomplete} source="rib" disabled />
        <SelectInput
          className={classes.autocomplete}
          source="validation"
          validate={required()}
          choices={[
            { id: "Validé", name: "Validé" },
            { id: "Non Valider", name: "Non Valider" },
            { id: "Ignorer", name: "Ignorer" },
          ]}
        />
      </SimpleForm>
    </Edit>
  );
};
