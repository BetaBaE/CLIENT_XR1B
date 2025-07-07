import {
  Edit,
  NumberInput,
  SaveButton,
  SimpleForm,
  TextInput,
  Toolbar,
  useRecordContext,
} from "react-admin";
import { useInputStyleFilters } from "../global/DarkInputStyle";
import { Alert, Grid } from "@mui/material";

const CustomToolbar = (props) => (
  <Toolbar {...props}>
    <SaveButton />
  </Toolbar>
);

export const TransfersitemEdit = () => {
  return (
    <Edit>
      <TransfersitemEditForm />
    </Edit>
  );
};

const TransfersitemEditForm = () => {
  const record = useRecordContext();
  const isEditable = record?.Status === "Saisie";
  console.log("Status :", record?.Status);
  const getLabel = (key) => {
    switch (key) {
      case "fullname":
        return "Bénéficiaire Nom Complet";
      case "IdentityNumber":
        return "N° carte d'identité";
      case "Amount":
        return "Montant";
      case "TransferReference":
        return "Référence de transfert";
      case "Reference":
        return "Référence de masse";
      case "Status":
        return "Statut";
      default:
        return key;
    }
  };
  if (!isEditable && record?.Status !== undefined) {
    return (
      <SimpleForm toolbar={false}>
        <Alert severity="info">
          <strong>Information :</strong> Vous ne pouvez pas modifier cet
          Enregistrement.
          <br />
          En raison de son statut <strong>{record.Status}</strong>.
        </Alert>
        <Grid container spacing={2}>
          {Object.entries(record)
            .filter(([key]) => key !== "id")
            .map(([key, value]) => (
              <Grid item xs={12} sm={6} key={key}>
                <TextInput
                  label={getLabel(key)}
                  sx={useInputStyleFilters}
                  source={key}
                  disabled
                />
              </Grid>
            ))}
        </Grid>
      </SimpleForm>
    );
  }

  return (
    <SimpleForm toolbar={<CustomToolbar />}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextInput
            source="fullname"
            label="Bénéficiaire Nom Complet"
            sx={useInputStyleFilters}
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextInput
            label="N° carte d'identité"
            source="IdentityNumber"
            sx={useInputStyleFilters}
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <NumberInput
            label="Montant"
            source="Amount"
            sx={useInputStyleFilters}
            readOnly={!isEditable}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextInput
            label="Référence de transfert"
            source="TransferReference"
            sx={useInputStyleFilters}
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextInput
            label="Référence de masse"
            source="Reference"
            sx={useInputStyleFilters}
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextInput
            label="Statut"
            source="Status"
            sx={useInputStyleFilters}
            slotProps={{
              input: {
                readOnly: true,
              },
            }}
          />
        </Grid>
      </Grid>
    </SimpleForm>
  );
};
