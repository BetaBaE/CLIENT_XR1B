// in src/Dashboard.js
import * as React from "react";
import Card from "@mui/material/Card";
import { Title } from "react-admin";
import { CardContent, CardHeader, Grid } from "@mui/material";
// import ChartOverDueInvoices from "./charts/ChartOverDueInvoices";

import SortableTable from "./DataGrid/FournisseurDataGrid";
import TableSumMensuel from "./DataGrid/SumMensuel";
import { useState } from "react";
import SumForMonth from "./DataGrid/SumForMonth";
import ChartOverDueInvoices from "./charts/ChartOverDueInvoices";
import DetailEffetEcheance from "./DataGrid/DetailEffetEcheance";
import { formatNumber } from "../globalFunction";

export const Echencier = () => {
  const [selectedId, setSelectedId] = useState(null);

  const [sommeEffet, setSommeEffet] = useState(0);

  const handleRowClick = (id) => {
    setSelectedId(id); // Set the selected ID when a row is clicked
  };

  return (
    <Grid container spacing={2} justifyContent="space-around">
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

      <Grid item xs={12} sm={6}>
        <Card>
          <CardHeader title="Factures Impayées : Fournisseurs vs. Chantiers" />
          <CardContent>
            <SortableTable />
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={4}>
        <Card>
          <CardHeader title="Résumé Mensuel des Factures" />
          <CardContent>
            <TableSumMensuel onRowClick={handleRowClick} />
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={3}>
        <Card>
          <CardHeader
            title={
              selectedId == null
                ? "click sur une date dans la table a gauche"
                : `Detail du mois : ${selectedId.split("-01T")[0]} `
            }
          />
          <CardContent>
            {selectedId == null ? (
              "click sur une date dans la table a gauche"
            ) : (
              <SumForMonth id={selectedId} />
            )}
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={5}>
        <Card>
          <CardHeader
            title={`Dates Échéance Effets : ${formatNumber(sommeEffet)}`}
          />
          <CardContent>
            <DetailEffetEcheance sommeEffet={setSommeEffet} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
