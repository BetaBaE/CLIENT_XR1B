import { makeStyles } from "@material-ui/core";
import { useEffect, useState } from "react";
import {
  AutocompleteInput,
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
  useDataProvider,
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
 
  const dataProvider1 = useDataProvider();
  const dataProvider2 = useDataProvider();
  const [chantier, setChantier] = useState([]);
  const notify = useNotify();
  const refresh = useRefresh();
  const redirect = useRedirect();
  const onSuccess = () => {
    notify("cette facture est supprimé", { type: "info", undoable: true });

    redirect("/facturesres");
    refresh();
  };
  useEffect(() => {
    dataProvider2
        .getList("chantier", {
            pagination: { page: 1, perPage: 3000 },
            sort: { field: "LIBELLE", order: "ASC" },
        })
        .then(({ data }) => {
            setChantier(data);
        })
        .catch((error) => {
            console.log(error);
        });
}, [dataProvider2]);
let chantier_choices = chantier.map(({ id, LIBELLE, CODEAFFAIRE }) => ({
    id: id,
    name: `${LIBELLE} | ${CODEAFFAIRE} `,
}));



  const UserEditToolbar = (props) => (
    <Toolbar {...props}>
      <SaveButton id="save" />
    </Toolbar>
  );
  const classes = useStyles();
  return (
    <Edit mutationOptions={{ onSuccess }}>
      <SimpleForm toolbar={<UserEditToolbar />}>
      <AutocompleteInput label = "chantier"
        validate = { required("Le chantier est obligatoire") }
        className = { classes.autocomplete }
        source = "codechantier"
        choices = { chantier_choices }
        /> 
  
      </SimpleForm>
    </Edit>
  );
};
