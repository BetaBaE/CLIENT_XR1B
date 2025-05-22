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

import { Chip } from "@mui/material";
import apiUrl from "../../config";
import Swal from "sweetalert2";
import { useTheme } from "@mui/material/styles";
export const EspeceCreate = (props) => {
  const theme = useTheme();
  const redirect = useRedirect();
  const { identity, isLoading: identityLoading } = useGetIdentity();
  const [fournisseur, setFournisseur] = useState([]);
  const [facture, setFacture] = useState([{ id: "", BonCommande: "" }]);
  const dataProvider = useDataProvider();
  const [fournisseurIdField, setFournisseurIdField] = useState(true);
  const [sum, setSum] = useState("0.000");
  const [sumfacturewithfn, setSumfacturewithfn] = useState([]);
  const [sumfacturewithoutfn, setSumfacturewithoutfn] = useState([]);
  const [sumavance, setSumavance] = useState([]);
  const [
    selectedSupplierFournisseurCategory,
    setSelectedSupplierFournisseurCategory,
  ] = useState("");
  const [selectedSupplierFactureCategory, setSelectedSupplierFactureCategory] =
    useState("");

  // Extraire les sommes pour un accès facile
  const sumAvanceValue = sumavance.length > 0 ? sumavance[0].sum : "";
  const sumfactureValuefn =
    sumfacturewithfn.length > 0 ? sumfacturewithfn[0].sum : "";
  const sumfacturenotfnValue =
    sumfacturewithoutfn.length > 0 ? sumfacturewithoutfn[0].sum : "";

  // Récupérer les fournisseurs au montage du composant
  useEffect(() => {
    dataProvider
      .getList("getAllFournissuersClean", {
        pagination: { page: 1, perPage: 3000 },
        sort: { field: "nom", order: "ASC" },
      })
      .then(({ data }) => setFournisseur(data))
      .catch((error) => console.log(error));
  }, [dataProvider]);

  // Récupérer les factures par ID de fournisseur
  const getFactureByFourniseur = (id) => {
    fetch(`${apiUrl}/getfacturebyfournisseurid/${id}`)
      .then((response) => response.json())
      .then((json) => setFacture(json))
      .catch((error) => console.log(error));
  };

  // Transformer les fournisseurs pour le dropdown
  const fournisseurs_choices = fournisseur.map(
    ({ id, nom, CodeFournisseur, catFournisseur }) => ({
      id,
      name: `${nom} ${CodeFournisseur} ,${catFournisseur}`,
      categorie: catFournisseur,
    })
  );

  // Transformer les factures pour le dropdown
  let facture_choices = facture
    .filter((facture) => facture.TTC <= 5000)
    .map(
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

  // Récupérer les sommes des factures
  const getsumfacturewithfnByFourniseurId = (id) => {
    fetch(`${apiUrl}/getsumfacturebyfournisseurwithfn/${id}`)
      .then((response) => response.json())
      .then((json) => setSumfacturewithfn(json))
      .catch((error) =>
        console.error(
          "Erreur lors de la récupération de la somme des factures :",
          error
        )
      );
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
    fetch(`${apiUrl}/getsumavancebyfournisseur/${id}`)
      .then((response) => response.json())
      .then((json) => setSumavance(json))
      .catch((error) =>
        console.error(
          "Erreur lors de la récupération de la somme des avances :",
          error
        )
      );
  };

  // Gérer la sélection des factures et le calcul des sommes
  const handleChange = (e) => {
    let sum = 0;
    e.forEach((fa) => {
      const selectedFacture = facture_choices.find((f) => f.id === fa);
      if (selectedFacture) {
        setSelectedSupplierFactureCategory(selectedFacture.categorie);

        // Vérification de la catégorie du fournisseur
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
              redirect("list", "espece");
            }
          });
        }

        const montantMatch = selectedFacture.name.match(
          /MontantAPaye -?(\d+(\.\d+)?)/
        );
        if (montantMatch) {
          const montantAPaye = parseFloat(montantMatch[0].split(" ")[1]);
          if (!isNaN(montantAPaye)) {
            sum += montantAPaye;
          }
        }
      }
    });
    setSum(sum.toFixed(3));
  };

  const { isLoading, error } = useGetIdentity();
  if (isLoading) return <>Chargement...</>;
  if (error) return <>Erreur</>;

  return (
    <Create>
      <SimpleForm>
        <TextInput
          defaultValue={identity?.fullName}
          label="Vous êtes"
          sx={{
            width: 650,
            input: {
              backgroundColor:
                theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
              color: theme.palette.mode === "dark" ? "#fff" : "inherit",
              borderRadius: "4px",
            },
          }}
          disabled={true}
          source="redacteur"
        />
        <AutocompleteInput
          label="Fournisseur"
          validate={required("Le fournisseur est obligatoire")}
          sx={{
            width: 650,
            input: {
              backgroundColor:
                theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
              color: theme.palette.mode === "dark" ? "#fff" : "inherit",
              borderRadius: "4px",
            },
          }}
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
              getsumfacturewithoutByFourniseurId(e);
              getsumfacturewithfnByFourniseurId(e);

              // getsumavanceByFourniseurId(e);
              // setSelectedSupplierFournisseurCategory(
              //   selectedFournisseur?.categorie || ""
              // );
            }
          }}
        />
        {sumfactureValuefn && (
          <div>
            La somme des montants des factures avec FN est de :{" "}
            {sumfactureValuefn} DH
          </div>
        )}
        {sumfacturenotfnValue && (
          <div>
            La somme des montants des factures sans FN est de :{" "}
            {sumfacturenotfnValue} DH
          </div>
        )}
        {sumAvanceValue && (
          <div>
            La somme des montants des avances est de : {sumAvanceValue} DH
          </div>
        )}

        <AutocompleteArrayInput
          validate={required("Ce champ est obligatoire")}
          disabled={fournisseurIdField}
          sx={{
            width: 650,
            input: {
              backgroundColor:
                theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
              color: theme.palette.mode === "dark" ? "#fff" : "inherit",
              borderRadius: "4px",
            },
          }}
          source="facturelist"
          choices={facture_choices}
          onChange={handleChange}
        />
        <Chip label={`Total : ${sum}`} sx={{ fontWeight: "bold" }} />
      </SimpleForm>
    </Create>
  );
};
