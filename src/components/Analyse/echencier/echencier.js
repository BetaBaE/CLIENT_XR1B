// in src/Dashboard.js
import * as React from "react";
import Card from "@mui/material/Card";

import { Title } from "react-admin";
import { CardContent, CardHeader, Grid } from "@material-ui/core";
import ChartOverDueInvoices from "./charts/ChartOverDueInvoices";

import SortableTable from "./DataGrid/FournisseurDataGrid";

export const Echencier = () => (
  <Grid container spacing={4} justifyContent="space-around">
    <Title title="Echencier" />

    {/* First Row with Chart */}
    <Grid item xs={12} sm={6}>
      <Card>
        <CardHeader title="Analyse des Factures Échues" />
        <CardContent>
          <ChartOverDueInvoices />
        </CardContent>
      </Card>
    </Grid>

    <Grid item xs={12} sm={6} container direction="column" spacing={2}>
      <Grid item>
        <Card>
          <CardHeader title="Factures Impayées : Fournisseurs vs. Chantiers" />
          <CardContent>
            <SortableTable />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </Grid>
);
