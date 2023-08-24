import {
  DateInput,
  Edit,
  required,
  SaveButton,
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
    
        <DateInput
          source="DateEcheance"
          label="DateEcheance"
          validate={required("date obligatoire")}
          className={classes.autocomplete}
        >
 
        </DateInput>
      </SimpleForm>
    </Edit>
  );
};
