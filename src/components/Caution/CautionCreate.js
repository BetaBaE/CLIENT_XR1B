import {
  AutocompleteInput,
  Create,
  DateInput,
  NumberInput,
  ReferenceInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
} from "react-admin";
import { Box, Grid } from "@mui/material";
import { useInputStyle } from "../global/DarkInputStyle";

const natureChoices = [
  { id: "globale", name: "Globale" },
  { id: "specifique", name: "Spécifique" },
];

const typeChoices = ["CP", "CD", "CRG", "CRA", "CDIV", "CDEC"].map((value) => ({
  id: value,
  name: value,
}));

const origineChoices = [
  { id: "MIDELT", name: "MIDELT" },
  { id: "RABAT", name: "RABAT" },
];

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

const normalizePayload = (data) => ({
  ...data,
  idMarche: data?.idMarche && typeof data.idMarche === "object" ? data.idMarche.id : data.idMarche,
  banqueId: data?.banqueId && typeof data.banqueId === "object" ? data.banqueId.id : data.banqueId,
  idFournisseur:
    data?.idFournisseur && typeof data.idFournisseur === "object"
      ? data.idFournisseur.id
      : data.idFournisseur,
});

export const CautionCreate = () => {
  const inputStyle = useInputStyle();
  const fullWidthInput = { ...inputStyle, width: "100%" };

  return (
    <Create transform={normalizePayload} redirect="list">
      <SimpleForm>
        <Box sx={{ width: "100%" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextInput source="numero" label="N° caution" validate={required()} sx={fullWidthInput} />
            </Grid>
            <Grid item xs={12} md={4}>
              <SelectInput
                source="nature"
                label="Nature"
                choices={natureChoices}
                validate={required()}
                sx={fullWidthInput}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <SelectInput
                source="type"
                label="Type"
                choices={typeChoices}
                validate={required()}
                sx={fullWidthInput}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <SelectInput
                source="origine"
                label="Origine"
                choices={origineChoices}
                validate={required()}
                sx={fullWidthInput}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <ReferenceInput source="idMarche" reference="marche" perPage={5000}>
                <AutocompleteInput
                  label="Marché"
                  optionValue="id"
                  validate={required()}
                  filterToQuery={(searchText) => ({ numero: searchText })}
                  optionText={(choice) =>
                    choice
                      ? `${choice.numero || ""} - ${
                          choice.codeAffaireText || choice.codeAffaire || ""
                        }`
                      : ""
                  }
                  sx={fullWidthInput}
                />
              </ReferenceInput>
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
              <ReferenceInput source="banqueId" reference="ribatner" perPage={1000}>
                <AutocompleteInput
                  optionText="nom"
                  label="Banque"
                  filterToQuery={(searchText) => ({ nom: searchText })}
                  sx={fullWidthInput}
                />
              </ReferenceInput>
            </Grid>
            <Grid item xs={12} md={4}>
              <ReferenceInput source="idFournisseur" reference="fournisseurs" perPage={5000}>
                <AutocompleteInput
                  label="Fournisseur"
                  filterToQuery={(searchText) => ({ q: searchText })}
                  optionText={(choice) =>
                    choice
                      ? `${choice.CodeFournisseur || choice.codeFournisseur || ""} - ${
                          choice.nom || ""
                        }`
                      : ""
                  }
                  sx={fullWidthInput}
                />
              </ReferenceInput>
            </Grid>
            <Grid item xs={12} md={4}>
              <TextInput source="numeroDossier" label="N° dossier" sx={fullWidthInput} />
            </Grid>

            <Grid item xs={12} md={4}>
              <DateInput source="dateDelivrance" label="Date délivrance" sx={fullWidthInput} />
            </Grid>
            <Grid item xs={12} md={4}>
              <DateInput source="dateEcheance" label="Date échéance" sx={fullWidthInput} />
            </Grid>
            <Grid item xs={12} md={4}>
              <NumberInput source="taux" label="Taux" step={0.01} sx={fullWidthInput} />
            </Grid>
          </Grid>
        </Box>
      </SimpleForm>
    </Create>
  );
};
