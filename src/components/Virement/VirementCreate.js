import { useEffect, useState } from "react";
import {
  AutocompleteArrayInput,
  AutocompleteInput,
  Create,
  required,
  SelectInput,
  SimpleForm,
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
export const VirementCreate = () => {
  function formatDate(string) {
    var options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toLocaleDateString([], options);
  }

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

  const [sum, setSum] = useState("0.000");

  const [orderVirementField, setOrderVirementField] = useState(true);
  const [fournisseurIdField, setFournisseurIdField] = useState(true);
  const [fournisseurRibField, setFournisseurRibField] = useState(true);

  const [onchangefournisseur, setOnchangefournisseur] = useState([]);

  useEffect(() => {
    fetch("http://10.111.1.95:8080/ordervirementencours")
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
    let url = "http://10.111.1.95:8080/getfacturebyfournisseurid/" + id;
    // console.log(url);
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        // console.log(json);
        setFacture(json);
      });
    // console.log(facture);
  };

  const getFournisseurFilteredByOv = (id) => {
    fetch(
      `http://10.111.1.95:8080/fournisseursribvalid?ordervirment={"id":"${id}"}`
    )
      .then((response) => response.json())
      .then((json) => setFournisseur(json));
  };

  let orderVirement_choices = orderVirement.map(({ id }) => ({
    id: id,
    name: id,
  }));
  let fournisseurs_choices = fournisseur.map(
    ({ FournisseurId, nom, CodeFournisseur }) => ({
      id: FournisseurId,
      name: `${nom} ${CodeFournisseur}`,
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
      MontantFacture,
    }) => ({
      id: id,
      name: `${CODEDOCUTIL} | ${chantier} | FN ${ficheNavette} | ${
        DateFacture?.split("T")[0]
      } | ${nom} |${MontantFacture != null ? MontantFacture : TTC}`,
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
        <SelectInput
          validate={required("Ce champ est obligatoire")}
          disabled={fournisseurIdField}
          className={classes.autocomplete}
          onChange={(e) => {
            if (e.target.value === "") {
              setFournisseurRibField(true);
            } else {
              setFournisseurRibField(false);
            }
          }}
          source="ribFournisseurId"
          choices={ribfournisseurs_choices}
        />
        <AutocompleteArrayInput
          validate={required("Ce champ est obligatoire")}
          disabled={fournisseurRibField}
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
