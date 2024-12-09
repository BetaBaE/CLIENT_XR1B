import {
  AutocompleteInput,
  Create,
  DateInput,
  NumberInput,
  regex,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
  useDataProvider,
  useGetIdentity,
} from "react-admin";
import { makeStyles } from "@material-ui/styles";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import apiUrl from "../../config";
import { Box, Grid, Typography } from "@material-ui/core";
import "../Analyse/echencier/DataGrid/styles.css";
const useStyles = makeStyles(() => ({
  autocomplete: {
    width: "95%",
  },
  chip: {
    fontWeight: "bold",
  },
}));

const Aside = ({ asideData }) => {
  // console.log("AsideBar", asideData);

  return (
    <Box sx={{ width: "40%", margin: "1em" }}>
      <Typography fon variant="h4">
        {`Donnée BC ${!asideData.Bc ? "" : asideData.Bc}`}
      </Typography>
      <Typography fon variant="h6">
        chantier : {asideData.chantier}
      </Typography>
      <Typography fon variant="h6">
        Redacteur : {asideData.redacteur}
      </Typography>
      <Typography fon variant="h6">
        Fournisseur : {asideData.fournisseur}
      </Typography>
      <Typography fon variant="h6">
        BC TTC: {asideData.bcttc}
      </Typography>
      <br />
      <Typography fon variant="h4">
        Donnée FA
      </Typography>
      <div className="my-custom-table">
        <div className="table-container">
          <table>
            <thead>
              <th>FA</th>
              <th>Date FA</th>
              <th>TTC</th>
              <th>FN</th>
            </thead>
            <tbody>
              {asideData.FA.map((invoice) => (
                <tr key={invoice.NumeroFacture}>
                  <td>{invoice.NumeroFacture}</td>
                  <td>{invoice.DateFacture}</td>
                  <td>{invoice.TOTALTTC}</td>
                  <td>{invoice.FN}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Box>
  );
};

export const FactureSaisieCreate = (props) => {
  const classes = useStyles();
  const [dateecheance, setdateecheance] = useState(null);
  // const [inputDateEcheance, setInputDateEcheance] = useState(null);
  const dataProvider1 = useDataProvider();
  const dataProvider2 = useDataProvider();
  const dataProvider = useDataProvider();
  const [fournisseurIdField, setFournisseurIdField] = useState(true);
  const [designation, setDesignation] = useState([]);
  const [FourRasIR, setFourRasIR] = useState("");
  const [asideData, setAsideData] = useState({
    chantier: "champe Boncommade est vide",
    redacteur: "champe Boncommade est vide",
    fournisseur: "champe Boncommade est vide",
    bcttc: "champe Boncommade est vide",
    FA: [],
  });
  const [loading, setLoading] = useState(false); // Loading state
  // const [newIdentity, setNewIdentity] = useState('');
  const [tva, setTVA] = useState([]);
  const [fournisseur, setFournisseur] = useState([]);
  const [chantier, setChantier] = useState([]);
  const { identity, isLoading: identityLoading } = useGetIdentity();
  // console.log(identityLoading);

  const [formData, setFormData] = useState({
    idfournisseur: null,
    DateFacture: null, // Initialize to null or the desired default value
  });
  // const [libelleChantier, setLibelleChantier] = useState([]);
  useEffect(() => {
    // setInputDateEcheance(dateecheance);
  }, [dateecheance]);
  useEffect(() => {
    dataProvider2
      .getList("chantier", {
        pagination: { page: 1, perPage: 3000 },
        sort: { field: "LIBELLE", order: "ASC" },
      })
      .then(({ data }) => {
        setChantier(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dataProvider2]);
  let chantier_choices = chantier.map(({ id, LIBELLE }) => ({
    id: id,
    name: `${LIBELLE} | ${id} `,
  }));

  useEffect(() => {
    dataProvider1
      .getList("designation", {
        pagination: { page: 1, perPage: 3000 },
        sort: { field: "id", order: "ASC" },
      })

      .then(({ data }) => {
        setDesignation(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dataProvider1]);

  useEffect(() => {
    dataProvider
      .getList("getAllFournissuersClean", {
        pagination: { page: 1, perPage: 10000 },
        sort: { field: "id", order: "ASC" },
      })

      .then(({ data }) => {
        setFournisseur(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dataProvider]);

  let fournisseur_choices = fournisseur.map(({ id, nom, CodeFournisseur }) => ({
    id: id,
    name: `${nom} | ${CodeFournisseur} `,
  }));

  let designation_choices = designation.map(
    ({ id, designation, codeDesignation }) => ({
      id: id,
      name: `${codeDesignation}||${designation}`,
    })
  );

  const validateprice = regex(
    /[+-]?([0-9]*[.])?[0-9]+/,
    "ce prix  n'est pas au bon format"
  );
  const numerofacturevalidation = regex(
    /^\S+$/,
    "la facture ne doit pas contenir des espaces"
  );

  const validationFacture = (value) => {
    const errors = {};

    // Check for required fields and add error messages if they are missing
    if (!value.numeroFacture) {
      errors.numeroFacture = "Le numeroFacture est obligatoire";
    }
    if (!value.TTC) {
      errors.TTC = "Le MontantApayer est obligatoire";
    }
    if (!value.iddesignation) {
      errors.iddesignation = "selectionnez la designation";
    }
    if (!value.idfournisseur) {
      errors.idfournisseur = "choisir le fournisseur";
    }
    if (!value.EtatIR && FourRasIR.RasIr === "Oui") {
      errors.EtatIR = "Etat RAS IR est obligatoire";
    }
    if (!value.DateFacture) {
      value.DateFacture = "La Date Facture est obligatoire";
    } else {
      const dateref = new Date(new Date().getFullYear(), 2, 31); // March 31 of the current year
      const dateFA = new Date(value.DateFacture);
      const todayDate = new Date();
      console.log(dateFA);

      // validation facture

      if (todayDate <= dateref) {
        // Before or on March 31 of the current year
        if (
          dateFA.getFullYear() === todayDate.getFullYear() ||
          dateFA.getFullYear() === todayDate.getFullYear() - 1
        ) {
          console.log("OK: Valid facture date for this year or last year.");
        } else {
          // console.error("Error: Invalid facture year.");
          errors.DateFacture =
            "Année de facturation doit être égale à l'année saisie ou l'année dernière.";
        }
      } else {
        // After March 31 of the current year
        if (dateFA.getFullYear() === todayDate.getFullYear()) {
          console.log("OK: Valid facture date for this year.");
        } else {
          // console.error("Error: Invalid facture year.");
          errors.DateFacture =
            "Année de facturation doit être égale à l'année saisie.";
        }
      }
    }
    if (!value.dateecheance) {
      errors.dateecheance = "La date d'échéance est obligatoire"; // Assuming dateecheance is required
    }
    if (!value.CatFn) {
      errors.CatFn = "Mentionnez la catégorie"; // Assuming dateecheance is required
    }

    // Add any additional validations as needed
    // For example, if you have specific validations for the date format
    // if (value.dateecheance && !dateFormatRegex.test(value.dateecheance)) {
    //   errors.dateecheance = "Format de date invalide, utilisez yyyy-mm-dd";
    // }

    return errors;
  };

  const getchantierByBCommande = async (Boncommande) => {
    let url = `${apiUrl}/getchantierbyBonCommande/${Boncommande}`;

    // console.log(url);
    setLoading(true); // Set loading to true before fetching
    try {
      const response = await fetch(url);
      const json = await response.json();
      // setLibelleChantier(json);
      // Update asideData only if the response has the expected structure
      // console.log(json);

      if (json.BC.length > 0) {
        setAsideData({
          Bc: json.BC[0].CODEDOCUTIL || "",
          chantier: json.BC[0].LIBELLE || "champe Boncommade est vide",
          redacteur: json.BC[0].REDACTEUR || "champe Boncommade est vide",
          fournisseur: json.BC[0].NOM || "champe Boncommade est vide",
          bcttc: json.BC[0].TOTALTTC || "champe Boncommade est vide",
          FA: json.FA,
        });
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  const getTVA = (id) => {
    let url = `${apiUrl}/designationbycode/` + id;

    fetch(url)
      .then((response) => response.json())
      .then((json) => setTVA(json));
  };
  let tva_choices = tva.map(({ id, PourcentageTVA }) => ({
    id: id,
    name: `${PourcentageTVA}% `,
  }));
  const { isLoading, error } = useGetIdentity();
  if (isLoading) return <>Loading</>;
  if (error) return <>Error</>;

  const handleBlur = (event) => {
    // Call the function when the input loses focus
    getchantierByBCommande(event.target.value);
  };

  const getavancebyfournisseur = (idfournisseur) => {
    let url = `${apiUrl}/getavancebyfournisseurNonRestituer/` + idfournisseur;
    return fetch(url)
      .then((response) => response.json())
      .then((json) => json);
  };

  const getEcheanceLoiByFournisseur = async (idfournisseur) => {
    try {
      const response = await fetch(
        `${apiUrl}/getEcheanceLoibyfournisseur/${idfournisseur}`
      );
      const json = await response.json();

      if (
        !json ||
        json.length === 0 ||
        json[0].modalitePaiement === undefined
      ) {
        return null; // Retournez null si les données ne sont pas valides ou manquantes
      }

      return json[0].modalitePaiement; // Retournez directement la valeur de modalitePaiement
    } catch (error) {
      console.error("Error in getEcheanceLoiByFournisseur:", error);
      throw error;
    }
  };

  const getEcheanceReelByFournisseur = async (idfournisseur) => {
    try {
      const response = await fetch(
        `${apiUrl}/getEcheanceReelbyfournisseur/${idfournisseur}`
      );
      const json = await response.json();

      if (
        !json ||
        json.length === 0 ||
        json[0].modalitePaiement === undefined
      ) {
        return null; // Retournez null si les données ne sont pas valides ou manquantes
      }

      return json[0].modalitePaiement;
    } catch (error) {
      console.error("Error in getEcheanceReelByFournisseur:", error);
      throw error;
    }
  };

  const getEcheanceByFournisseur = async (idfournisseur, DateFacture) => {
    try {
      let modalitePaiement = null;
      const modaliteReel = await getEcheanceReelByFournisseur(idfournisseur);
      if (modaliteReel !== null) {
        modalitePaiement = modaliteReel.toString();
      } else {
        const modaliteLoi = await getEcheanceLoiByFournisseur(idfournisseur);
        if (modaliteLoi !== null) {
          modalitePaiement = modaliteLoi.toString();
        } else {
          let modalitePaiementDefault = 60;
          modalitePaiement = modalitePaiementDefault.toString();
        }
      }

      const modalitePaiementDays = parseInt(modalitePaiement, 10);
      console.log("Modalité de paiement :", modalitePaiement);

      let dateFacture = new Date(Date.parse(DateFacture));
      if (modalitePaiement.endsWith("fm")) {
        // Convertir la dateFacture à la fin du mois
        dateFacture = new Date(
          dateFacture.getFullYear(),
          dateFacture.getMonth() + 1,
          0
        );
      }

      // console.log("date facture", dateFacture);

      let dueDate = new Date(
        dateFacture.getTime() + modalitePaiementDays * 24 * 60 * 60 * 1000
      ); // Convertir les jours en millisecondes
      // console.log("Date d'échéance : ", dueDate);
      const dateEcheance = dueDate.toISOString().split("T")[0];
      console.log("Date d'échéance formatée : ", dateEcheance);
      return dateEcheance;
    } catch (error) {
      console.error("Erreur dans getEcheanceByFournisseur :", error);
      throw error;
    }
  };

  const handleDateChange = async (event) => {
    const inputDate = event.target.value;
    setFormData({ ...formData, DateFacture: inputDate });
    if (identityLoading) return <div>Loading...</div>;
    console.log("inputDate", inputDate);
    if (isValidPartialDate(inputDate)) {
      try {
        const dateEcheance = await getEcheanceByFournisseur(
          formData.idfournisseur,
          inputDate
        );
        setdateecheance(dateEcheance);
      } catch (error) {
        console.error("Error updating dateEcheance:", error);
        setdateecheance(null); // Set dateEcheance to null in case of error
      }
    } else {
      setdateecheance(null); // Set dateEcheance to null if the inputDate is not valid
    }
  };

  function isValidPartialDate(dateString) {
    const regex = new RegExp(
      `^((19|20)\\d{2})(-(0[1-9]|1[0-2])(-(0[1-9]|[12]\\d|3[01]))?)?$`
    );
    return regex.test(dateString);
  }

  const dateFormatRegex = regex(
    /^\d{4}-\d{2}-\d{2}$/,
    "veuillez saisir une date de format aaaa-mm-dd"
  );
  const getAvancePayénonRestituer = async (id) => {
    try {
      const avance_choices = await getavancebyfournisseur(id);
      if (avance_choices.length === 0) {
        Swal.fire({
          text: "Aucune avance non Restitué trouvée",
        });
      } else {
        const choicesText = avance_choices
          .map(
            ({ BonCommande, MontantAvanceTTC, CodeAffaire }) =>
              `${CodeAffaire} | ${MontantAvanceTTC} | ${BonCommande}`
          )
          .join("<br/>");

        Swal.fire({
          html: `Les avances payé et non Restituer:<br/>${choicesText}`,
        });
      }
    } catch (error) {
      console.error("Error fetching avance_choices:", error);
    }
  };

  return (
    <Create label="ajouter" aside={<Aside asideData={asideData} {...props} />}>
      <SimpleForm validate={validationFacture}>
        <Grid container>
          <Grid item md={6}>
            <TextInput
              defaultValue={identity.fullName}
              label="vous êtes"
              hidden={false}
              className={classes.autocomplete}
              disabled={true}
              source="fullName"
            />
          </Grid>
          <Grid item md={6}>
            <TextInput
              source="numeroFacture"
              label="numeroFacture"
              validate={[
                required("Le numeroFacture est obligatoire"),
                numerofacturevalidation,
              ]}
              className={classes.autocomplete}
            />
          </Grid>
          <Grid item md={6}>
            <NumberInput
              source="TTC"
              label="TTC"
              validate={[
                required("Le MontantApayer est obligatoire"),
                validateprice,
              ]}
              className={classes.autocomplete}
            />
          </Grid>
          <Grid item md={6}>
            <AutocompleteInput
              label="designation"
              validate={required("selectionnez la designation")}
              className={classes.autocomplete}
              source="iddesignation"
              choices={designation_choices}
              onChange={(e) => {
                console.log("e", e);

                if (!e) {
                  setFournisseurIdField(true);
                } else {
                  setFournisseurIdField(false);
                  getTVA(e);

                  // Check if e is an array before using join
                  const formattedDates = Array.isArray(e)
                    ? e.join("gheghe")
                    : e.toString();
                  console.log("formattedDates", formattedDates); // Use formattedDates as needed
                }
              }}
            />
          </Grid>
          <Grid item md={6}>
            <SelectInput
              validate={required("Ce champ est obligatoire")}
              disabled={fournisseurIdField}
              className={classes.autocomplete}
              source="iddesignation"
              choices={tva_choices}
              label="Pourcentage TVA"
            />
          </Grid>
          <Grid item md={6}>
            <TextInput
              source="BonCommande"
              label="BonCommande"
              onBlur={handleBlur}
              className={classes.autocomplete}
            />
            {loading && <Typography>Loading...</Typography>}{" "}
          </Grid>
          <Grid item md={6}>
            <AutocompleteInput
              label="fournisseur"
              validate={required("choisir le fournisseur")}
              className={classes.autocomplete}
              source="idfournisseur"
              choices={fournisseur_choices}
              onChange={async (e) => {
                if (e) {
                  const foundItem = fournisseur.find((item) => item.id === e);
                  setFourRasIR(foundItem || null);
                  setFormData({ ...formData, idfournisseur: e });
                  await getAvancePayénonRestituer(e);
                }
              }}
            />
          </Grid>
          <Grid item md={6}>
            <SelectInput
              className={classes.autocomplete}
              source="CatFn"
              label="Catégorie Facture"
              validate={required("")}
              choices={[
                { id: "FET", name: "Fourniture Equipement Travaux" },
                { id: "Service", name: "Service" },
              ]}
            />
          </Grid>
          <Grid item md={6}>
            <DateInput
              source="DateFacture"
              label="date de la facture"
              validate={[
                required("Date obligatoire"),
                // validationDateFacture(datefacture),
              ]}
              className={classes.autocomplete}
              onChange={async (event) => {
                handleDateChange(event);
                // validationDateFacture(event.target.value);
              }}
            />
          </Grid>
          <Grid item md={6}>
            <AutocompleteInput
              label="chantier"
              className={classes.autocomplete}
              source="codechantier"
              choices={chantier_choices}
            />
          </Grid>
          <Grid item md={6}>
            <>
              <TextInput
                source="dateecheance"
                className={classes.autocomplete}
                label="format date Echeance: yyyy-mm-dd"
                defaultValue={dateecheance} // Utiliser dateEcheance comme valeur
                validate={dateFormatRegex}
              />
              <>{dateecheance}</>
            </>
          </Grid>
          {FourRasIR.RasIr === "Oui" ? (
            <Grid item md={6}>
              <SelectInput
                className={classes.autocomplete}
                source="EtatIR"
                label="Etat Ras IR"
                validate={FourRasIR.RasIr === "Oui" ? required("") : undefined}
                choices={[
                  { id: "Oui", name: "Oui" },
                  { id: "Non", name: "Non" },
                ]}
              />
            </Grid>
          ) : (
            ""
          )}
        </Grid>
      </SimpleForm>
    </Create>
  );
};
