import { useEffect, useState } from "react";
import {
  AutocompleteArrayInput,
  AutocompleteInput,
  Create,

  required,

  SimpleForm,

  TextInput,
  useRedirect,
  useDataProvider,
  useGetIdentity,
} from "react-admin";
import { makeStyles } from "@material-ui/styles";

import { Chip } from "@material-ui/core";
import apiUrl from "../../config";
import Swal from "sweetalert2";
const useStyles = makeStyles(() => ({
  autocomplete: {
    width: "650px",
  },
  chip: {
    fontWeight: "bold",
  },
}));
export const EspeceCreate = (props) => {
  const redirect = useRedirect();
  const { identity, isLoading: identityLoading } = useGetIdentity();
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
  const [sumavance, setSumavance] = useState([]);
  const [selectedSupplierFournisseurCategory, setSelectedSupplierFournisseurCategory] = useState("");

  const [selectedSupplierFactureCategory, setSelectedSupplierFactureCategory] = useState("");
  const sumAvanceValue = sumavance.length > 0 ? sumavance[0].sum : "";
  const sumfactureValue = sumfacturewithfn.length > 0 ? sumfacturewithfn[0].sum : "";
  const sumfacturenotfnValue = sumfacturewithoutfn.length > 0 ? sumfacturewithoutfn[0].sum : "";

    useEffect(() => {
        dataProvider
            .getList("getAllFournissuersClean", {
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
        let url = `${apiUrl}/getfacturebyfournisseurid/` + id;
        fetch(url)
            .then((response) => response.json())
            .then((json) => setFacture(json));
    };


    let fournisseurs_choices = fournisseur.map(
      ({ id, nom, CodeFournisseur, catFournisseur }) => ({
        id: id,
        name: `${nom} ${CodeFournisseur} ,${catFournisseur}`,
        categorie: catFournisseur,
      })
    );
    let facture_choices = facture.map(({id, chantier, nom, ficheNavette, DateFacture, CODEDOCUTIL, TTC, MontantAPaye, CatFn }) => ({
      id: id,
      name: `${CODEDOCUTIL} | ${chantier} | FN ${ficheNavette} | ${DateFacture === null ? 'avance' : DateFacture?.split("T")[0]} | ${nom} | MontantAPaye ${MontantAPaye} DH | TTC ${TTC}DH`,
  
      categorie: CatFn
    }));
    
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
    

      const handleChange = (e) => {
        let sum = 0;
        e.forEach((fa) => {
          const selectedFacture = facture_choices.find((f) => f.id === fa);
          if (selectedFacture) {
            setSelectedSupplierFactureCategory(selectedFacture.categorie); // Set selected supplier category
    
            // Adjusted condition based on provided logic
            if (selectedFacture.categorie !== 'FET'  && selectedFacture.categorie !== 'Service' && selectedSupplierFournisseurCategory === "personne physique") {
             
              Swal.fire({
                title: "Alerte",
                text: "Le fournisseur sélectionné est une personne physique sans catégorie définie.",
                icon: "warning",
                allowOutsideClick: false,
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Confirmer",
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire({
                    title: "Le virement a été annulé",
                    icon: "info",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "OK"
                  });
                  redirect("list", "espece");
                }
              });
            }
    
            // Extract MontantAPaye from the name string
            const montantMatch = selectedFacture.name.match(/MontantAPaye (\d+(\.\d+)?)/);
            if (montantMatch) {
              const montantAPaye = parseFloat(montantMatch[1]);
              if (!isNaN(montantAPaye)) {
                sum += montantAPaye;
              }
            }
          }
        });
        setSum(sum.toFixed(3));
      };
    

  const classes = useStyles();
  const { isLoading, error } = useGetIdentity();
  if (isLoading) return <>Loading</>;
  if (error) return <>Error</>
  return (
    <Create>
      <SimpleForm>
        <TextInput
          defaultValue={identity?.fullName}
          label="vous êtes"
          hidden={false}
          className={classes.autocomplete}
          disabled={true}
          source="redacteur"
        ></TextInput>
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
                setSelectedSupplierFournisseurCategory(""); // Clear selected supplier category
              } else {
                const selectedFournisseur = fournisseurs_choices.find((f) => f.id === e);
                setFournisseurIdField(false);
                getFactureByFourniseur(e);
                getsumfacturewithfnByFourniseurId(e);
                getsumfacturewithoutByFourniseurId(e);
                getsumavanceByFourniseurId(e)
                setSelectedSupplierFournisseurCategory(selectedFournisseur?.categorie || "");
                console.log("selectedFournisseur.catFournisseur", selectedFournisseur);
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
          onChange={handleChange}
        />
        <Chip className={classes.chip} label={`Total : ${sum}`} />


      </SimpleForm>
    </Create>
  );
};