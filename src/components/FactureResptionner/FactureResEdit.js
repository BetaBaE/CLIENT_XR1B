import { makeStyles } from "@material-ui/core";
import {
  DateInput,
  Edit,
  required,
  SaveButton,
  SimpleForm,
  TextInput,
  Toolbar,
  useNotify,
  useRedirect,
  useRefresh,
} from "react-admin";
const useStyles = makeStyles(() => ({
  autocomplete: {
    width: "650px",
  },
  chip: {
    fontWeight: "bold",
  },
}));
export const FactureResEdit = () => {
  const notify = useNotify();
  const refresh = useRefresh();
  const redirect = useRedirect();
  const onSuccess = () => {
    notify("cette facture est supprimé", { type: "info", undoable: true });

    redirect("/facturesres");
    refresh();
  };
  const UserEditToolbar = (props) => (
    <Toolbar {...props}>
      <SaveButton id="save" />
    </Toolbar>
  );
  const classes = useStyles();
  return (
    <Edit mutationOptions={{ onSuccess }}>
      <SimpleForm toolbar={<UserEditToolbar />}>
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
          {" "}
        </DateInput>
      </SimpleForm>
    </Edit>
  );
};
