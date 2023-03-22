import { makeStyles } from "@material-ui/core";
import {
    DateInput,
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
export const FactureRechereEdit = () => {
    const UserEditToolbar = (props) => (
       <Toolbar {...props } > 
        <SaveButton id = "save" />
        </Toolbar>
    );
    const classes = useStyles();
    return ( 
      <Edit>
        <SimpleForm toolbar = { <UserEditToolbar /> } >
        <TextInput source = "ficheNavette"
        label = "ficheNavette"
        className = { classes.autocomplete }
        />
        <TextInput source = "numeroFacture"
        label = "numeroFacture"
        disabled = { true }
        className = { classes.autocomplete }
        />
        <TextInput source = "TTC"
        label = "TTC"
        disabled = { true }
        className = { classes.autocomplete }
        /> 
        <TextInput label = "designation"
        className = { classes.autocomplete }
        source = "designation"
        disabled = { true }
        />
        <TextInput source = "BonCommande"
        label = "BonCommande"
        validate = { required("BonCommande obligatoire") }
        className = { classes.autocomplete }
        disabled = { true }
        /> 
        <TextInput label = "fournisseur"
        className = { classes.autocomplete }
        source = "nom"
        disabled = { true }
        />
        <DateInput source = "DateFacture"
        label = "date de la facture"
        disabled = { true }
        className = { classes.autocomplete }
      />
        </SimpleForm > 
        </Edit>
    );
};