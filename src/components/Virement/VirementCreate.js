import { useEffect, useState } from "react";
import {
  AutocompleteArrayInput,
  AutocompleteInput,
  Create,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
  useGetIdentity,
  useRedirect,
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
  // Separate styles for SweetAlert
  "swal2-popup.swal2-left": {
    right: 0,
    transform: "translateX(0)",
  },
}));

export const VirementCreate = () => {
  const redirect = useRedirect();
  const { identity, isLoading: identityLoading } = useGetIdentity();
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
  // const [factureFilter, setFactureFilter] = useState([
  //   { id: "", DATEDOC: "1960-01-01T00:00:00.000Z", nom: "", NETAPAYER: 0.0 },
  // ]);

  const [sum, setSum] = useState(0);

  const handleChange = (e) => {
    let sum = 0;
    e.forEach((fa) => {
      const selectedFacture = facture_choices.find((f) => f.id === fa);
      if (selectedFacture) {
        // setSelectedSupplierFactureCategory(selectedFacture.categorie); // Set selected supplier category

        // Adjusted condition based on provided logic
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
              redirect("list", "virements");
            }
          });
        }

        // Extract MontantAPaye from the name string
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
    if (identityLoading) return <div>Loading...</div>;
  };

  const [orderVirementField, setOrderVirementField] = useState(true);
  const [fournisseurIdField, setFournisseurIdField] = useState(true);
  const [fournisseurRibField, setFournisseurRibField] = useState(true);
  const [sumfacturewithfn, setSumfacturewithfn] = useState([]);
  const [sumfacturewithoutfn, setSumfacturewithoutfn] = useState([]);

  const sumfactureValue =
    sumfacturewithfn.length > 0 ? sumfacturewithfn[0].sumfactureValuefn : "";
  const [
    selectedSupplierFournisseurCategory,
    setSelectedSupplierFournisseurCategory,
  ] = useState("");

  const sumfacturenotfnValue =
    sumfacturewithoutfn.length > 0
      ? sumfacturewithoutfn[0].sumfacturewithoutfn
      : "";

  const [sumavance, setSumavance] = useState([]);

  const sumAvanceValue = sumavance.length > 0 ? sumavance[0].sum : "";

  const [onchangefournisseur, setOnchangefournisseur] = useState([]);

  const [CheckedFournisseur, setCheckedFournisseur] = useState(true);

  useEffect(() => {
    fetch(`${apiUrl}/ordervirementencours`)
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
    let url = `${apiUrl}/getfacturebyfournisseurid/` + id;
    console.log(url);
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        // console.log(json);
        setFacture(json);
      });
    // console.log(facture);
  };

  const getCheckedFournisseur = async (e, fournisseurId) => {
    try {
      const url = `${apiUrl}/CheckedFournisseurDejaExiste/` + fournisseurId;
      console.log(url);

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des données");
      }

      const json = await response.json();
      setCheckedFournisseur(json);

      const ribfournisseursChecked = ribfournisseurs_choices
        .filter(({ name }) => name !== undefined)
        .map(({ name }) => `Le rib : ${name}`);

      const confirmationMessage = CheckedFournisseur
        ? "Oui, il est correct"
        : "Non, il n'est pas correct";

      Swal.fire({
        title: "Confirmation de RIB",
        text: "Merci de confirmer la validité du RIB, s'il vous plaît",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Non, il n'est pas correct",
        confirmButtonText: confirmationMessage,
        html: ribfournisseursChecked.join("<br>"),
        position: "top-right", // Adjust the position here
        allowOutsideClick: false, // Prevent interaction outside the popup
        allowEscapeKey: false,
        customClass: {
          popup: "swal2-left",
        },
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Confirmation!",
            text: "Vous avez bien confirmé le RIB",
            icon: "success",
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire("Le virement a été annulé", "Merci de bien valider le RIB");

          redirect("list", "virements");
        }
      });

      console.log(ribfournisseursChecked);
    } catch (error) {
      console.error("Erreur lors de la récupération des données:", error);
    }
  };

  const getsumavanceByFourniseurId = (id) => {
    let url = `${apiUrl}/getsumavancebyfournisseur/` + id;
    console.log(url);
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setSumavance(json);
      })
      .catch((error) => {
        console.error("Error fetching sumavance:", error);
      });
  };

  const getsumfacturewithfnByFourniseurId = (id) => {
    let url = `${apiUrl}/getsumfacturebyfournisseurwithfn/` + id;
    console.log(url);
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setSumfacturewithfn(json);
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
  const getFournisseurFilteredByOv = (id) => {
    fetch(`${apiUrl}/fournisseursribvalid?ordervirment={"id":"${id}"}`)
      .then((response) => response.json())
      .then((json) => setFournisseur(json));
  };

  let orderVirement_choices = orderVirement.map(
    ({ id, alert, dateExpiration }) => ({
      id: id,
      name:
        `${id}|${alert}|${dateExpiration}`.length < 40
          ? `${id}`
          : `⚠️${id} | ${alert} | le ${dateExpiration.split("T")[0]}⚠️`,
    })
  );
  let fournisseurs_choices = fournisseur.map(
    ({ FournisseurId, nom, CodeFournisseur, catFournisseur }) => ({
      id: FournisseurId,
      name: `${nom} ${CodeFournisseur} ,${catFournisseur}`,
      categorie: catFournisseur,
    })
  );

  let ribfournisseurs_choices = ribFournisseur.map(({ id, rib }) => ({
    id: id,
    name: rib,
  }));

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

  const classes = useStyles();
  const { isLoading, error } = useGetIdentity();
  if (isLoading) return <>Loading</>;
  if (error) return <>Error</>;
  return (
    <Create>
      <SimpleForm>
        <TextInput
          defaultValue={identity?.fullName}
          label="vous êtes"
          hidden={false}
          className={classes.autocomplete}
          disabled={true}
          source="Redacteur"
        ></TextInput>

        <SelectInput
          validate={required("Ce champ est obligatoire")}
          className={classes.autocomplete}
          source="orderVirementId"
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
            getsumfacturewithfnByFourniseurId(e);
            getsumfacturewithoutByFourniseurId(e);
            getsumavanceByFourniseurId(e);

            if (!e) {
              setFournisseurIdField(true);
              setSelectedSupplierFournisseurCategory(""); // Clear selected supplier category
            } else {
              const selectedFournisseur = fournisseurs_choices.find(
                (f) => f.id === e
              );
              setFournisseurIdField(false);
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

        {sumfactureValue ? (
          <div>
            La somme des montants des factures qui ont FN par fournisseur est de
            : {sumfactureValue} DH
          </div>
        ) : (
          ""
        )}
        <br></br>
        {sumfacturenotfnValue ? (
          <div>
            la somme des montants factures qui n'ont pas FN par fournisseur
            value : {sumfacturenotfnValue} DH
          </div>
        ) : (
          ""
        )}

        <br></br>
        {sumAvanceValue ? (
          <div>
            la somme des montants des avances par fournisseur value :{" "}
            {sumAvanceValue} DH
          </div>
        ) : (
          ""
        )}

        <SelectInput
          validate={required("Ce champ est obligatoire")}
          disabled={fournisseurIdField}
          className={classes.autocomplete}
          onChange={(e) => {
            if (e.target.value === "") {
              setFournisseurRibField(true);
              getCheckedFournisseur(e.target.value);
            } else {
              setFournisseurRibField(false);
              getCheckedFournisseur(e, e.target.value);
              console.log("e.taget", e.target.value);
              // console.log("e",e)
            }
          }}
          source="ribFournisseurId"
          choices={ribfournisseurs_choices}
        />
        <AutocompleteArrayInput
          validate={[required("Ce champ est obligatoire")]}
          disabled={fournisseurRibField}
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
