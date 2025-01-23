import { makeStyles } from "@material-ui/core";
import {
  Edit,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
  useGetIdentity,
} from "react-admin";

const useStyles = makeStyles(() => ({
  autocomplete: {
    width: "650px", // Largeur des champs d'autocomplétion
  },
  chip: {
    fontWeight: "bold", // Style de police en gras pour les étiquettes
  },
}));
export const DesignationEdit = () => {
  const { identity, isLoading: identityLoading } = useGetIdentity();
  const classes = useStyles();
  return (
    <Edit>
      <SimpleForm>
        <TextInput
          defaultValue={identity?.fullName}
          label="vous êtes"
          hidden={false}
          className={classes.autocomplete}
          disabled={true}
          source="ModifierPar"
        />
        <TextInput
          disabled
          source="designation"
          className={classes.autocomplete}
        />
        <TextInput source="codeDesignation" className={classes.autocomplete} />
        <TextInput source="PourcentageTVA" className={classes.autocomplete} />
        <TextInput source="PosteTVA" className={classes.autocomplete} />
        <SelectInput
          className={classes.autocomplete}
          validate={required("Etat Designation est obligatoire")}
          source="Etat"
          label="Etat Designation"
          choices={[
            { id: "actif", name: "Actif" },
            { id: "inactif", name: "Inactif" },
          ]}
        />
      </SimpleForm>
    </Edit>
  );
};
