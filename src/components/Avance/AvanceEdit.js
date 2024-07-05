import React, { useEffect, useState } from "react";
import {
  AutocompleteInput,
  Edit,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
  Toolbar,
  SaveButton,
  useDataProvider,
  useRedirect,
  useGetIdentity,
} from "react-admin";
import { makeStyles } from "@material-ui/styles";
import Swal from "sweetalert2";
import apiUrl from "../../config"; // Assurez-vous d'importer correctement l'URL de votre API
import { useParams } from "react-router-dom"; // Importer useParams pour extraire les paramètres d'URL

const useStyles = makeStyles(() => ({
  autocomplete: {
    width: "650px",
  },
  chip: {
    fontWeight: "bold",
  },
}));

export const AvanceEdit = (props) => {
  const UserEditToolbar = (props) => (
    <Toolbar {...props}>
      <SaveButton id="save" />
    </Toolbar>
  );

  const dataProvider = useDataProvider();
  const [avanceRestitution, setAvanceRestitution] = useState(null);
  const [factures, setFactures] = useState([]);
  const classes = useStyles();
  const { identity, isLoading: identityLoading } = useGetIdentity();
  const redirect = useRedirect();
  const { id } = useParams(); // Utiliser useParams pour extraire l'ID de l'URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Vérifier si l'ID est défini (par sécurité)
        if (!id) {
          throw new Error("ID non défini");
        }

        // Remplacez par votre endpoint réel ou dynamique avec l'ID extrait de l'URL
        const response = await fetch(`${apiUrl}/Avance/${id}`);
        const data = await response.json();
        setAvanceRestitution(data.data.avanceRestitution);
        console.log(data.data.avanceRestitution)
        setFactures(data.data.factures);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Gérer les erreurs ici (affichage de messages d'erreur, etc.)
      }
    };

    fetchData();
  }, [dataProvider, id]);

  if (identityLoading || !avanceRestitution) return <>Loading...</>; // Affichez un indicateur de chargement jusqu'à ce que les données soient chargées




  return (
    <Edit {...props}>
      <SimpleForm toolbar={<UserEditToolbar />}>
        <TextInput
          defaultValue={identity.fullName}
          label="Vous êtes"
          className={classes.autocomplete}
          disabled
          source="Redacteur"
        />
        <AutocompleteInput
          label="Factures"
          source="idfacture"
          className={classes.autocomplete}
          choices={factures.map((facture) => ({
            id: facture.idfacture,
            name: `${facture.numeroFacture} | ${facture.TTC} DH | ${facture.DateFacture}   ${facture.idfacture}`,
          }))}
 validate={required("mentionnez la facture")}
        />
        <TextInput
          label="Montant  restant NON restituer"
          className={classes.autocomplete}
          source="Montant"
          // defaultValue={avanceRestitution.MontantAvanceTTC || ""}
          defaultValue={avanceRestitution.Montant || ""}
          disabled={true}
        />
        <TextInput
          label="Code Affaire"
          className={classes.autocomplete}
          source="CodeAffaire"
          // defaultValue={avanceRestitution.CodeAffaire || ""}
          disabled={true}
        />
        <TextInput
          label="Montant Restant A Restituer"
          // className={classes.autocomplete}
          source="MontantRestantARestituer"
        // defaultValue={avanceRestitution.Montant || ""}
        // disabled={true}        
        />
<TextInput
          label="etatRestit"
          // className={classes.autocomplete}
          source="Etat"
        defaultValue={avanceRestitution.Etat || ""}

        disabled={true}        
        />


<TextInput
          label="Fourisseur"
          // className={classes.autocomplete}
          source="nom"
        defaultValue={avanceRestitution.nom || ""}
        disabled={true}        
        />
<TextInput
          label="ModePaiement"
          // className={classes.autocomplete}
          source="ModePaiement"
        defaultValue={avanceRestitution.ModePaiement || ""}
        disabled={true}        
        />
      </SimpleForm>
    </Edit>
  );
};
