import { makeStyles } from "@material-ui/core";
import { useEffect } from "react";
import { Create, required, SimpleForm, TextInput, useGetIdentity } from "react-admin";

const useStyles = makeStyles(() => ({
  autocomplete: {
    width: "650px",
  },
  chip: {
    fontWeight: "bold",
  },
}));



export const RIBAtnerCreate = () => {
  const { identity, isLoading: identityLoading } = useGetIdentity();
  useEffect(() => {
    // Désactiver l'autocomplétion après le chargement du DOM
    const inputnom = document.getElementById("nom");
    const inputrib = document.getElementById("rib");
 
    if (inputnom ||inputnom  ) {
      inputrib.autocomplete = "off";
      inputnom.autocomplete = "off";
     
    }
  }, []);

 
  const classes = useStyles();
  const { isLoading, error } = useGetIdentity();
  if (isLoading) return <>Loading</>;
  if (error) return <>Error</>;
  return (
    <Create>
      <SimpleForm>
        {/* <TextInput source="id" /> */}
        <TextInput
          defaultValue={identity?.fullName}
          label="vous êtes"
          hidden={false}
          className={classes.autocomplete}
          disabled={true}
          source="Redacteur"
        >

        </TextInput>
       
       
        <TextInput
          validate={required("Le nom est obligatoire")}
          className={classes.autocomplete}
          source="nom"
        />
        <TextInput
          validate={required("Le RIB est obligatoire")}
          className={classes.autocomplete}
          source="rib"
        />
      </SimpleForm>
    </Create>
  );
};
