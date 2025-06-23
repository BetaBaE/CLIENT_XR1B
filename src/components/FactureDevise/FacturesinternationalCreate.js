import { Grid } from "@mui/material";
import {
  AutocompleteInput,
  Create,
  DateInput,
  NumberInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
  useDataProvider,
  useGetIdentity,
} from "react-admin";
import { useInputStyleFilters } from "../global/DarkInputStyle";
import { useEffect, useState } from "react";
import apiUrl from "../../config";

export const FacturesinternationalCreate = () => {
  const { identity, isLoading, error } = useGetIdentity();
  const dataProvider = useDataProvider();
  const [chantier, setChantier] = useState([]);
  const [dossierOuvert, setDossierOuvert] = useState([]);
  const requiredField = required("Ce champ est obligatoire");
  const [fournisseur, setFournisseur] = useState([]);
  const [loadingFournisseur, setLoadingFournisseur] = useState(false);

  useEffect(() => {
    // Fetch chantiers
    dataProvider
      .getList("chantier", {
        pagination: { page: 1, perPage: 3000 },
        sort: { field: "LIBELLE", order: "ASC" },
      })
      .then(({ data }) => {
        setChantier(data);
      })
      .catch((error) => {
        console.error("Error loading chantiers:", error);
      });

    // Fetch open dossiers
    dataProvider
      .getList("dossier", {
        filter: { Etat: "Ouvert" }, // ✅ use "filter"
        pagination: { page: 1, perPage: 3000 },
        sort: { field: "id", order: "DESC" },
      })
      .then(({ data }) => {
        setDossierOuvert(data);
      })
      .catch((error) => {
        console.error("Error loading dossiers:", error);
      });
  }, [dataProvider]);
  let chantier_choices = chantier.map(({ id, LIBELLE }) => ({
    id: id,
    name: `${LIBELLE} | ${id} `,
  }));

  let dossier_choices = dossierOuvert.map(({ id, NumDossier, Etat }) => ({
    id: id,
    name: `${NumDossier} | ${Etat} `,
  }));

  const fetchFournisseur = async (id) => {
    setLoadingFournisseur(true);
    try {
      const response = await fetch(`${apiUrl}/fournissuerdossier/${id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setFournisseur(data);
      return data;
    } catch (error) {
      console.error("Error fetching fournisseur:", error);
      setFournisseur([]);
      return null;
    } finally {
      setLoadingFournisseur(false);
    }
  };
  if (isLoading) return <>Loading</>;
  if (error) return <>Error</>;
  return (
    <Create title="Créer d'une facture internationale">
      <SimpleForm>
        <Grid container spacing={2}>
          <Grid item md={4}>
            <TextInput
              defaultValue={identity.fullName}
              label="vous êtes"
              hidden={false}
              sx={useInputStyleFilters}
              slotProps={{
                input: {
                  readOnly: true,
                  autoComplete: "off",
                },
              }}
              source="Redacteur"
              required={required("Ce champ est obligatoire")}
            />
          </Grid>
          <Grid item md={4}>
            <SelectInput
              source="idDossier"
              label="N° Dossier"
              choices={dossier_choices}
              validate={requiredField}
              slotProps={{
                input: {
                  autoComplete: "off",
                },
              }}
              onChange={(e) => {
                fetchFournisseur(e.target.value);
              }}
              sx={useInputStyleFilters}
            />
          </Grid>
          <Grid item md={4}>
            <SelectInput
              validate={requiredField}
              source="Devise"
              choices={[
                { id: "USD", name: "USD - US Dollar" },
                { id: "EUR", name: "EUR - Euro" },
                { id: "GBP", name: "GBP - British Pound" },
                { id: "CAD", name: "CAD - Canadian Dollar" },
                { id: "AUD", name: "AUD - Australian Dollar" },
                { id: "CHF", name: "CHF - Swiss Franc" },
                { id: "JPY", name: "JPY - Japanese Yen" },
                { id: "CNY", name: "CNY - Chinese Yuan" },
                { id: "SAR", name: "SAR - Saudi Riyal" },
                { id: "AED", name: "AED - Emirati Dirham" },
              ]}
              sx={useInputStyleFilters}
              slotProps={{
                input: {
                  autoComplete: "off",
                },
              }}
            />
          </Grid>
          <Grid item md={4}>
            <DateInput
              validate={requiredField}
              label="Date facture"
              source="dateDoc"
              slotProps={{
                input: {
                  autoComplete: "off",
                },
              }}
              sx={useInputStyleFilters}
            />
          </Grid>
          <Grid item md={4}>
            <TextInput
              validate={requiredField}
              label="N° facture"
              source="numDoc"
              slotProps={{
                input: {
                  autoComplete: "off",
                },
              }}
              sx={useInputStyleFilters}
            />
          </Grid>
          <Grid item md={4}>
            <DateInput
              validate={requiredField}
              label="Date douane"
              source="dateDouane"
              slotProps={{
                input: {
                  autoComplete: "off",
                },
              }}
              sx={useInputStyleFilters}
            />
          </Grid>
          <Grid item md={4}>
            <NumberInput
              validate={requiredField}
              source="TauxInit"
              label="Taux Initial"
              slotProps={{
                input: {
                  autoComplete: "off",
                },
              }}
              sx={useInputStyleFilters}
            />
          </Grid>

          <Grid item md={4}>
            <NumberInput
              validate={requiredField}
              source="iddesignation"
              label="Designation"
              slotProps={{
                input: {
                  autoComplete: "off",
                },
              }}
              sx={useInputStyleFilters}
            />
          </Grid>
          <Grid item md={4}>
            <SelectInput
              validate={requiredField}
              label="Fournisseur"
              source="idFournisseur"
              choices={fournisseur}
              disabled={loadingFournisseur}
              sx={useInputStyleFilters}
              slotProps={{
                input: {
                  autoComplete: "off",
                },
              }}
            />
          </Grid>
          <Grid item md={4}>
            <NumberInput
              validate={requiredField}
              source="MontantHtDevise"
              label="Montant HT Devise"
              slotProps={{
                input: {
                  autoComplete: "off",
                },
              }}
              sx={useInputStyleFilters}
            />
          </Grid>

          <Grid item md={4}>
            <NumberInput
              validate={requiredField}
              source="MontantTvaDevise"
              label="Montant TVA Devise"
              slotProps={{
                input: {
                  autoComplete: "off",
                },
              }}
              sx={useInputStyleFilters}
            />
          </Grid>
          <Grid item md={4}>
            <NumberInput
              validate={requiredField}
              source="MontantTTCDevise"
              label="Montant TTC Devise"
              slotProps={{
                input: {
                  autoComplete: "off",
                },
              }}
              sx={useInputStyleFilters}
            />
          </Grid>

          <Grid item md={4}>
            <AutocompleteInput
              validate={requiredField}
              label="Chantier"
              source="codeChantier"
              choices={chantier_choices}
              slotProps={{
                input: {
                  autoComplete: "off",
                },
              }}
              sx={useInputStyleFilters}
            />
          </Grid>
        </Grid>
      </SimpleForm>
    </Create>
  );
};
