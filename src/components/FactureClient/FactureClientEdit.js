import {
  DateInput,
  Edit,
  NumberInput,
  SaveButton,
  SelectInput,
  SimpleForm,
  TextInput,
  Toolbar,
  required,
  useRedirect,
  useRecordContext,
} from "react-admin";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useEffect, useMemo, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import Swal from "sweetalert2";
import apiUrl from "../../config";
import { useInputStyle } from "../global/DarkInputStyle";
import { formatNumber } from "../Analyse/globalFunction";

const toNumber = (value, defaultValue = 0) => {
  if (value == null || value === "") return defaultValue;
  const num = Number(value);
  return Number.isFinite(num) ? num : defaultValue;
};

const round3 = (value) => Math.round((Number(value) + Number.EPSILON) * 1000) / 1000;

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

const fetchWithAuth = async (url) => {
  const response = await fetch(url, { credentials: "include" });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  return response.json();
};

const SummaryLine = ({
  label,
  value,
  strong = false,
  highlight = false,
  valueColor = "text.primary",
}) => (
  <Box sx={{ display: "flex", justifyContent: "space-between", py: 0.5 }}>
    <Typography fontWeight={strong ? 700 : 400}>{label}</Typography>
    <Typography
      fontWeight={strong ? 700 : 500}
      color={highlight ? "primary.main" : valueColor}
      sx={highlight ? { fontSize: "1.1rem" } : undefined}
    >
      {formatNumber(Number(value || 0))}
    </Typography>
  </Box>
);

const SaveOnlyToolbar = (props) => {
  const record = useRecordContext();
  if (!record) return null;
  if (record.etat === "annulee") return null;
  return (
    <Toolbar {...props}>
      <SaveButton />
    </Toolbar>
  );
};

