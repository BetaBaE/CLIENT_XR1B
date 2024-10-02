// in src/Dashboard.js
import * as React from "react";
import Card from "@mui/material/Card";

import { Title } from "react-admin";
import { CardContent, CardHeader, Grid } from "@material-ui/core";
// import ChartOverDueInvoices from "./charts/ChartFaNotPayed";

import { useState } from "react";
import ChartFaNotPayed from "./charts/ChartFaNotPayed";
import TableSumFA from "./DataGrid/SumFaDataGrid";
import SituationFournisseur from "./DataGrid/SituationFournisseur";
import DetailFactureFournisseur from "./DataGrid/DetailFactureFournisseur";

export const SituationFn = () => {
  const [selectedId, setSelectedId] = useState(null);

  const handleRowClick = (id) => {
    setSelectedId(id); // Set the selected ID when a row is clicked
  };

  return (
    <Grid container spacing={2} justifyContent="space-around">
      <Title title="Echencier" />
      <Grid item xs={12} sm={6}>
        <Card>
          <CardHeader title="Factures: Avec et Sans Fiche Navette" />
          <CardContent>
            <ChartFaNotPayed />
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Card>
          <CardHeader title="FA sans FN: Total et Date" />
          <CardContent>
            <TableSumFA />
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Card>
          <CardHeader title="FA Sans FN par Fournisseur" />
          <CardContent>
            <SituationFournisseur onRowClick={handleRowClick} />
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Card>
          <CardHeader
            title={
              selectedId == null
                ? "click sur un fournisseur dans la table a gauche"
                : `Fournisseur : ${selectedId.split("|")[1]} `
            }
          />
          <CardContent>
            {selectedId == null ? (
              "click sur un fournisseur dans la table a gauche"
            ) : (
              <DetailFactureFournisseur id={selectedId} />
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
