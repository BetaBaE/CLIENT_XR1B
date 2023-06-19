import { useEffect, useState } from "react";
import {
    AutocompleteInput,
    Create,
    NumberInput,
    required,
    SelectInput,
    SimpleForm,
    TextInput,
    useDataProvider,
} from "react-admin";
import { makeStyles } from "@material-ui/styles";
import apiUrl from "../../config";


const useStyles = makeStyles(() => ({
    autocomplete: {
        width: "650px",
    },
    chip: {
        fontWeight: "bold",
    },
}));
export const FactureRechereCreate = (props) => {

    const dataProvider1 = useDataProvider();
    const [fournisseur, setFournisseur] = useState([]);
    const [facture, setFacture] = useState([{ id: "", BonCommande: "" }]);
    const dataProvider = useDataProvider();
    let facture_choices = [];
    if (facture && facture.length > 0) {
        facture_choices = facture.map(({ id, numeroFacture, TTC, DateFacture }) => ({
            id: id,
            name: `${numeroFacture} | ${TTC} DH | ${formatDate(DateFacture)}`,
        }));
    }
    const [fournisseurIdField, setFournisseurIdField] = useState(true);
   

    const [factureidField, setfactureidField] = useState(true);
   
    const [chantierIdField, setChantierIdField] = useState(false);
   


    const [chantier, setChantier] = useState([]);
    // const [onchangefacture, setOnchangefacture] = useState([]);
    // const [BCommande, setBcommande] = useState([{ id: '', BonCommande: '' }]);
    function formatDate(string) {
        var options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(string).toLocaleDateString([], options);
    }
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
        let url = `${apiUrl}/facturebyfournisseur/` + id;
        fetch(url)
            .then((response) => response.json())
            .then((json) => setFacture(json));
    };
    const getChantier = () => {
        let url = `${apiUrl}/Chantier?range=[0,1000]`; 
        fetch(url)
          .then((response) => response.json())
          .then((json) => setChantier(json));
      };
      
      const getChantierByFactureId = (id) => {
        let url = `${apiUrl}/getchantierbyfactureid/` + id;
        fetch(url)
          .then((response) => response.json())
          .then((json) => {
            if (json && json.length > 0) {
              setChantier(json);
            } else {
              getChantier();
              setChantier([]);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      };

    let fournisseurs_choices = fournisseur.map(({ id, nom, CodeFournisseur }) => ({
        id: id,
        name: `${nom} | ${CodeFournisseur} `,
    }));
    facture_choices = facture.map(({ id, numeroFacture, TTC, DateFacture }) => ({
        id: id,
        name: `${numeroFacture} | ${TTC} DH | ${formatDate(DateFacture)}`,
      }));
     
    

      
  
    let chantier_choices = chantier.map(({ id, LIBELLE, CODEAFFAIRE }) => ({
        id: id,
        name: `${LIBELLE} | ${CODEAFFAIRE} `,
    }));

    const classes = useStyles();
    return (
        <Create>
            <SimpleForm>
            <AutocompleteInput
  label="Fournisseur"
  validate={required("Le fournisseur est obligatoire")}
  className={classes.autocomplete}
  source="idfournisseur"
  choices={fournisseurs_choices}
  onChange={(e) => {
    if (!e) {
      setFournisseurIdField(true);
      setChantierIdField(false);
    } else {
      setFournisseurIdField(false);
      setChantierIdField(true);
      getFactureByFourniseur(e);
      getChantier()
    }
  }}
/>

<SelectInput
  disabled={fournisseurIdField}
  className={classes.autocomplete}
  source="idFacture"
  choices={facture_choices}
  label="Facture"
  emptyValue={true}
  onChange={(e) => {
    if (!e) {
      setfactureidField(true);
 
      setChantierIdField(false);
    } else {
      setfactureidField(false);
      setChantierIdField(true);
      getChantierByFactureId(e.target.value);
    }
  }}
/>

{!factureidField ? (
  <AutocompleteInput
   
    label="Chantier"
    validate={required("Le chantier est obligatoire")}
    className={classes.autocomplete}
    source="codechantier"
    choices={chantier_choices.map(({ id, name }) => ({
        id: id,
        name: name,
      }))}
  />
) : (
  <AutocompleteInput
  validate={required("Le chantier est obligatoire")}
    label="Chantier"
    className={classes.autocomplete}
    source="codechantier"
    choices={chantier_choices.map(({ id, name }) => ({
      id: id,
      name: name,
    }))}
  />
)}



                <TextInput
                    label="montant d'avance"
                    value='0'
                    className={classes.autocomplete}
                    source="montantAvance" />


                <TextInput label="Fiche navette"
                    validate={required("La confirmation est obligatoire")}
                    className={classes.autocomplete}
                    source="ficheNavette" />


                <TextInput label="Bon de commande d'avance"
           
                    className={classes.autocomplete}
                    source="Bcommande" />




            </SimpleForm>
        </Create>
    );
};