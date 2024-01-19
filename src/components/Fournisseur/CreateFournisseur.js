import { makeStyles } from "@material-ui/styles";
import React, { useEffect, useState } from "react";
import { Create, DateInput, regex, required, SelectInput, SimpleForm, TextInput, FormDataConsumer,useGetIdentity } from "react-admin";
import apiUrl from "../../config";
// import _debounce from 'lodash/debounce';

const useStyles = makeStyles(() => ({
  autocomplete: {
    width: "650px",
  },
  chip: {
    fontWeight: "bold",
  },
}));

const CreateFournisseur = (props) => {



  const [loadingSuggestions, setLoadingSuggestions] = useState(false); // Define loading state
  const [errorSuggestions, setErrorSuggestions] = useState(null);

  const [NomFournisseur, setNomFournisseur] = useState([]);

  const { identity, isLoading: identityLoading } = useGetIdentity();
  
  useEffect(() => {
    // Désactiver l'autocomplétion après le chargement du DOM
    const inputNom = document.getElementById("nom");
    const inputCodeFournisseur = document.getElementById("CodeFournisseur");
    const inputICE = document.getElementById("ICE");
    const inputIF = document.getElementById("IF");
    const inputaddresse = document.getElementById("addresse");
    const inputmail = document.getElementById("mail");
    if (inputNom ||inputCodeFournisseur ||inputICE  ||inputIF ||inputaddresse||inputmail ) {
      inputNom.autocomplete = "off";
      inputCodeFournisseur.autocomplete = "off";
      inputICE.autocomplete = "off";
      inputIF.autocomplete = "off";
      inputaddresse.autocomplete = "off";
      inputmail.autocomplete = "off";
    }
  }, []);
  const classes = useStyles();
  const { isLoading, error } = useGetIdentity();
  if (isLoading) return <>Loading</>;
  if (error) return <>Error</>
  // const debouncedGetNominationFournisseur = _debounce(async (nom) => {
  //   try {
  //     setLoadingSuggestions(true);

  //     let url = `${apiUrl}/getNomfournisseur`;
  //     const response = await fetch(url, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ nom }),
  //     });

  //     const json = await response.json();
  //     setNomFournisseur(json);
  //     setErrorSuggestions(null);
  //   } catch (error) {
  //     console.error('Error fetching data from server:', error);
  //     setErrorSuggestions('Error fetching suggestions');
  //   } finally {
  //     setLoadingSuggestions(false);
  //   }
  // }, 500);

  // const handleInputChange = (event) => {
  //   const nom = event.target.value;
  //   console.log(nom);
  //   if (!nom.trim()) {
  //     setNomFournisseur([]);
  //     return;
  //   }

  //   debouncedGetNominationFournisseur(nom);
  // };

  
  const validationcodefournisseur = regex(
    /^[0-9]+$/,
    "ce code n'est pas valide"
  );
  return (
    <Create>
      <SimpleForm {...props} autocomplete="off" >
      <TextInput
          defaultValue={identity.fullName}
          label="vous êtes"
          hidden={false}
          className={classes.autocomplete}
          disabled={true}
          source="Redacteur"
        ></TextInput>
        
        <TextInput
          validate={[required("Le Code fournisseur est obligatoire"),validationcodefournisseur]}
          className={classes.autocomplete}
          source="CodeFournisseur"
          
        />
<TextInput
  validate={required("Le fournisseur est obligatoire")}
  className={classes.autocomplete}
  source="nom"
  id="nom"
  // onChange={handleInputChange}

/>
{NomFournisseur ? (
  <div>
    <p>Les fournisseurs existent: </p>
    {NomFournisseur.map(({ nom }) => (
      <div key={nom}> 
        {nom}
      </div>
    ))}
  </div>
) : null}



  <TextInput
          className={classes.autocomplete}
          source="IF"
          label="Identifiant Fiscal"
      
        />
<TextInput
       autocomplete="off" 
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
