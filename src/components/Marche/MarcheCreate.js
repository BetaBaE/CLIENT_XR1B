import {
  AutocompleteInput,
  Create,
  DateInput,
  NumberInput,
  ReferenceInput,
  required,
  SimpleForm,
  TextInput,
  useGetIdentity,
} from "react-admin";
import { Box, Grid } from "@mui/material";
import { useInputStyle } from "../global/DarkInputStyle";

const montantPrecisionValidator = (value) => {
  if (value == null || value === "") return undefined;
  const num = Number(value);
  if (!Number.isFinite(num)) return "Montant invalide";
  const abs = Math.abs(num);
  const [intPart, decPart = ""] = String(abs).split(".");
  if (intPart.length > 12 || decPart.length > 3) {
    return "Montant max: 12 chiffres avant virgule et 3 après (NUMERIC 15,3)";
  }
  return undefined;
};

export const MarcheCreate = () => {
  const { identity } = useGetIdentity();
  const inputStyle = useInputStyle();
  const fullWidthInput = { ...inputStyle, width: "100%" };
  const normalizePayload = (data) => ({
    ...data,
    createdBy: data.createdBy || identity?.username || null,
    codeAffaire:
      data?.codeAffaire && typeof data.codeAffaire === "object"
        ? data.codeAffaire.id
        : data.codeAffaire,
  });

  return (
    <Create transform={normalizePayload} redirect="list">
      <SimpleForm>
        <Box sx={{ width: "100%" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextInput
                source="createdBy"
                label="Créé par"
                defaultValue={identity?.username}
                sx={fullWidthInput}
                slotProps={{ input: { readOnly: true } }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextInput
                source="numero"
                label="N° Marché"
                validate={required()}
                sx={fullWidthInput}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <ReferenceInput source="codeAffaire" reference="Chantier" perPage={5000}>
                <AutocompleteInput
                  label="Chantier"
                  validate={required()}
                  optionValue="id"
                  filterToQuery={(searchText) => ({ q: searchText })}
                  optionText={(choice) =>
                    choice
                      ? `${choice.CODEAFFAIRE || ""} - ${choice.LIBELLE || ""}`
                      : ""
                  }
                  sx={fullWidthInput}
                />
              </ReferenceInput>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextInput
                source="client"
                label="Client"
                validate={required()}
                sx={fullWidthInput}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextInput source="partenaire" label="Partenaire" sx={fullWidthInput} />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextInput source="bailleur" label="Bailleur" sx={fullWidthInput} />
            </Grid>

            <Grid item xs={12} md={4}>
              <NumberInput
                source="montant"
                label="Montant"
                validate={[required(), montantPrecisionValidator]}
                sx={fullWidthInput}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <NumberInput source="tauxTva" label="Taux TVA" defaultValue={1.2} step={0.01} validate={required()} sx={fullWidthInput} />
            </Grid>
            <Grid item xs={12} md={4}>
              <NumberInput source="delai" label="Délai (mois)" sx={fullWidthInput} />
            </Grid>

            <Grid item xs={12} md={4}>
              <DateInput
                source="dateMES"
                label="Date mise en service"
                validate={required()}
                sx={fullWidthInput}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <DateInput
                source="dateRP"
                label="Date réception provisoire"
                sx={fullWidthInput}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <DateInput
                source="dateRD"
                label="Date réception définitive"
                sx={fullWidthInput}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <ReferenceInput source="natissementBankId" reference="ribatner" perPage={1000}>
                <AutocompleteInput optionText="nom" label="Banque natissement" sx={fullWidthInput} />
              </ReferenceInput>
            </Grid>

            <Grid item xs={12}>
              <TextInput source="objet" label="Objet" multiline rows={3} sx={fullWidthInput} />
            </Grid>
          </Grid>
        </Box>
      </SimpleForm>
    </Create>
  );
};
