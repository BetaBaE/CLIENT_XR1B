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
        <SelectInput
          source="echeanceloi"
          className={classes.autocomplete}
          label="Échéance Loi Conventionne"
          choices={[
            { id: '30', name: '30jour net' },
            { id: '30fm', name: '30jour fin de mois' },
            { id: '60', name: '60 NET' },
            { id: '60fm', name: '30jour fin de mois' },
            { id: '60', name: '60 NET' },
            { id: '60fm', name: '60jour fin de mois' },
            { id: '90', name: '90 NET' },
            { id: '90fm', name: '90jour fin de mois' },
            { id: '120', name: '120Net' },
            { id: '120fm', name: '120jour fin de mois' },
          ]}
        />


        <SelectInput
          source="echeancereel"
          className={classes.autocomplete}
          label="Échéance Reel Fournisseur"
          choices={[
            { id: '30', name: '30jour net' },
            { id: '30fm', name: '30jour fin de mois' },
            { id: '60', name: '60 NET' },
            { id: '60fm', name: '30jour fin de mois' },
            { id: '60', name: '60 NET' },
            { id: '60fm', name: '60jour fin de mois' },
            { id: '90', name: '90 NET' },
            { id: '90fm', name: '90jour fin de mois' },
            { id: '120', name: '120Net' },
            { id: '120fm', name: '120jour fin de mois' },
          ]}
        />


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

      </SimpleForm>
    </Edit>
  );
};
