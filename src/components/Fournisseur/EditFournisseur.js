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
    <Edit label="modfier" undoable={false}>
      <SimpleForm
        toolbar={<UserEditToolbar />}
      >
        <TextInput
          className={classes.autocomplete}
          source="IF"
          label="Identifiant fiscal"
        />
        <TextInput

          className={classes.autocomplete}
          source="ICE"
          label="ICE"
        />
        <TextInput
          className={classes.autocomplete}
          source="addresse"
          label="Adresse"
        />
        <TextInput
          className={classes.autocomplete}
          source="mail"
          label="Mail"
        />
      <SelectInput
         className={classes.autocomplete}
         source="catFournisseur"
         label="Catégorie Fournisseur"
         validate={required()}
         choices={[
          { id: 'personne physique', name: 'personne physique' },
          { id: 'personne morale', name: 'personne morale' },
        ]}
      >
    <SelectInput
         className={classes.autocomplete}
         source="catFournisseur"
         label="Catégorie Fournisseur"
         validate={required()}
         choices={[
          { id: 'personne physique', name: 'personne physique' },
          { id: 'personne morale', name: 'personne morale' },
        ]}
      >
      </SelectInput>
      {/* ([categorie]='personne physique' OR [categorie]='personne morale') */}



      </SelectInput>
      {/* ([categorie]='personne physique' OR [categorie]='personne morale') */}

      </SimpleForm>
    </Edit>
  );
};
