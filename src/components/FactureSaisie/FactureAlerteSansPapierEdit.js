import {
  BooleanInput,
  DateInput,
  Edit,
  NumberInput,
  SaveButton,
  SimpleForm,
  TextInput,
  Toolbar,
} from "react-admin";
import { Grid } from "@mui/material";
import { useFormContext } from "react-hook-form";
import Swal from "sweetalert2";
import { useInputStyleFilters } from "../global/DarkInputStyle";

const AlertEditToolbar = (props) => (
  <Toolbar {...props}>
    <SaveButton />
  </Toolbar>
);

const PapierRecuSwitch = () => {
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
      text: "En activant ce switch, cette action est irreversible. Merci de lire les informations de la facture lentement et attentivement avant de cliquer sur Oui.",
      showCancelButton: true,
      confirmButtonText: "Oui",
      cancelButtonText: "Annuler",
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
      label="Papier de la facture recu"
      sx={useInputStyleFilters}
      onChange={handlePapierRecuChange}
    />
  );
};

export const FactureAlerteSansPapierEdit = () => {
  return (
    <Edit>
      <SimpleForm toolbar={<AlertEditToolbar />}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={4}>
            <TextInput
              source="numeroFacture"
              label="Facture N"
              sx={useInputStyleFilters}
              slotProps={{ input: { readOnly: true } }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <DateInput
              source="DateFacture"
              label="Date Facture"
              sx={useInputStyleFilters}
              slotProps={{ input: { readOnly: true } }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextInput
              source="nom"
              label="Fournisseur"
              sx={useInputStyleFilters}
              slotProps={{ input: { readOnly: true } }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <NumberInput
              source="HT"
              label="HT"
              sx={useInputStyleFilters}
              slotProps={{ input: { readOnly: true } }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <NumberInput
              source="MontantTVA"
              label="TVA"
              sx={useInputStyleFilters}
              slotProps={{ input: { readOnly: true } }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <NumberInput
              source="TTC"
              label="TTC"
              sx={useInputStyleFilters}
              slotProps={{ input: { readOnly: true } }}
            />
          </Grid>
          <Grid item xs={12}>
            <PapierRecuSwitch />
          </Grid>
        </Grid>
      </SimpleForm>
    </Edit>
  );
};
