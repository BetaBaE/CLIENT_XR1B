import {
  AutocompleteInput,
  Create,
  DateInput,
  NumberInput,
  regex,
  required,
  SaveButton,
  SelectInput,
  SimpleForm,
  TextInput,
  Toolbar,
  useDataProvider,
  useGetIdentity,
  useNotify,
} from "react-admin";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import apiUrl from "../../config";
import { Box, Grid, Typography } from "@mui/material";
import "../Analyse/echencier/DataGrid/styles.css";
import { useFormContext } from "react-hook-form";

const Aside = ({ asideData }) => {
  // console.log("AsideBar", asideData);
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  return (
    <Box sx={{ width: "40%", margin: "1em" }}>
      <Typography variant="h4">
        {`Donnée BC ${!asideData.Bc ? "" : asideData.Bc}`}
      </Typography>
      <Typography variant="h6">chantier : {asideData.chantier}</Typography>
      <Typography variant="h6">Redacteur : {asideData.redacteur}</Typography>
      <Typography variant="h6">
        Fournisseur : {asideData.fournisseur}
      </Typography>
      <Typography variant="h6">BC TTC: {asideData.bcttc}</Typography>
      <br />
      <Typography variant="h4">Donnée FA</Typography>
      <div className="my-custom-table">
        <div className="table-container">
          <table
            style={{
              backgroundColor: isDark ? "#1e1e1e" : "#fff",
              color: isDark ? "#fff" : "#000",
              borderCollapse: "collapse",
              width: "100%",
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: isDark ? "#2c2c2c" : "#f2f2f2",
                  position: "sticky",
                  top: 0,
                }}
              >
                <th>FA</th>
                <th>Date FA</th>
                <th>TTC</th>
                <th>FN</th>
              </tr>
            </thead>
            <tbody>
              {asideData.FA.map((invoice) => (
                <tr
                  style={{ backgroundColor: isDark ? "#2a2a2a" : "#f9f9f9" }}
                  key={invoice.NumeroFacture}
                >
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

const SaveButtonFA = ({ data }) => (
  <Toolbar>
    <SaveButton
      disabled={data.length === 0 ? false : true}
      // label="Create post"
    />
  </Toolbar>
);

const getFournisseurEcheance = async (idfournisseur) => {
  console.log(`Fetching Echeance for fournisseur ID: ${idfournisseur}`); // ✅ Debugging log
  if (!idfournisseur) return null;

  let url = `${apiUrl}/echeancebyfournisseur/${idfournisseur}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const json = await response.json();
    console.log("API Response:", json); // ✅ Debug API response
    return json; // Expected: { EcheanceJR: number }
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

const AutoDateInput = () => {
  const { watch, setValue } = useFormContext();
  const [echeance, setEcheance] = useState(60); // Default: 60 days

  const startDate = watch("DateFacture");
  const fournisseurId = watch("idfournisseur");

  useEffect(() => {
    console.log("fournisseurId changed:", fournisseurId); // ✅ Debug if fournisseurId updates
    if (!fournisseurId) return;

    const fetchEcheance = async () => {
      const fetchedEcheance = await getFournisseurEcheance(fournisseurId);

      if (fetchedEcheance && fetchedEcheance.EcheanceJR) {
        console.log("Updating echeance to:", fetchedEcheance.EcheanceJR);
        setEcheance(() => fetchedEcheance.EcheanceJR); // ✅ Fix stale state issue
      } else {
        console.warn(
          "No valid EcheanceJR received, keeping default:",
          echeance
        );
      }
    };

    fetchEcheance();
    // eslint-disable-next-line
  }, [fournisseurId]); // ✅ Removed `echeance` from dependencies to prevent loops

  useEffect(() => {
    console.log("Calculating dateEcheance with echeance:", echeance); // ✅ Debug calculation

    if (!startDate) return;

    const originalDate = new Date(startDate);
    const calculatedDate = new Date(
      originalDate.getTime() + echeance * 24 * 60 * 60 * 1000
    );

    console.log(
      "Setting new dateEcheance:",
      calculatedDate.toISOString().split("T")[0]
    );
    setValue("dateecheance", calculatedDate.toISOString().split("T")[0]); // Format YYYY-MM-DD
  }, [startDate, echeance, setValue]);

  return (
    <DateInput
      source="dateecheance"
      sx={{ width: "98%" }}
      disabled={!startDate}
      label="Date Échéance"
    />
  );
};

export const FactureSaisieCreate = (props) => {
  const notify = useNotify();
  const theme = useTheme();
  const [dateecheance, setdateecheance] = useState(null);
  // const [inputDateEcheance, setInputDateEcheance] = useState(null);
  const dataProvider1 = useDataProvider();
  const dataProvider2 = useDataProvider();
  const dataProvider = useDataProvider();
  const [fournisseurIdField, setFournisseurIdField] = useState(true);
  const [designation, setDesignation] = useState([]);
  const [FourRasIR, setFourRasIR] = useState("");
  const [fournisseurEche, setfournisseurEche] = useState(null);
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

  // check facture deplication
  const [nfa, setNfa] = useState(null);
  const [fdate, setfdate] = useState(null);
  const [idf, setIdf] = useState(null);
  const [data, setData] = useState(false);

  function calculateDaysBetweenDates(date1, date2) {
    // Convert the date strings to Date objects
    const startDate = new Date(date1);
    const endDate = new Date(date2);

    // Check if the dates are valid
    // if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
    //   throw new Error("Invalid date");
    // }

    // Calculate the difference in milliseconds
    const differenceInTime = endDate - startDate;

    // Convert milliseconds to days
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);

    return differenceInDays;
  }
  useEffect(() => {
    if (fournisseurEche) {
      let { EcheanceJR } = fournisseurEche;
      if (EcheanceJR && fdate) {
        const originalDate = new Date(fdate);

        // Check if the date is valid
        if (isNaN(originalDate.getTime())) {
          throw new Error("Invalid date");
        }

        originalDate.setDate(originalDate.getDate() + EcheanceJR);

        // Format the new date as YYYY-MM-DD
        const newDate = originalDate.toISOString().split("T")[0];
        setdateecheance(newDate); // Update state

        console.log("newDate", newDate);
      }
    }
  }, [fdate, fournisseurEche]); // Removed dateecheance from dependencies

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `${apiUrl}/checkfacturecreation?filter=${encodeURIComponent(
            JSON.stringify({ nfa, fdate, idf })
          )}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result1 = await response.json();
        if (!Array.isArray(result1)) {
          console.error("Unexpected API response:", result1);
          return;
        }

        const formattedData = result1.map((four) => ({
          id: four.numeroFacture,
          numeroFacture: four.numeroFacture,
          DateFacture: four.DateFacture,
          TVA: four.MontantTVA,
          TTC: four.TTC,
        }));

        if (formattedData.length > 0) {
          notify(`La facture ${formattedData[0].id} deja existe`, {
            type: "warning",
            autoHideDuration: 10000,
          });
        }

        setData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (nfa && fdate && idf) {
      fetchData();
    }
  }, [nfa, fdate, idf, notify]);
  console.log(data);
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
      const maxAllowedDate = new Date();
      maxAllowedDate.setDate(todayDate.getDate() + 5); // Today + 5 days

      // Validation: The invoice date must not exceed today + 5 days
      if (dateFA > maxAllowedDate) {
        errors.DateFacture =
          "La date de facturation ne peut pas dépasser 5 jours à partir d'aujourd'hui.";
      } else {
        // Existing validation logic
        if (todayDate <= dateref) {
          // Before or on March 31 of the current year
          if (
            dateFA.getFullYear() === todayDate.getFullYear() ||
            dateFA.getFullYear() === todayDate.getFullYear() - 1
          ) {
            // Valid facture date for this year or last year
          } else {
            errors.DateFacture =
              "Année de facturation doit être égale à l'année saisie ou l'année dernière.";
          }
        } else {
          // After March 31 of the current year
          if (dateFA.getFullYear() === todayDate.getFullYear()) {
            console.log("OK: Valid facture date for this year.");
          } else {
            errors.DateFacture =
              "Année de facturation doit être égale à l'année saisie.";
          }
        }
      }
    }

    if (!value.dateecheance) {
      errors.dateecheance = "La date d'échéance est obligatoire"; // Assuming dateecheance is required
    } else if (
      calculateDaysBetweenDates(value.DateFacture, value.dateecheance) < 0 ||
      calculateDaysBetweenDates(value.DateFacture, value.dateecheance) > 119
    ) {
      errors.dateecheance =
        "La date d'échéance doit être suprieur à la date de la facture et ne pas dépasser 120 jours";
    }
    if (!value.CatFn) {
      errors.CatFn = "Mentionnez la catégorie"; // Assuming dateecheance is required
    }

    return errors;
  };
  const getFournisseurEcheance = async (idfournisseur) => {
    let url = `${apiUrl}/echeancebyfournisseur/${idfournisseur}`;
    try {
      const response = await fetch(url);
      const json = await response.json();
      setfournisseurEche(json);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const getchantierByBCommande = async (Boncommande) => {
    let url = `${apiUrl}/getchantierbyBonCommande/${Boncommande}`;

    // console.log(url);
    setLoading(true); // Set loading to true before fetching
    try {
      const response = await fetch(url);
      const json = await response.json();

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

  console.log(loading);

  const handleDateChange = async (event) => {
    const inputDate = event.target.value;
    setFormData({ ...formData, DateFacture: inputDate });
    if (identityLoading) return <div>Loading...</div>;
    console.log("inputDate", inputDate);
    if (isValidPartialDate(inputDate)) {
      if (fournisseurEche) {
        let { EcheanceJR } = fournisseurEche;

        const originalDate = new Date(inputDate);

        // Check if the date is valid
        if (isNaN(originalDate.getTime())) {
          throw new Error("Invalid date");
        }

        // Add the specified number of days
        originalDate.setDate(originalDate.getDate() + EcheanceJR);
      }
    }
  };

  function isValidPartialDate(dateString) {
    const regex = new RegExp(
      `^((19|20)\\d{2})(-(0[1-9]|1[0-2])(-(0[1-9]|[12]\\d|3[01]))?)?$`
    );
    return regex.test(dateString);
  }

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
      <SimpleForm
        toolbar={<SaveButtonFA data={data} />}
        validate={validationFacture}
        sx={{
          width: "98%",
        }}
      >
        <Grid container>
          <Grid item md={6}>
            <TextInput
              defaultValue={identity.fullName}
              label="vous êtes"
              hidden={false}
              sx={{
                width: "98%",
                input: {
                  backgroundColor:
                    theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
                  color: theme.palette.mode === "dark" ? "#fff" : "inherit",
                  borderRadius: "4px",
                },
              }}
              inputProps={{ autoComplete: "off" }}
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
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
              sx={{
                width: "98%",
                input: {
                  backgroundColor:
                    theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
                  color: theme.palette.mode === "dark" ? "#fff" : "inherit",
                  borderRadius: "4px",
                },
              }}
              inputProps={{ autoComplete: "off" }}
              onChange={(e) => setNfa(e.target.value)}
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
              sx={{ width: "98%" }}
            />
          </Grid>
          <Grid item md={6}>
            <AutocompleteInput
              label="designation"
              validate={required("selectionnez la designation")}
              sx={{
                width: "98%",
                input: {
                  backgroundColor:
                    theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
                  color: theme.palette.mode === "dark" ? "#fff" : "inherit",
                  borderRadius: "4px",
                },
              }}
              inputProps={{ autoComplete: "off" }}
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
              sx={{
                width: "98%",
                input: {
                  backgroundColor:
                    theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
                  color: theme.palette.mode === "dark" ? "#fff" : "inherit",
                  borderRadius: "4px",
                },
              }}
              inputProps={{ autoComplete: "off" }}
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
              sx={{
                width: "98%",
                input: {
                  backgroundColor:
                    theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
                  color: theme.palette.mode === "dark" ? "#fff" : "inherit",
                  borderRadius: "4px",
                },
              }}
              inputProps={{ autoComplete: "off" }}
            />
            {/* {loading && <Typography>Loading...</Typography>} */}
          </Grid>
          <Grid item md={6}>
            <AutocompleteInput
              label="fournisseur"
              validate={required("choisir le fournisseur")}
              sx={{
                width: "98%",
                input: {
                  backgroundColor:
                    theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
                  color: theme.palette.mode === "dark" ? "#fff" : "inherit",
                  borderRadius: "4px",
                },
              }}
              inputProps={{ autoComplete: "off" }}
              source="idfournisseur"
              choices={fournisseur_choices}
              onChange={async (e) => {
                if (e) {
                  setIdf(e);
                  const foundItem = fournisseur.find((item) => item.id === e);
                  setFourRasIR(foundItem || null);
                  setFormData({ ...formData, idfournisseur: e });
                  await getAvancePayénonRestituer(e);
                  await getFournisseurEcheance(e);

                  // document.querySelector("input[name='dateecheance']").value =
                  //   "";
                }
              }}
            />
          </Grid>
          <Grid item md={6}>
            <SelectInput
              sx={{ width: "98%" }}
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
              name="DateFacture"
              label="date de la facture"
              disabled={fournisseurEche ? false : true}
              validate={[
                required("Date obligatoire"),
                // validationDateFacture(datefacture),
              ]}
              sx={{ width: "98%" }}
              onChange={async (event) => {
                handleDateChange(event);
                console.log("event", event.target.value);
                setfdate(event.target.value);
                // document.querySelector("input[name='dateecheance']").value =
                //   dateecheance;
                // validationDateFacture(event.target.value);
              }}
            />
          </Grid>
          <Grid item md={6}>
            <AutocompleteInput
              label="chantier"
              sx={{
                width: "98%",
                input: {
                  backgroundColor:
                    theme.palette.mode === "dark" ? "#1e1e1e" : "#fff",
                  color: theme.palette.mode === "dark" ? "#fff" : "inherit",
                  borderRadius: "4px",
                },
              }}
              inputProps={{ autoComplete: "off" }}
              source="codechantier"
              choices={chantier_choices}
            />
          </Grid>

          <Grid item md={6}>
            <>
              {/* <DateInput
                source="dateecheance"
                disabled={fdate ? false : true}
                sx={{ width: '98%' }}
                label="Date Echeance"
                // defaultValue={dateecheance}
                value={dateecheance}
                // onChange={(event) => setdateecheance(event.target.value)} // Handle change
              /> */}
              <AutoDateInput sx={{ width: "98%" }} />
              {dateecheance ? (
                <p>
                  {dateecheance}|Number of days until due date:
                  {calculateDaysBetweenDates(fdate, dateecheance)}
                </p>
              ) : (
                ""
              )}
            </>
          </Grid>
          {/* <AutoDateInput sx={{ width: '98%' }} /> */}
          {FourRasIR.RasIr === "Oui" ? (
            <Grid item md={6}>
              <SelectInput
                sx={{ width: "98%" }}
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
