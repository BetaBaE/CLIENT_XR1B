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
export const ChequeCreate = (props) => {
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
   
  useEffect(() => {
    fetch("http://localhost:8080/ribatner")
      .then((response) => response.json())
      .then((json) => setOrderVirement(json));
  }, []);


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
        let url = "http://10.111.1.95:8080/getfacturebyfournisseurid/" + id;
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
            DateFacture?.split("T")[0]
          } | ${nom} |${MontantFacture != null ? MontantFacture : TTC}`,
    }));
    
    let orderVirement_choices = orderVirement.map(({ id,nom }) => ({
      id: id,
      name: nom,
    }));
    
    const classes = useStyles();
    return (
        <Create>
            <SimpleForm>
            <SelectInput
          validate={required("Ce champ est obligatoire")}
          className={classes.autocomplete}
          source="orderVirementId"
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
                            }
                        }
                    }
                />
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