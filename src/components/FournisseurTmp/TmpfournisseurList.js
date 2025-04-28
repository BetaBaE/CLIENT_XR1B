import {
  CreateButton,
  Datagrid,
  DateField,
  List,
  TextField,
} from "react-admin";
import { Typography, Grid } from "@mui/material";

const Empty = () => (
  <Grid container spacing={2} marginTop={5} direction="row" alignItems="center">
    <Grid container spacing={2} direction="column" alignItems="center">
      <Typography variant="h4" paragraph>
        Liste Vide
      </Typography>
      <Typography variant="h6">
        Cliquer ci-dessous pour ajouter un nouveau
      </Typography>
      <CreateButton label="Ajouter" />
    </Grid>
  </Grid>
);

export const TmpfournisseurList = () => {
  return (
    <List empty={<Empty />} title="Fournisseur Achat">
      <Datagrid bulkActionButtons={false} rowClick="edit">
        <TextField source="nom" />
        <TextField source="Redacteur" />
        <TextField source="Validateur" />
        <DateField showTime={true} source="dateCreation" />
        <DateField showTime={true} source="dateValidation" />
        <TextField source="catFournisseur" />
        <TextField source="etat" />
      </Datagrid>
    </List>
  );
};
