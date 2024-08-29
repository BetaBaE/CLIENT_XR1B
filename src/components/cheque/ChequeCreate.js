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
  useRedirect,
} from "react-admin";
import { makeStyles } from "@material-ui/styles";
import { Chip } from "@material-ui/core";
import Swal from "sweetalert2";
import apiUrl from "../../config";

// Définir les styles personnalisés
const useStyles = makeStyles(() => ({
  autocomplete: {
    width: "650px",
  },
  chip: {
    fontWeight: "bold",
  },
}));

// Composant ChequeCreate pour créer un nouveau chèque
export const ChequeCreate = (props) => {
  const redirect = useRedirect();
  const { identity, isLoading: identityLoading, error } = useGetIdentity();
  const dataProvider = useDataProvider();

  // États pour gérer les données du formulaire
  const [orderVirement, setOrderVirement] = useState([]);
  const [fournisseur, setFournisseur] = useState([]);
  const [facture, setFacture] = useState([]);
  const [sum, setSum] = useState("0.000");
  const [sumfacturewithfn, setSumfacturewithfn] = useState([]);
  const [sumfacturewithoutfn, setSumfacturewithoutfn] = useState([]);
  const [sumavance, setSumavance] = useState([]);
  const [fournisseurIdField, setFournisseurIdField] = useState(true);
  const [selectedSupplierFactureCategory, setSelectedSupplierFactureCategory] =
    useState("");
  const [
    selectedSupplierFournisseurCategory,
    setSelectedSupplierFournisseurCategory,
  ] = useState("");

  // Désactiver l'autocomplétion du champ "numerocheque" après le chargement du DOM
  useEffect(() => {
    const inputnumerocheque = document.getElementById("numerocheque");
    if (inputnumerocheque) {
      inputnumerocheque.autocomplete = "off";
    }
  }, []);

  // Gestion du changement de sélection des factures
  const handleChange = (e) => {
    let sum = 0;
    e.forEach((fa) => {
      const selectedFacture = facture_choices.find((f) => f.id === fa);
      if (selectedFacture) {
        setSelectedSupplierFactureCategory(selectedFacture.categorie);

        // Condition pour les alertes basées sur la catégorie du fournisseur
        if (
          selectedFacture.categorie !== "FET" &&
          selectedFacture.categorie !== "Service" &&
          selectedSupplierFournisseurCategory === "personne physique"
        ) {
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
                confirmButtonText: "OK",
              });
              redirect("list", "cheque");
            }
          });
        }

        // Extraire le MontantAPaye de la chaîne de nom
        const montantMatch = selectedFacture.name.match(
          /MontantAPaye -?(\d+(\.\d+)?)/
        );
        if (montantMatch[0].split(" ")[1]) {
          const montantAPaye = parseFloat(montantMatch[0].split(" ")[1]);
          if (!isNaN(montantAPaye)) {
            sum += montantAPaye;
          }
        }
      }
    });
    setSum(sum.toFixed(3));
  };

  // Fetch les données pour les RIB Atner
  useEffect(() => {
    fetch(`${apiUrl}/ribatner`)
      .then((response) => response.json())
      .then((json) => setOrderVirement(json));
  }, []);

  // Fetch la somme des factures avec FN par Fournisseur ID
  const getsumfacturewithfnByFourniseurId = (id) => {
    fetch(`${apiUrl}/getsumfacturebyfournisseurwithfn/${id}`)
      .then((response) => response.json())
      .then((json) => setSumfacturewithfn(json))
      .catch((error) => {
        console.error("Error fetching sumfacture:", error);
      });
  };

  // Fetch la somme des factures sans FN par Fournisseur ID
  const getsumfacturewithoutByFourniseurId = (id) => {
    fetch(`${apiUrl}/getsumfacturebyfournisseurwithoutfn/${id}`)
      .then((response) => response.json())
      .then((json) => setSumfacturewithoutfn(json))
      .catch((error) => {
        console.error("Error fetching sumfacture:", error);
      });
  };

  // Fetch la somme des avances par Fournisseur ID
  const getsumavanceByFourniseurId = (id) => {
    fetch(`${apiUrl}/getsumavancebyfournisseur/${id}`)
      .then((response) => response.json())
      .then((json) => setSumavance(json))
      .catch((error) => {
        console.error("Error fetching sumavance:", error);
      });
  };

  // Fetch tous les fournisseurs propres
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

  // Fetch les factures par Fournisseur ID
  const getFactureByFourniseur = (id) => {
    fetch(`${apiUrl}/getfacturebyfournisseurid/${id}`)
      .then((response) => response.json())
      .then((json) => setFacture(json));
  };

  // Préparation des choix pour les champs d'autocomplétion
  const fournisseurs_choices = fournisseur.map(
    ({ id, nom, CodeFournisseur, catFournisseur }) => ({
      id: id,
      name: `${nom} ${CodeFournisseur} ,${catFournisseur}`,
      categorie: catFournisseur,
    })
  );
  let facture_choices = facture.map(
    ({
      id,
      chantier,
      nom,
      ficheNavette,
      DateFacture,
      CODEDOCUTIL,
      TTC,
      MontantAPaye,
      CatFn,
      validation,
    }) => ({
      id: id,
      name: `${CODEDOCUTIL} | ${chantier} | FN ${ficheNavette} | ${
        DateFacture === null ? "avance" : DateFacture?.split("T")[0]
      } | ${nom} | MontantAPaye ${MontantAPaye} DH | TTC ${TTC}DH | ${validation}`,

      categorie: CatFn,
    })
  );

  const orderVirement_choices = orderVirement.map(({ id, nom }) => ({
    id: id,
    name: nom,
  }));

  const classes = useStyles();

  if (identityLoading) return <>Loading</>;
  if (error) return <>Error</>;

  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput
          defaultValue={identity.fullName}
          label="vous êtes"
          hidden={false}
          className={classes.autocomplete}
          disabled={true}
          source="Redacteur"
        />
        <SelectInput
          validate={required("Ce champ est obligatoire")}
          className={classes.autocomplete}
          source="RibAtner"
          label="banque"
          choices={orderVirement_choices}
        />
        <DateInput
          source="datecheque"
          validate={required("Ce champ est obligatoire")}
          label="datecheque"
          className={classes.autocomplete}
        />
        <DateInput
          source="dateecheance"
          label="dateecheance"
          className={classes.autocomplete}
        />
        <TextInput
          source="numerocheque"
          label="numerocheque"
          validate={[required("Ce champ est obligatoire")]}
          className={classes.autocomplete}
        />
        <AutocompleteInput
          label="Fournisseur"
          validate={required("Le fournisseur est obligatoire")}
          className={classes.autocomplete}
          source="fournisseurId"
          choices={fournisseurs_choices}
          onChange={(e) => {
            if (!e) {
              setFournisseurIdField(true);
              setSelectedSupplierFournisseurCategory("");
            } else {
              const selectedFournisseur = fournisseurs_choices.find(
                (f) => f.id === e
              );
              setFournisseurIdField(false);
              getFactureByFourniseur(e);
              getsumfacturewithfnByFourniseurId(e);
              getsumfacturewithoutByFourniseurId(e);
              getsumavanceByFourniseurId(e);
              setSelectedSupplierFournisseurCategory(
                selectedFournisseur?.categorie || ""
              );
              console.log(
                "selectedFournisseur.catFournisseur",
                selectedFournisseur
              );
            }
          }}
        />
        {sumfacturewithfn.length > 0 && (
          <div>
            La somme des montants des factures qui ont FN par fournisseur est de
            : {sumfacturewithfn[0].sum} DH
          </div>
        )}
        {sumfacturewithoutfn.length > 0 && (
          <div>
            la somme des montants factures qui n'ont pas FN par fournisseur
            value : {sumfacturewithoutfn[0].sum} DH
          </div>
        )}
        {sumavance.length > 0 && (
          <div>
            la somme des montants des avances par fournisseur value :{" "}
            {sumavance[0].sum} DH
          </div>
        )}
        <AutocompleteArrayInput
          validate={[required("Ce champ est obligatoire")]}
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
