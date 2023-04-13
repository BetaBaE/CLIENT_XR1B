import { useEffect, useState } from "react";
import {
  AutocompleteArrayInput,
  AutocompleteInput,
  Create,
  DateInput,
  regex,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
} from "react-admin";

import { makeStyles } from "@material-ui/styles";
import { Chip } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  autocomplete: {
    width: "650px",
  },
  chip: {
    fontWeight: "bold",
  },
}));
export const ChequeAvanceCreate = () => {
 
  const [orderVirement, setOrderVirement] = useState([
    {
      id: "null",
      ribAtner: 0,
      datecreation: "",
      etat: "",
    },
  ]);
  const [fournisseur, setFournisseur] = useState([
    {
      CodeFournisseur: "",
      nom: "",
      id: 0,
      FournisseurId: 0,
      rib: "",
      validation: "",
    },
  ]);
  const [ribFournisseur, setRibFournisseur] = useState([
    {
      CodeFournisseur: "",
      nom: "",
      id: 0,
      FournisseurId: 0,
      rib: "",
      validation: "",
    },
  ]);
  const [facture, setFacture] = useState([
    {
      id: "",
      DATEDOC: "1960-01-01T00:00:00.000Z",
      nom: "",
      NETAPAYER: 0.0,
      MontantFacture: 0.0,
    },
  ]);


  const [sum, setSum] = useState("0.000");

  const [orderVirementField, setOrderVirementField] = useState(true);
  const [fournisseurIdField, setFournisseurIdField] = useState(true);


  const [onchangefournisseur, setOnchangefournisseur] = useState([]);

  const validatecheque = regex(
    /^[a-zA-Z]+ [0-9]{8}$/,
    "ce  numero de cheque est invalid "
    );
  useEffect(() => {
    fetch("http://10.111.1.95:8080/ribatner")
      .then((response) => response.json())
      .then((json) => setOrderVirement(json));
  }, []);

  // const ribf = useRef([0]);

  useEffect(() => {
    // console.log("after use effect", fournisseur);
    if (onchangefournisseur > 0) {
      setRibFournisseur(
        fournisseur.filter((fournisseur) => {
          return fournisseur.FournisseurId === onchangefournisseur;
        })
      );
      let filterRib = fournisseur.filter((fournisseur) => {
        return fournisseur.FournisseurId === onchangefournisseur;
      });
      setRibFournisseur(filterRib);

      // let filterFactureByFournisseur = facture.filter((facture) => {
      //   return facture.nom === ribFournisseur[0].nom;
      // });
      // setFactureFilter(filterFactureByFournisseur);
    }
  }, [onchangefournisseur, fournisseur]);

  const getFactureByFourniseurId = (id) => {
    let url = "http://10.111.1.95:8080/getficheNavettebyfournisseur/" + id;
    // console.log(url);
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        // console.log(json);
        setFacture(json);
      });
    // console.log(facture);
  };

  const getFournisseurFilteredByOv = () => {
    fetch(
      `http://10.111.1.95:8080/ribfournisseurs/`
    )
      .then((response) => response.json())
      .then((json) => setFournisseur(json));
  };

  let orderVirement_choices = orderVirement.map(({ id,nom }) => ({
    id: id,
    name: nom,
  }));
  let fournisseurs_choices = fournisseur.map(
    ({ FournisseurId,fournisseur}) => ({
      id: FournisseurId,
      name: `${fournisseur} `,
    })
  );


  let facture_choices = facture.map(
    ({
        id,
        chantier,
        nom,
        ficheNavette,
        montantAvance,
    }) => ({
        id: id,
        name: `${chantier} | FN ${ficheNavette} | id ${
            id
  } | ${nom} |${montantAvance}`,
    })
);

  const classes = useStyles();
  return (
    <Create>
      <SimpleForm>
      <SelectInput
          validate={required("Ce champ est obligatoire")}
          className={classes.autocomplete}
          source="orderVirementId"
          label ="banque"
          onChange={(e) => {
            // console.log(e.target.value);
            if (e.target.value === "") {
              setOrderVirementField(true);
            } else {
              setOrderVirementField(false);
              getFournisseurFilteredByOv(e.target.value);
            }
          }}
          choices={orderVirement_choices}
        />
        <AutocompleteInput
          validate={required("Ce champ est obligatoire")}
          disabled={orderVirementField}
          className={classes.autocomplete}
          source="fournisseurId"
          choices={fournisseurs_choices}
          onChange={(e) => {
            setOnchangefournisseur(e);
            getFactureByFourniseurId(e);
            // console.log(e);
            if (!e) {
              setFournisseurIdField(true);
            } else {
              setFournisseurIdField(false);
            }
          }}
        />
     <DateInput source="datecheque" label="datecheque"  className={classes.autocomplete}></DateInput> 

     <DateInput source="dateecheance" label="dateecheance"  className={classes.autocomplete}></DateInput> 
     
     <TextInput source="numerocheque" label="numerocheque" 
     
     validate={[required("Ce champ est obligatoire")]}
     
     className={classes.autocomplete}>
      
      </TextInput> 
        <AutocompleteArrayInput
          validate={required("Ce champ est obligatoire")}
          disabled={fournisseurIdField}
          className={classes.autocomplete}
          source="facturelist"
          choices={facture_choices}
          onChange={(e) => {
            let sum = 0;
            e.forEach((fa) => {
              sum +=
                facture.find((facture) => facture.id === fa).montantAvance !=
                null
                  ? facture.find((facture) => facture.id === fa).montantAvance
                  : facture.find((facture) => facture.id === fa).montantAvance;
            });
            // console.log(sum.toFixed(3));
            setSum(sum.toFixed(3));
          }}
        />
        <Chip className={classes.chip} label={`Total : ${sum}`} />
      </SimpleForm>
    </Create>
  );
};
