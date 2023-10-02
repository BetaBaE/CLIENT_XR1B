import { makeStyles } from "@material-ui/styles";
import React, { useState } from "react";
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
  const [echeanceType, setEcheanceType] = useState(null);

  const handleEcheanceChange = (event) => {
    setEcheanceType(event.target.value);
  };
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
  <TextInput
          className={classes.autocomplete}
          source="IF"
          label="Identifiant Fiscal"
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
    </Create>
  );
};
export default CreateFournisseur;
