import { useEffect, useState } from "react";
import {
  useEditController,
  Edit,
  FormDataConsumer,
  NumberInput,
  required,
  SaveButton,
  SelectInput,
  SimpleForm,
  TextInput,
  Toolbar,
  useDataProvider,
  useGetIdentity,
  useRedirect,
  AutocompleteInput,
  DateInput,
} from "react-admin";
import { makeStyles } from "@material-ui/styles";
import apiUrl from "../../config";
import Swal from "sweetalert2";
import { Grid } from "@material-ui/core";
const useStyles = makeStyles(() => ({
  autocomplete: {
    width: "95%",
  },
  chip: {
    fontWeight: "bold",
  },
}));
export const AvanceForupdateEdit = (props) => {
  const { identity, isLoading: identityLoading } = useGetIdentity();
  const [designation, setDesignation] = useState([]);
  const [ttc, setTTC] = useState(0);

  const [tvainput, setTVAinput] = useState("");
  const [ht, setHT] = useState(0);
  const [prctTVA, setPrctTVA] = useState(1);
  const { record } = useEditController();
  console.log(record);

  const UserEditToolbar = (props) => (
    <Toolbar {...props}>
      <SaveButton id="save" />
    </Toolbar>
  );
  const dataProvider1 = useDataProvider();
  const [fournisseur, setFournisseur] = useState([]);
  const [facture, setFacture] = useState([{ id: "", BonCommande: "" }]);
  const dataProvider = useDataProvider();
  const redirect = useRedirect();

  const [fournisseurIdField, setFournisseurIdField] = useState(true);
  const [chantier, setChantier] = useState([]);
  const annuleAlert = (params) => {
    if (params === "Annuler") {
      Swal.fire({
        title: "Êtes-vous sûr?",
        text: "Voulez-vous vraiment Annuler cette ficheNavette?",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "Non!",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Oui, Annule!",
      }).then((result) => {
        if (result.isConfirmed) {
          document.querySelector("#save").click();
          Swal.fire("Annulé!", "FicheNavette Annulée", "success");
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            "Modification annulée",
            "FicheNavette ne sera pas modifiée.",
            "error"
          );
          redirect("list", "factureRech");
        }
      });
    }
  };
  function formatDate(string) {
    var options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toLocaleDateString([], options);
  }
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

  let designation_choices = designation.map(
    ({ id, designation, codeDesignation, PourcentageTVA }) => ({
      id: id,
      name: `${codeDesignation}||${designation}`,
      percent: PourcentageTVA,
    })
  );

  useEffect(() => {
    dataProvider1
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
  }, [dataProvider1]);
  let chantier_choices = chantier.map(({ id, LIBELLE }) => ({
    id: id,
    name: `${LIBELLE} | ${id} `,
  }));

  const classes = useStyles();
  const { isLoading, error } = useGetIdentity();
  if (isLoading) return <>Loading</>;
  if (error) return <>Error</>;
  return (
    <Edit>
      <SimpleForm toolbar={<UserEditToolbar />}>
        <Grid container>
          <FormDataConsumer>
            {({ formData }) =>
              formData.ficheNavette !== "Annuler" && (
                <Grid item md={6}>
                  {/* <TextInput
                  label="Fiche Navette"
                  className={classes.autocomplete}
                  source="ficheNavette"
                /> */}
                  <SelectInput
                    source="annulation"
                    className={classes.autocomplete}
                    onChange={(e) => {
                      console.log(e.target.value);
                      annuleAlert(e.target.value);
                    }}
                    // validate={required()}
                    choices={[{ id: "Annuler", name: "Annuler" }]}
                  />
                </Grid>
              )
            }
          </FormDataConsumer>
          <Grid item md={6}>
            <TextInput
              // defaultValue={identity.fullName}
              label="N° Proforma / Devis"
              className={classes.autocomplete}
              validate={required("N° Proforma / Devis est obligatoire")}
              source="NdocAchat"
            />
          </Grid>
          <Grid item md={6}>
            <DateInput
              // defaultValue={identity.fullName}
              label="Date de document"
              className={classes.autocomplete}
              validate={required("Date de document est obligatoire")}
              source="DateDocAchat"
            />
          </Grid>
          <Grid item md={6}>
            <TextInput
              label="Bon commande"
              className={classes.autocomplete}
              source="BonCommande"
            />
          </Grid>
          <Grid item md={6}>
            <NumberInput
              label="TTC"
              className={classes.autocomplete}
              min="10"
              source="MontantAvanceTTC"
              onChange={(e) => {
                setTTC(e.target.value);
                setHT(e.target.value / prctTVA);
                setTVAinput(e.target.value - e.target.value / prctTVA);
                e.target.value === "" ? setPrctTVA(1) : setPrctTVA(prctTVA);
                // getTTC(e.target.value, PourcentageTva);
              }}
              validate={required()}
            />
          </Grid>
          <Grid item md={6}>
            <AutocompleteInput
              label="designation"
              validate={required("selectionnez la designation")}
              className={classes.autocomplete}
              source="idDesignation"
              choices={designation_choices}
              onChange={(e) => {
                // console.log(e);
                let prc = designation_choices.find((item) => item.id === e);
                console.log(prc.percent);
                setPrctTVA(prc.percent);
                setHT(ttc / prc.percent);
                let newht = ttc / prc.percent;
                setTVAinput(ttc - newht);
              }}
            />
          </Grid>
          {/* <Grid item md={6}>
            <NumberInput
              label="MontantAvanceHT"
              className={classes.autocomplete}
              min="10"
              source="MontantAvanceHT"
              validate={required()}
            />
          </Grid>
          <Grid item md={6}>
            <NumberInput
              label="MontantAvanceTVA"
              className={classes.autocomplete}
              min="0"
              defaultValue={0}
              source="MontantAvanceTVA"
            />
          </Grid> */}
          <Grid item md={6}>
            <SelectInput
              className={classes.autocomplete}
              source="CatFn"
              label="Catégorie Facture"
              validate={required()}
              choices={[
                { id: "FET", name: "Fourniture Equipement Travaux" },
                { id: "Service", name: "Service" },
              ]}
            />
          </Grid>
          {record.EtatIR === "Oui" ? (
            <Grid item md={6}>
              <SelectInput
                className={classes.autocomplete}
                source="EtatIR"
                label="Etat Ras IR"
                validate={record.EtatIR ? required("") : undefined}
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
        {ttc > 0 ? (
          <div>
            HT : {ht.toFixed(2)}
            <br />
            TVA : {tvainput.toFixed(2)} / Taux TVA :
            {ttc > 0 ? `${((prctTVA - 1) * 100).toFixed(2)}%` : "0"}
            <br />
            TTC : {ttc}
          </div>
        ) : (
          ""
        )}
      </SimpleForm>
    </Edit>
  );
};