const FactureClientEditFields = ({ summaryPaperSx }) => {
  const record = useRecordContext();
  const { control, setValue } = useFormContext();
  const formData = useWatch({ control });
  const inputStyle = useInputStyle();
  const fullWidthInput = { ...inputStyle, width: "100%" };
  const isAnnulee = record?.etat === "annulee";

  const [marcheTaux, setMarcheTaux] = useState(0);
  const [cautions, setCautions] = useState([]);

  const idMarche = record?.idMarche ?? null;
  const idCautionRG =
    formData?.idCautionRG && typeof formData.idCautionRG === "object"
      ? formData.idCautionRG.id
      : formData?.idCautionRG;

  useEffect(() => {
    const loadMarche = async () => {
      if (!idMarche) {
        setMarcheTaux(0);
        return;
      }
      try {
        const marche = await fetchWithAuth(`${apiUrl}/marche/${idMarche}`);
        setMarcheTaux(toNumber(marche?.tauxTva, 0));
      } catch (error) {
        setMarcheTaux(0);
      }
    };
    loadMarche();
  }, [idMarche]);

  useEffect(() => {
    const loadCautions = async () => {
      if (!idMarche) {
        setCautions([]);
        return;
      }
      const currentFactureId = record?.id ? `?currentFactureId=${record.id}` : "";
      try {
        const data = await fetchWithAuth(
          `${apiUrl}/factureclient/cautions-disponibles/${idMarche}${currentFactureId}`
        );
        setCautions(Array.isArray(data) ? data : []);
      } catch (error) {
        setCautions([]);
      }
    };
    loadCautions();
  }, [idMarche, record?.id]);

  const calculations = useMemo(() => {
    const HT = round3(toNumber(formData?.HT));
    const RestitAccompte = round3(toNumber(formData?.RestitAccompte));
    const retenueGarantie1 = round3(toNumber(formData?.retenueGarantie1));
    const retenueGarantie2 = round3(toNumber(formData?.retenueGarantie2));
    const Penalite = round3(toNumber(formData?.Penalite));
    const Approvisionnement = round3(toNumber(formData?.Approvisionnement));
    const revPrix = round3(toNumber(formData?.revPrix));

    const TTC = round3(HT * toNumber(marcheTaux, 0));
    const Tva = round3(TTC - HT);

    const selectedCaution = cautions.find((item) => Number(item.id) === Number(idCautionRG));
    const CautionRG = round3(toNumber(selectedCaution?.montant));

    const netTTC = round3(
      TTC -
        RestitAccompte -
        retenueGarantie1 -
        retenueGarantie2 -
        Penalite -
        Approvisionnement +
        CautionRG +
        revPrix
    );

    return {
      HT,
      Tva,
      TTC,
      RestitAccompte,
      retenueGarantie1,
      retenueGarantie2,
      Penalite,
      Approvisionnement,
      CautionRG,
      revPrix,
      netTTC,
    };
  }, [formData, marcheTaux, cautions, idCautionRG]);

  const cautionChoices = cautions.map((item) => ({
    id: item.id,
    name: `${item.numero} | ${Number(item.montant || 0).toFixed(3)}`,
  }));
  const tvaLabel = idMarche
    ? `${(toNumber(marcheTaux, 0) * 100 - 100).toFixed(0)}%`
    : "--";
  const handleEtatChange = async (value, event) => {
    const nextValue =
      (typeof value === "string" ? value : null) ||
      value?.target?.value ||
      event?.target?.value ||
      "saisie";
    if (nextValue !== "annulee") {
      setValue("etat", nextValue, { shouldDirty: true });
      return;
    }
    const result = await Swal.fire({
      title: "Confirmation",
      text: "Êtes-vous sûr de vouloir annuler cette facture ? Cette action est irréversible.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Oui, annuler",
      cancelButtonText: "Non",
    });
    if (result.isConfirmed) {
      setValue("etat", "annulee", { shouldDirty: true, shouldValidate: true });
      await Swal.fire({
        icon: "info",
        title: "Etat mis à jour",
        text: "Cliquez sur Enregistrer pour confirmer l'annulation.",
        timer: 2500,
        showConfirmButton: false,
      });
    } else {
      setValue("etat", "saisie", { shouldDirty: true });
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <TextInput source="createdBy" label="Créé par" sx={fullWidthInput} disabled />
        </Grid>
        <Grid item xs={12} md={4}>
          <DateInput source="createdAt" label="Date création" sx={fullWidthInput} disabled />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput source="updatedBy" label="Modifié par" sx={fullWidthInput} disabled />
        </Grid>

        <Grid item xs={12} md={4}>
          <DateInput source="updatedAt" label="Date modification" sx={fullWidthInput} disabled />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput
            source="marcheNumero"
            label="Marché"
            sx={fullWidthInput}
            disabled
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <TextInput
            source="numeroFacture"
            label="N° facture"
            validate={required()}
            sx={fullWidthInput}
            disabled={isAnnulee}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <DateInput
            source="dateFacture"
            label="Date facture"
            validate={required()}
            sx={fullWidthInput}
            disabled={isAnnulee}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <NumberInput
            source="HT"
            label="HT"
            validate={[required(), montantPrecisionValidator]}
            sx={fullWidthInput}
            disabled={isAnnulee}
          />
          <Typography variant="body2" sx={{ mt: 0.5 }}>
            TVA : {tvaLabel}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <NumberInput
            source="RestitAccompte"
            label="Restit. Acompte"
            defaultValue={0}
            validate={montantPrecisionValidator}
            sx={fullWidthInput}
            disabled={isAnnulee}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <NumberInput
            source="retenueGarantie1"
            label="Retenue Garantie 1"
            defaultValue={0}
            validate={montantPrecisionValidator}
            sx={fullWidthInput}
            disabled={isAnnulee}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <NumberInput
            source="retenueGarantie2"
            label="Retenue Garantie 2"
            defaultValue={0}
            validate={montantPrecisionValidator}
            sx={fullWidthInput}
            disabled={isAnnulee}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <SelectInput
            source="idCautionRG"
            label="Caution RG (CRG)"
            choices={cautionChoices}
            emptyText="Aucune"
            sx={fullWidthInput}
            disabled={isAnnulee}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <NumberInput
            source="Penalite"
            label="Pénalité"
            defaultValue={0}
            validate={montantPrecisionValidator}
            sx={fullWidthInput}
            disabled={isAnnulee}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <NumberInput
            source="Approvisionnement"
            label="Approvisionnement"
            defaultValue={0}
            validate={montantPrecisionValidator}
            sx={fullWidthInput}
            disabled={isAnnulee}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <NumberInput
            source="revPrix"
            label="Rev. prix"
            defaultValue={0}
            validate={montantPrecisionValidator}
            sx={fullWidthInput}
            disabled={isAnnulee}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <SelectInput
            source="etat"
            label="Etat"
            validate={required()}
            choices={[
              { id: "saisie", name: "saisie" },
              { id: "annulee", name: "annulee" },
            ]}
            sx={fullWidthInput}
            onChange={handleEtatChange}
            disabled={isAnnulee}
          />
        </Grid>
      </Grid>

      <Paper elevation={2} sx={{ p: 2, mt: 2, ...summaryPaperSx }}>
        <SummaryLine label="HT" value={calculations.HT} />
        <SummaryLine label="TVA (from marché)" value={calculations.Tva} />
        <SummaryLine label="TTC" value={calculations.TTC} />
        <SummaryLine label="- Restit. Acompte" value={calculations.RestitAccompte} />
        <SummaryLine label="- Retenue Garantie 1" value={calculations.retenueGarantie1} />
        <SummaryLine label="- Retenue Garantie 2" value={calculations.retenueGarantie2} />
        <SummaryLine label="- Pénalité" value={calculations.Penalite} />
        <SummaryLine label="- Approvisionnement" value={calculations.Approvisionnement} />
        <SummaryLine label="+ Caution RG" value={calculations.CautionRG} />
        <SummaryLine
          label="+/- Révision de Prix"
          value={calculations.revPrix}
          valueColor={
            calculations.revPrix < 0
              ? "error.main"
              : calculations.revPrix > 0
              ? "success.main"
              : "text.primary"
          }
        />
        <SummaryLine label="= Net TTC" value={calculations.netTTC} strong highlight />
      </Paper>
    </Box>
  );
};

export const FactureClientEdit = () => {
  const redirect = useRedirect();
  const theme = useTheme();

  const normalizePayload = (data) => ({
    ...data,
    idCautionRG:
      data?.idCautionRG && typeof data.idCautionRG === "object"
        ? data.idCautionRG.id
        : data.idCautionRG,
    HT: toNumber(data?.HT),
    RestitAccompte: toNumber(data?.RestitAccompte),
    retenueGarantie1: toNumber(data?.retenueGarantie1),
    retenueGarantie2: toNumber(data?.retenueGarantie2),
    Penalite: toNumber(data?.Penalite),
    Approvisionnement: toNumber(data?.Approvisionnement),
    revPrix: toNumber(data?.revPrix),
  });

  return (
    <Edit
      actions={false}
      mutationMode="pessimistic"
      transform={normalizePayload}
      mutationOptions={{
        onSuccess: () => {
          Swal.fire({
            icon: "success",
            title: "Succès",
            text: "Facture client modifiée avec succès",
          });
          redirect("list", "factureclient");
        },
        onError: (error) => {
          Swal.fire({
            icon: "error",
            title: "Erreur",
            text: error?.message || "Erreur lors de la modification",
          });
        },
      }}
    >
      <SimpleForm toolbar={<SaveOnlyToolbar />}>
        <FactureClientEditFields summaryPaperSx={{ bgcolor: theme.palette.background.paper }} />
      </SimpleForm>
    </Edit>
  );
};
