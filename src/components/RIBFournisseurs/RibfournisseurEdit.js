
import React from "react";
import {
  Edit,
  SaveButton,
  SelectInput,
  SimpleForm,
  TextInput,
  Toolbar,
  required,
  useGetIdentity,
  usePermissions
} from "react-admin";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  autocomplete: {
    width: "650px",
  },
  chip: {
    fontWeight: "bold",
  },
}));

const EditToolbar = (props) => (
  <Toolbar {...props}>
    <SaveButton id="save" />
  </Toolbar>
);

export const RibfournisseurEdit = (props) => {
  const { permissions } = usePermissions();
  const { identity, isLoading: identityLoading } = useGetIdentity();
  const classes = useStyles();
  const { isLoading, error } = useGetIdentity();

  if (isLoading || identityLoading) return <>Loading</>;
  if (error) return <>Error</>;

  return (
    <Edit {...props}>
      <SimpleForm toolbar={<EditToolbar />}>
        <TextInput
          defaultValue={identity?.fullName}
          label="Vous êtes"
          hidden={false}
          className={classes.autocomplete}
          disabled={true}
          source="Validateur"
        />

        <TextInput
          className={classes.autocomplete}
          source="fournisseur"
          disabled
        />

        <TextInput
          className={classes.autocomplete}
          source="swift"
          disabled
        />

        <TextInput
          className={classes.autocomplete}
          source="banque"
          label="Banque"
          disabled
        />

        <TextInput
          className={classes.autocomplete}
          source="rib"
          disabled
        />

<SelectInput
  className={classes.autocomplete}
  source="validation"
  validate={required()}
  choices={[
    ...(permissions === "superviseur comptabilite midelt"
    ? [{ id: "Confirmer", name: "Confirmer" },
    { id: "Désactiver", name: "Désactiver" }
  ]
    : []),
    { id: "Validé", name: "Validé" },
    { id: "Non Valider", name: "Non Valider" },
    { id: "Ignorer", name: "Ignorer" }
  ]}
/>


      
  
      
      </SimpleForm>
    </Edit>
  );
};
