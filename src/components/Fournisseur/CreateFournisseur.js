import { makeStyles } from "@material-ui/styles";
import React from "react";
import { Create, DateInput, regex, required, SelectInput, SimpleForm, TextInput } from "react-admin";

const useStyles = makeStyles(() => ({
  autocomplete: {
    width: "650px",
  },
  chip: {
    fontWeight: "bold",
  },
}));

const CreateFournisseur = (props) => {
  const classes = useStyles();
  const validationcodefournisseur = regex(
    /^[0-9]+$/,
    "ce code n'est pas valide"
  );
  return (
    <Create>
      <SimpleForm {...props}>
        <TextInput
          validate={[required("Le Code fournisseur est obligatoire"),validationcodefournisseur]}
          className={classes.autocomplete}
          source="CodeFournisseur"
        />
        <TextInput
          validate={required("Le fournisseur est obligatoire")}
          className={classes.autocomplete}
          source="nom"
        />
    <SelectInput source="DateEcheance"  label="Echeance" choices={[
    { id: '30', name: '30' },
    { id: '60', name: '60' },
    { id: '90', name: '90' },
    { id: '120', name: '120' },
]} />

      </SimpleForm>
    </Create>
  );
};
export default CreateFournisseur;
