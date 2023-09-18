import {
  DateInput,
  Edit,
  required,
  SaveButton,
  SelectInput,
  SimpleForm,
  TextInput,
  Toolbar,
  useGetIdentity,
} from "react-admin";
import { makeStyles } from "@material-ui/styles";
const useStyles = makeStyles(() => ({
  autocomplete: {
    width: "580px",
  },
  chip: {
    fontWeight: "bold",
  },
}));
export const EditFournisseur = () => {
  const classes = useStyles();



  const { isLoading, error } = useGetIdentity();
  if (isLoading) return <>Loading</>;
  if (error) return <>Error</>;
 

  const UserEditToolbar = (props) => (
    <Toolbar {...props}>
      <SaveButton id="save" />
    </Toolbar>
  );
  return (
    <Edit label="modfier"undoable={false}>
     <SimpleForm 
 toolbar={<UserEditToolbar />}
  >
      <SelectInput source="Echeance"  label="Echeance" choices={[
    { id: '30', name: '30' },
    { id: '60', name: '60' },
    { id: '90', name: '90' },
    { id: '120', name: '120' },
]} />
  <TextInput
          className={classes.autocomplete}
          source="registrecommerce"
          label="registre de commerce"
        />
<TextInput
      
          className={classes.autocomplete}
          source="ICE"
          label="ICE"
        />
  <TextInput
          className={classes.autocomplete}
          source="adresse"
          label="adresse"
        />
          <TextInput
          className={classes.autocomplete}
          source="mail"
          label="mail"
        />

      </SimpleForm>
    </Edit>
  );
};
