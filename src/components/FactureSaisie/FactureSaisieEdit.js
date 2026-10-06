import {
  AutocompleteInput,
  BooleanInput,
  DateInput,
  Edit,
  ReferenceInput,
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
import { Grid } from "@mui/material";
import { useFormContext } from "react-hook-form";
import Swal from "sweetalert2";
import { usePermissions } from "react-admin";
import { useInputStyleFilters } from "../global/DarkInputStyle";
// import Skeleton from '@material-ui/lab/Skeleton';

// Styles spécifiques pour ce composant

const PapierRecuInput = ({ userDisplayName }) => {
  const { setValue } = useFormContext();

  const handlePapierRecuChange = async (event) => {
    const checked = Boolean(event?.target?.checked);

    if (!checked) {
      setValue("papierRecu", false, { shouldDirty: true, shouldValidate: true });
      return;
    }

    const result = await Swal.fire({
      icon: "warning",
      title: "Confirmation",
      text: `M./Mme ${userDisplayName}, confirmez-vous cette action ?`,
      showCancelButton: true,
      confirmButtonText: "Oui",
      cancelButtonText: "Non",
    });

    if (!result.isConfirmed) {
      setValue("papierRecu", false, { shouldDirty: true, shouldValidate: true });
      return;
    }

    setValue("papierRecu", true, { shouldDirty: true, shouldValidate: true });
  };

  return (
    <BooleanInput
      source="papierRecu"
      label="Papier de la facture reçu"
      sx={useInputStyleFilters}
      onChange={handlePapierRecuChange}
    />
  );
};

export const FactureSaisieEdit = () => {
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
  const { permissions } = usePermissions();
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

  // Gestion des cas de chargement et d'erreur de récupération d'identité
  if (isLoading) return <>Chargement...</>;
  if (identityLoading) return <>Chargement...</>;
  if (error) return <>Erreur</>;

  return (
    <Edit>
      <SimpleForm
        // className={classes.formContainer}
        toolbar={<UserEditToolbar />}
      >
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <TextInput
              defaultValue={identity.username}
              label="vous êtes"
              hidden={false}
              sx={useInputStyleFilters}
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
              source="fullNameupdating"
            />
          </Grid>

          <Grid item xs={4}>
            <TextInput
              source="fullName"
              label="crée par"
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
              sx={useInputStyleFilters}
            />
          </Grid>
          <Grid item xs={4}>
            <DateInput
              source="createdDate"
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
              sx={useInputStyleFilters}
            />
          </Grid>
          <Grid item xs={4}>
            <TextInput
              source="nom"
              sx={useInputStyleFilters}
              slotProps={{
                input: {
                  readOnly: true,
                },
              }}
            />
          </Grid>
          {permissions === "admin" ||
          permissions === "comptable midelt" ||
          permissions === "superviseur comptabilite midelt" ? (
            <>
              <Grid item xs={4}>
                <TextInput
                  source="BonCommande"
                  sx={useInputStyleFilters}
                  slotProps={{ input: { autoComplete: "off" } }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextInput
                  source="numeroFacture"
                  label="Numéro de Facture"
                  validate={required("Le numéro de facture est obligatoire")}
                  sx={useInputStyleFilters}
                  slotProps={{ input: { autoComplete: "off" } }}
                />
              </Grid>
              <Grid item xs={4}>
                <DateInput
                  source="DateFacture"
                  label="Date de Facture"
                  validate={required("La date de facture est obligatoire")}
                  sx={useInputStyleFilters}
                  slotProps={{ input: { autoComplete: "off" } }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextInput
                  source="TTC"
                  label="TTC"
                  sx={useInputStyleFilters}
                  slotProps={{ input: { autoComplete: "off" } }}
                  validate={required("Ce champ est obligatoire")}
                  disabled={ControlEdit(record)}
                />
              </Grid>
              <Grid item xs={4}>
                <ReferenceInput
                  source="designation"
                  reference="designation"
                  perPage={50}
                  sort={{ field: "id", order: "ASC" }}
                >
                  <AutocompleteInput
                    validate={required("Ce champ est obligatoire")}
                    sx={useInputStyleFilters}
                    slotProps={{ input: { autoComplete: "off" } }}
                    disabled={ControlEdit(record)}
                    label="Designation"
                    filterToQuery={(searchText) => ({ q: searchText })}
                    matchSuggestion={() => true}
                    optionText={(record) =>
                      record?.id
                        ? `${record.codeDesignation}||${record.designation}`
                        : ""
                    }
                  />
                </ReferenceInput>
              </Grid>
              <Grid item xs={4}>
                <SelectInput
                  source="verifiyMidelt"
                  sx={useInputStyleFilters}
                  slotProps={{ input: { autoComplete: "off" } }}
                  choices={[{ id: "verifié", name: "Verifié" }]}
                />
              </Grid>
              <Grid item xs={4}>
                <SelectInput
                  source="etat"
                  sx={useInputStyleFilters}
                  slotProps={{ input: { autoComplete: "off" } }}
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
                <ReferenceInput
                  source="codeChantier"
                  reference="Chantier"
                  perPage={50}
                  sort={{ field: "LIBELLE", order: "ASC" }}
                >
                  <AutocompleteInput
                    label="chantier"
                    sx={useInputStyleFilters}
                    slotProps={{ input: { autoComplete: "off" } }}
                    filterToQuery={(searchText) => ({ q: searchText })}
                    matchSuggestion={() => true}
                    optionText={(record) =>
                      record?.id ? `${record.LIBELLE} | ${record.id} ` : ""
                    }
                  />
                </ReferenceInput>
              </Grid>
              <Grid item xs={4}>
                <DateInput
                  source="dateecheance"
                  sx={useInputStyleFilters}
                  slotProps={{ input: { autoComplete: "off" } }}
                />
              </Grid>
            </>
          ) : null}
          <Grid item xs={4}>
            <TextInput
              source="AcompteReg"
              sx={useInputStyleFilters}
              slotProps={{
                input: {
                  readOnly: true,
                  autoComplete: "off",
                },
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <TextInput
              source="AcompteVal"
              sx={useInputStyleFilters}
              slotProps={{
                input: {
                  readOnly: true,
                  autoComplete: "off",
                },
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <SelectInput
              source="CatFn"
              sx={useInputStyleFilters}
              slotProps={{ input: { autoComplete: "off" } }}
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
                sx={useInputStyleFilters}
                slotProps={{ input: { autoComplete: "off" } }}
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
          <Grid item xs={4}>
            <SelectInput
              sx={useInputStyleFilters}
              slotProps={{ input: { autoComplete: "off" } }}
              source="ForcerRas"
              label="Forcer RAS"
              defaultValue="Non"
              choices={[
                { id: "Non", name: "Non" },
                { id: "Oui", name: "Oui" },
              ]}
            />
          </Grid>
          {permissions === "admin" ||
          permissions === "comptable midelt" ||
          permissions === "superviseur comptabilite midelt" ? (
            <Grid item xs={4}>
              <PapierRecuInput userDisplayName={identity?.username || "User"} />
            </Grid>
          ) : null}
        </Grid>
      </SimpleForm>
    </Edit>
  );
};
