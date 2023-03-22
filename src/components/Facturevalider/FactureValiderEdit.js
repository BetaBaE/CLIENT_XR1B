import {
  Edit,
  regex,
  SelectInput,
  SimpleForm,
  TextInput,
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
export const FactureValiderEdit = () => {
  const classes = useStyles();
  const { identity, isLoading: identityLoading } = useGetIdentity();
  const { isLoading, error } = useGetIdentity();
  if (isLoading) return <>Loading</>;
  if (error) return <>Error</>;
  const validateBc = regex(
    /^CF[0-9]{3}[0-9]{3}$/,
    "ce bon commande n'est pas valide"
  );
  return (
    <Edit>
      <SimpleForm>
        <TextInput
          defaultValue={identity.fullName}
          label="vous êtes"
          hidden={false}
          className={classes.autocomplete}
          disabled={true}
          source="updatedBy"
        ></TextInput>
        <SelectInput
          source="verifiyMidelt"
          choices={[{ id: "verifié", name: "verifié" }]}
        />
        <TextInput
          source="BonCommande"
          label="BonCommande"
          validate={validateBc}
          className={classes.autocomplete}
          resettable
        />
      </SimpleForm>
    </Edit>
  );
};
