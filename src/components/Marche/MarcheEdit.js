import {
  AutocompleteInput,
  DateInput,
  Edit,
  Labeled,
  NumberInput,
  ReferenceInput,
  required,
  SaveButton,
  SelectInput,
  SimpleForm,
  TextField,
  TextInput,
  Toolbar,
  useGetIdentity,
  useRecordContext,
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

const statutChoices = [
  { id: "En cours", name: "En cours" },
  { id: "Réceptionné PV", name: "Réceptionné provisoire" },
  { id: "Réceptionné DF", name: "Réceptionné définitive" },
  { id: "Annulé", name: "Annulé" },
  { id: "Clôturé", name: "Clôturé" },
];

const NoDeleteToolbar = (props) => {
  const record = useRecordContext();
  const isAnnule = record?.statut === "Annulé";

  if (isAnnule) return null;

  return (
    <Toolbar {...props}>
      <SaveButton />
    </Toolbar>
  );
};

const MarcheEditFields = ({ updatedBy }) => {
  const record = useRecordContext();
  const isAnnule = record?.statut === "Annulé";
  const inputStyle = useInputStyle();
  const fullWidthInput = { ...inputStyle, width: "100%" };

  return (
    <Box sx={{ width: "100%" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <TextInput
            source="createdBy"
            label="Créé par"
            sx={fullWidthInput}
            slotProps={{ input: { readOnly: true } }}
            disabled
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <DateInput
            source="createdAt"
            label="Date création"
            sx={fullWidthInput}
            slotProps={{ input: { readOnly: true } }}
            disabled
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput
            source="updatedBy"
            label="Modifié par"
            defaultValue={updatedBy}
            sx={fullWidthInput}
            slotProps={{ input: { readOnly: true } }}
            disabled={isAnnule}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <DateInput
            source="updatedAt"
            label="Date modification"
            sx={fullWidthInput}
            slotProps={{ input: { readOnly: true } }}
            disabled
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput
            source="numero"
            label="N° Marché"
            validate={required()}
            sx={fullWidthInput}
            disabled={isAnnule}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput
            source="codeAffaire"
            label="ID Chantier"
            validate={required()}
            sx={fullWidthInput}
            slotProps={{ input: { readOnly: true } }}
            disabled={isAnnule}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Labeled label="Chantier">
            <TextField source="chantierLibelle" />
          </Labeled>
        </Grid>

        <Grid item xs={12} md={4}>
          <TextInput
            source="client"
            label="Client"
            validate={required()}
            sx={fullWidthInput}
            disabled={isAnnule}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput
            source="partenaire"
            label="Partenaire"
            sx={fullWidthInput}
            disabled={isAnnule}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput
            source="bailleur"
            label="Bailleur"
            sx={fullWidthInput}
            disabled={isAnnule}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <NumberInput
            source="montant"
            label="Montant"
            validate={[required(), montantPrecisionValidator]}
            sx={fullWidthInput}
            disabled={isAnnule}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <NumberInput
            source="tauxTva"
            label="Taux TVA"
            step={0.01}
            validate={required()}
            sx={fullWidthInput}
            disabled={isAnnule}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <NumberInput
            source="delai"
            label="Délai (mois)"
            sx={fullWidthInput}
            disabled={isAnnule}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <DateInput
            source="dateMES"
            label="Date mise en service"
            validate={required()}
            sx={fullWidthInput}
            disabled={isAnnule}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <DateInput
            source="dateRP"
            label="Date réception provisoire"
            sx={fullWidthInput}
            disabled={isAnnule}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <DateInput
            source="dateRD"
            label="Date réception définitive"
            sx={fullWidthInput}
            disabled={isAnnule}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <ReferenceInput source="natissementBankId" reference="ribatner" perPage={1000}>
            <AutocompleteInput
              optionText="nom"
              label="Banque natissement"
              sx={fullWidthInput}
              disabled={isAnnule}
            />
          </ReferenceInput>
        </Grid>

        <Grid item xs={12} md={4}>
          <SelectInput
            source="statut"
            label="Statut"
            choices={statutChoices}
            validate={required()}
            sx={fullWidthInput}
            disabled={isAnnule}
          />
        </Grid>

        <Grid item xs={12}>
          <TextInput
            source="objet"
            label="Objet"
            multiline
            rows={3}
            sx={fullWidthInput}
            disabled={isAnnule}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export const MarcheEdit = () => {
  const { identity } = useGetIdentity();
  const normalizePayload = (data) => ({
    ...data,
    updatedBy: identity?.username || data?.updatedBy || null,
    codeAffaire:
      data?.codeAffaire && typeof data.codeAffaire === "object"
        ? data.codeAffaire.id
        : data.codeAffaire,
  });

  return (
    <Edit actions={false} transform={normalizePayload}>
      <SimpleForm toolbar={<NoDeleteToolbar />}>
        <MarcheEditFields updatedBy={identity?.username} />
      </SimpleForm>
    </Edit>
  );
};
