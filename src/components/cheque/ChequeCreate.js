import { useEffect, useState } from "react";
import {
  AutocompleteArrayInput,
    AutocompleteInput,
    Create,
    DateInput,
    required,
    SelectInput,
    SimpleForm,
    TextInput,
    useDataProvider,
    useGetIdentity,
} from "react-admin";
import { makeStyles } from "@material-ui/styles";

import { Chip } from "@material-ui/core";
import apiUrl from "../../config";
const useStyles = makeStyles(() => ({
    autocomplete: {
        width: "650px",
    },
    chip: {
        fontWeight: "bold",
    },
}));
export const ChequeCreate = (props) => {
  const { identity, isLoading: identityLoading } = useGetIdentity();
  const [orderVirement, setOrderVirement] = useState([
    {
      id: "null",
      ribAtner: 0,
      datecreation: "",
      etat: "",
    },
  ]);
    const [fournisseur, setFournisseur] = useState([]);
    const [facture, setFacture] = useState([{ id: "", BonCommande: "" }]);
    const dataProvider = useDataProvider();

    const [fournisseurIdField, setFournisseurIdField] = useState(true);

    function formatDate(string) {
        var options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(string).toLocaleDateString([], options);
    }
   
  const [sum, setSum] = useState("0.000");

  const [sumfacturewithfn, setSumfacturewithfn] = useState([]);
  const [sumfacturewithoutfn, setSumfacturewithoutfn] = useState([]);
  
  const sumfactureValue = sumfacturewithfn.length > 0 ? sumfacturewithfn[0].sum : "";
  const [sumavance, setSumavance] = useState([]);
  
  const sumfacturenotfnValue = sumfacturewithoutfn.length > 0 ? sumfacturewithoutfn[0].sum : "";

  const sumAvanceValue = sumavance.length > 0 ? sumavance[0].sum : "";
  useEffect(() => {
    // Désactiver l'autocomplétion après le chargement du DOM
    const inputnumerocheque = document.getElementById("numerocheque");
   
    if (inputnumerocheque  ) {
      inputnumerocheque.autocomplete = "off";
    
    }
  }, []);



  useEffect(() => {
    fetch(`${apiUrl}/ribatner`)
      .then((response) => response.json())
      .then((json) => setOrderVirement(json));
  }, []);

  const getsumfacturewithfnByFourniseurId = (id) => {
    let url = `${apiUrl}/getsumfacturebyfournisseurwithfn/` + id;
    console.log(url);
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setSumfacturewithfn(json)
      })
      .catch((error) => {
        console.error("Error fetching sumfacture:", error);
      });
  };

  const getsumfacturewithoutByFourniseurId = (id) => {
    let url = `${apiUrl}/getsumfacturebyfournisseurwithoutfn/` + id;
    
    console.log(url);
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setSumfacturewithoutfn(json);
      })
      .catch((error) => {
        console.error("Error fetching sumfacture:", error);
      });
  };

  const getsumavanceByFourniseurId = (id) => {
    let url = `${apiUrl}/getsumavancebyfournisseur/` + id;
    console.log(url);
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setSumavance(json)
      })
      .catch((error) => {
        console.error("Error fetching sumavance:", error);
      });
  };

    useEffect(() => {
        dataProvider
            .getList("fournisseurs", {
                pagination: { page: 1, perPage: 3000 },
                sort: { field: "nom", order: "ASC" },
            })
            .then(({ data }) => {
                setFournisseur(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [dataProvider]);
    const getFactureByFourniseur = (id) => {
      let url = `${apiUrl}/getfacturebyfournisseurid/${id}`;
       
      fetch(url)
            .then((response) => response.json())
            .then((json) => setFacture(json));
    };
    let facture_choices = { id: "", BonCommande: "" };
    let fournisseurs_choices = fournisseur.map(({ id, nom, CodeFournisseur }) => ({
        id: id,
        name: `${nom} | ${CodeFournisseur} `,
    }));
    facture_choices = facture.map(({  id,
      chantier,
      nom,
      ficheNavette,
      DateFacture,
      CODEDOCUTIL,
      TTC,
      MontantFacture, }) => ({
      id: id,
      name: `${CODEDOCUTIL} | ${chantier} | FN ${ficheNavette} | ${
        DateFacture === null ? 'avance' : DateFacture?.split("T")[0]

        } | ${nom} |${MontantFacture != null ? MontantFacture : TTC}`,
  }));
    
    let orderVirement_choices = orderVirement.map(({ id,nom }) => ({
      id: id,
      name: nom,
    }));
    
    const classes = useStyles();
    const { isLoading, error } = useGetIdentity();
    if (isLoading) return <>Loading</>;
    if (error) return <>Error</>
    return (
        <Create>
            <SimpleForm>
            <TextInput
          defaultValue={identity.fullName}
          label="vous êtes"
          hidden={false}
          className={classes.autocomplete}
          disabled={true}
          source="Redacteur"
        >

        </TextInput>
         
         
            <SelectInput
          validate={required("Ce champ est obligatoire")}
          className={classes.autocomplete}
          source="RibAtner"
          label ="banque"
         
          choices={orderVirement_choices}
        />
              
    <DateInput source="datecheque" label="datecheque"  className={classes.autocomplete}></DateInput> 

     <DateInput source="dateecheance" label="dateecheance"  className={classes.autocomplete}></DateInput> 
     
     <TextInput source="numerocheque" label="numerocheque" 
     
     validate={[required("Ce champ est obligatoire")]}
     
     className={classes.autocomplete}>
      
      </TextInput> 
              
                <AutocompleteInput label="Fournisseur"
                    validate={required("Le fournisseur est obligatoire")}
                    className={classes.autocomplete}
                    source="fournisseurId"
                    choices={fournisseurs_choices}
                    onChange={
                        (e) => {
                            // setOnchangefournisseur(e);
                            if (!e) {
                                setFournisseurIdField(true);
                            } else {
                                setFournisseurIdField(false);
                                getFactureByFourniseur(e);
                                getsumfacturewithfnByFourniseurId(e);
                                getsumfacturewithoutByFourniseurId(e);
                                getsumavanceByFourniseurId(e)
                            }
                        }
                    }
                />

                                {sumfactureValue ? <div>La somme des montants des factures qui ont FN par fournisseur est de : {sumfactureValue} DH</div> : ''}
     <br></br>
     {sumfacturenotfnValue ? <div>la somme des montants factures qui n'ont pas FN par fournisseur value : {sumfacturenotfnValue} DH</div> : ''}
     <br></br>
     {sumAvanceValue ? <div>la somme des montants des avances par fournisseur value : {sumAvanceValue} DH</div> : ''}



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
                facture.find((facture) => facture.id === fa).MontantFacture !=
                null
                  ? facture.find((facture) => facture.id === fa).MontantFacture
                  : facture.find((facture) => facture.id === fa).TTC;
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