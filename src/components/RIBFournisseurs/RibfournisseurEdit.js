import React, { useEffect, useState } from "react";
import {
  Edit,
  FileField,
  FileInput,
  FormDataConsumer,
  SaveButton,
  SelectInput,
  SimpleForm,
  TextField,
  TextInput,
  Toolbar,
  required,
  useGetIdentity,
  usePermissions
} from "react-admin";
import { makeStyles } from "@material-ui/core";
import Swal from "sweetalert2";

const useStyles = makeStyles(() => ({
  autocomplete: {
    width: "650px",
  },
}));



const EditToolbar = (props) => (
  <Toolbar {...props}>
    <SaveButton id="save" />
  </Toolbar>
);

const AlertRib = (params) => {
  if (params === null) {
    Swal.fire({
      title: "Rib Fournisseur",
      text: "Merci d'importer l'attestation de rib",
      icon: "warning",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, je l'importe",
    }).then((result) => {
      if (result.isConfirmed) {
        // document.querySelector("#save").click();
        Swal.fire("MERCI!");
      }
    });
  }
};

export const RibfournisseurEdit = (props) => {
  const { permissions } = usePermissions();
  const { identity, isLoading: identityLoading } = useGetIdentity();
  const classes = useStyles();
  const { isLoading, error } = useGetIdentity();
  const [loading, setLoading] = useState(true); 
  const [isModificationMade, setModificationMade] = useState(false);

  useEffect(() => {
    // Utilisez isLoading de useGetList ou useDataProvider pour détecter le chargement des données
    setLoading(isLoading);
  }, [isLoading]);

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
          source="validateur"
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
 <FormDataConsumer>
  {({ formData, ...rest }) => (
    <>
      <SelectInput
        className={classes.autocomplete}
        source="validation"
        validate={required()}
        choices={[
          // Use the current value of formData.validation as an option
          { id: formData.validation, name: formData.validation },
          ...(permissions === "superviseur comptabilite midelt" && formData.validation === "Validé"
            ? [
                { id: "Confirmer", name: "Confirmer" },
                { id: "Désactiver", name: "Désactiver" },
              ]
            : []),
          ...(permissions === "superviseur comptabilite midelt" && formData.validation === "Confirmer"
            ? [
                { id: "Désactiver", name: "Désactiver" },
              ]
            : []),
          ...(formData.validation === "Non Valider"
            ? [
                { id: "Validé", name: "Validé" },
                { id: "Non Valider", name: "Non Valider" },
                { id: "Ignorer", name: "Ignorer" },
              ]
            : []),
        ]}
        disabled={loading}
        lazy={true}
      />
  
    </>
  )}
</FormDataConsumer>




{/* 
        <FormDataConsumer>
          {({ formData, ...rest }) =>
            formData.path_rib !== null ? (
              <TextInput
                label="l'ancien Rib uploder"
                source="path_rib"
                disabled
                className={classes.autocomplete}
              />
            ) : (
              <>{AlertRib(formData.path_rib)}</>
            )
          }
        </FormDataConsumer> */}
      


{/*      
        <div>
          <FileInput
            source="path_rib"
            label="Uploder rib"
            accept="application/pdf,image/png,image/jpeg"
            validate={required("Merci d'importer l'attestation de rib")}
            className={classes.autocomplete}
          >
            <FileField source="src" title="title" />
          </FileInput>
        </div> */}
        
      </SimpleForm>
    </Edit>
  );
};
