import {
  DateTimeInput,
  Edit,
  SelectInput,
  SimpleForm,
  TextInput,
  useGetIdentity,
} from "react-admin";

import { required } from "react-admin";
import { makeStyles } from "@material-ui/styles";

// Styles personnalisés pour les composants
const useStyles = makeStyles(() => ({
  autocomplete: {
    width: "580px", // Largeur personnalisée pour les champs d'autocomplétion
  },
  chip: {
    fontWeight: "bold", // Style pour le texte en gras
  },
}));

export const TmpfournisseurEdit = () => {
  const { identity, isLoading, error } = useGetIdentity(); // Single call for identity

  const classes = useStyles();

  if (isLoading) return <div>Chargement en cours...</div>;
  if (error) return <div>Une erreur est survenue.</div>;
  return (
    <Edit>
      <SimpleForm>
        <TextInput
          defaultValue={identity?.fullName}
          label="Vous êtes"
          disabled
          source="Validateur"
          className={classes.autocomplete}
          inputProps={{ autoComplete: "off" }}
        />
        <TextInput source="nom" disabled className={classes.autocomplete} />
        <TextInput
          label="Acheteur"
          source="Redacteur"
          disabled
          className={classes.autocomplete}
        />
        <DateTimeInput
          source="dateCreation"
          disabled
          className={classes.autocomplete}
        />
        <TextInput
          source="catFournisseur"
          disabled
          className={classes.autocomplete}
        />
        <TextInput source="etat" disabled className={classes.autocomplete} />
        <SelectInput
          className={classes.autocomplete}
          source="etat"
          label="Etat de validation"
          validate={required()} // Validation requise
          choices={[
            { id: "Valide", name: "Valide" },
            { id: "Ignore", name: "Ignore" },
          ]}
        ></SelectInput>
      </SimpleForm>
    </Edit>
  );
};
