import React from "react";
import {
  AutocompleteInput,
  DateInput,
  Edit,
  required,
  SaveButton,
  SelectInput,
  SimpleForm,
  TextInput,
  Toolbar,
  useEditController,
  useGetIdentity,
  useRedirect,
} from "react-admin";
import { makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";
import useFetchChantier from "../global/chantier";
import apiUrl from "../../config";
import useFetchDesignation from "../global/designation";
import Swal from "sweetalert2";
import { usePermissions } from "react-admin";
// import Skeleton from '@material-ui/lab/Skeleton';

// Styles spécifiques pour ce composant
const useStyles = makeStyles(() => ({
  autocomplete: {
    width: "95%",
  },
  // formContainer: {
  //  -- display: "1vh",
  // },
}));

export const FactureSaisieEdit = () => {
  const classes = useStyles(); // Utilisation des styles définis
  const redirect = useRedirect();
  const { record } = useEditController();

  const ControlEdit = (record) => {
    return record.AcompteReg > 0 || record.AcompteVal > 0 ? true : false;
  };

  console.log(record);

  const UserEditToolbar = (props) => (
    <Toolbar {...props}>
      <SaveButton id="save" />
    </Toolbar>
  );
  const { isPending, permissions } = usePermissions();
  const annuleAlert = (params) => {
    if (params === "Annuler") {
      Swal.fire({
        title: "Êtes-vous sûr?",
        text: "Voulez-vous vraiment Annuler cette Facture?",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "Non!",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Oui, Annule!",
      }).then((result) => {
        if (result.isConfirmed) {
          document.querySelector("#save").click();
          Swal.fire("Annulé!", "Facture Annulée", "success");
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            "Modification annulée",
            "Facture ne sera pas modifiée.",
            "error"
          );
          redirect("list", "facturesSaisie");
        }
      });
    }
  };

  // Récupération de l'identité de l'utilisateur actuel
  const { isLoading, error } = useGetIdentity();
  const { identity, isLoading: identityLoading } = useGetIdentity();
  const { chantier, loading, Error } = useFetchChantier(apiUrl);
  const { designation, loadingDesignation, ErrorDesignation } =
    useFetchDesignation(apiUrl);

  // Gestion des cas de chargement et d'erreur de récupération d'identité
  if (isLoading) return <>Chargement...</>;
  if (error) return <>Erreur</>;

  let chantier_choices = chantier.map(({ id, LIBELLE }) => ({
    id: id,
    name: `${LIBELLE} | ${id} `,
  }));

  let designation_choices = designation.map(
    ({ id, designation, codeDesignation }) => ({
      id: id,
      name: `${codeDesignation}||${designation}`,
    })
  );

  return (
    <Edit>
      <SimpleForm
        className={classes.formContainer}
        toolbar={<UserEditToolbar />}
      >
        <Grid container>
          <Grid item xs={4}>
            <TextInput
              defaultValue={identity.fullName}
              label="vous êtes"
              hidden={false}
              className={classes.autocomplete}
              disabled={true}
              source="fullNameupdating"
            />
          </Grid>

          <Grid item xs={4}>
            <TextInput
              source="fullName"
              label="crée par"
              disabled={true}
              className={classes.autocomplete}
            />
          </Grid>
          <Grid item xs={4}>
            <DateInput
              source="createdDate"
              disabled={true}
              className={classes.autocomplete}
            />
          </Grid>
          <Grid item xs={4}>
            <TextInput
              source="nom"
              className={classes.autocomplete}
              disabled={true}
            />
          </Grid>
          {permissions === "admin" ||
          permissions === "comptable midelt" ||
          permissions === "superviseur comptabilite midelt" ? (
            <>
              <Grid item xs={4}>
                <TextInput
                  source="BonCommande"
                  className={classes.autocomplete}
                />
              </Grid>
              <Grid item xs={4}>
                <TextInput
                  source="numeroFacture"
                  label="Numéro de Facture"
                  validate={required("Le numéro de facture est obligatoire")}
                  className={classes.autocomplete}
                />
              </Grid>
              <Grid item xs={4}>
                <DateInput
                  source="DateFacture"
                  label="Date de Facture"
                  validate={required("La date de facture est obligatoire")}
                  className={classes.autocomplete}
                />
              </Grid>
              <Grid item xs={4}>
                <TextInput
                  source="TTC"
                  label="TTC"
                  className={classes.autocomplete}
                  validate={required("Ce champ est obligatoire")}
                  disabled={ControlEdit(record)}
                />
              </Grid>
              <Grid item xs={4}>
                <AutocompleteInput
                  validate={required("Ce champ est obligatoire")}
                  // disabled={fournisseurIdField}
                  className={classes.autocomplete}
                  source="designation"
                  choices={designation_choices}
                  disabled={ControlEdit(record)}
                  label="Designation"
                />
              </Grid>
              <Grid item xs={4}>
                <SelectInput
                  source="verifiyMidelt"
                  className={classes.autocomplete}
                  choices={[{ id: "verifié", name: "Verifié" }]}
                />
              </Grid>
              <Grid item xs={4}>
                <SelectInput
                  source="etat"
                  className={classes.autocomplete}
                  disabled={ControlEdit(record)}
                  validate={required("Ce champ est obligatoire")}
                  choices={[
                    { id: "Annuler", name: "Annuler" },
                    { id: "Saisie", name: "Saisie" },
                  ]}
                  onChange={(e) => {
                    annuleAlert(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={4}>
                <AutocompleteInput
                  label="chantier"
                  className={classes.autocomplete}
                  source="codeChantier"
                  choices={chantier_choices}
                />
              </Grid>
              <Grid item xs={4}>
                <DateInput
                  source="dateecheance"
                  className={classes.autocomplete}
                />
              </Grid>{" "}
            </>
          ) : null}
          <Grid item xs={4}>
            <TextInput
              source="AcompteReg"
              className={classes.autocomplete}
              disabled={true}
            />
          </Grid>
          <Grid item xs={4}>
            <TextInput
              source="AcompteVal"
              className={classes.autocomplete}
              disabled={true}
            />
          </Grid>
          <Grid item xs={4}>
            <SelectInput
              source="CatFn"
              className={classes.autocomplete}
              validate={required("Ce champ est obligatoire")}
              choices={[
                { id: "FET", name: "Fourniture Equipement Travaux" },
                { id: "Service", name: "Service" },
              ]}
            />
          </Grid>
          {record.EtatIR ? (
            <Grid item md={4}>
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
        {/* <TextInput source="id" /> */}
      </SimpleForm>
    </Edit>
  );
};
