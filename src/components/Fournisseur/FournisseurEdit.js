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

// Styles personnalisés pour les composants
const useStyles = makeStyles(() => ({
  autocomplete: {
    width: "580px", // Largeur personnalisée pour les champs d'autocomplétion
  },
  chip: {
    fontWeight: "bold", // Style pour le texte en gras
  },
}));

export const FournisseurEdit = () => {
  const classes = useStyles(); // Application des styles
  const { isLoading, error } = useGetIdentity(); // Gestion de l'état de l'utilisateur
  if (isLoading) return <>Loading</>; // Affichage d'un message de chargement
  if (error) return <>Error</>; // Affichage d'une erreur si elle se produit

  const UserEditToolbar = (props) => (
    <Toolbar {...props}>
      <SaveButton id="save" /> {/* Bouton de sauvegarde */}
    </Toolbar>
  );

  return (
    <Edit label="Modifier" undoable={false}>
      {" "}
      {/* Édition de l'entité sans possibilité d'annuler */}
      <SimpleForm toolbar={<UserEditToolbar />}>
        <TextInput
          className={classes.autocomplete}
          source="Identifiantfiscal"
          label="Identifiant fiscal"
        />
        <TextInput className={classes.autocomplete} source="ICE" label="ICE" />
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
          validate={required()} // Validation requise
          choices={[
            { id: "personne physique", name: "personne physique" },
            { id: "personne morale", name: "personne morale" },
          ]}
        >
          {/* Choix de la catégorie du fournisseur */}
        </SelectInput>

        <SelectInput
          className={classes.autocomplete}
          source="exonorer"
          label="Exonération fournisseur"
          validate={required()} // Validation requise
          choices={[
            { id: "Oui", name: "Oui" },
            { id: "Non", name: "Non" },
          ]}
        ></SelectInput>
      </SimpleForm>
    </Edit>
  );
};
