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
export const FactureResEdit = () => {
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
    <Edit label="ajouter"undoable={false}>
     <SimpleForm 
 toolbar={<UserEditToolbar />}
  >
      <TextInput
          source="numeroFacture"
          label="numeroFacture"
          validate={required("Le numeroFacture est obligatoire")}
          className={classes.autocomplete}
        />
        <TextInput
          source="TTC"
          label="TTC"
          validate={required("Le MontantApayer est obligatoire")}
          className={classes.autocomplete}
        />
        <TextInput
          label="designation"
          validate={required(" selectionnez la designation")}
          className={classes.autocomplete}
          source="designation"
          disabled={true}
        />
        <TextInput
          source="BonCommande"
          label="BonCommande"
          validate={required("BonCommande obligatoire")}
          className={classes.autocomplete}
        />
        <TextInput
          label="fournisseur"
          validate={required("choisir le fournisseur")}
          className={classes.autocomplete}
          source="nom"
          disabled={true}
        />
        <DateInput
          source="DateFacture"
          label="date de la facture"
          validate={required("date obligatoire")}
          className={classes.autocomplete}
        >
 
        </DateInput>
      </SimpleForm>
    </Edit>
  );
};
