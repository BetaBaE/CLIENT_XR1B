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
import FaSansFnByMonth from "./DataGrid/FaSansFnByMonth";
import { formatDateToFrench } from "../globalFunction";
import DetailFaSansFnByMonth from "./DataGrid/DetailFaSansFnByMonth";

export const SituationFn = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [selectedIdFAFN, setSelectedIdFAFN] = useState(null);

  const handleRowClick = (id) => {
    setSelectedId(id); // Set the selected ID when a row is clicked
  };
  const onRowClickFnCount = (id) => {
    setSelectedIdFAFN(id); // Set the selected ID when a row is clicked
  };

  return (
    <Grid container spacing={2} justifyContent="space-around">
      <Title title="Situation FN" />
      <Grid item xs={12} sm={3}>
        <Card>
          <CardHeader title="Factures: Avec et Sans Fiche Navette" />
          <CardContent>
            <ChartFaNotPayed />
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={4}>
        <Card>
          <CardHeader title="FA Sans FN par Fournisseur" />
          <CardContent>
            <SituationFournisseur onRowClick={handleRowClick} />
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={5}>
        {/* http://localhost:8080/countfafansfnBymonth */}
        <Card>
          <CardHeader title="FA Sans FN par Mois" />
          <CardContent>
            <FaSansFnByMonth onRowClickFnCount={onRowClickFnCount} />
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={3}>
        <Card>
          <CardHeader title="FA sans FN: Total et Date" />
          <CardContent>
            <TableSumFA />
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={4}>
        <Card>
          <CardHeader
            title={
              selectedId == null
                ? "Pressez une ligne dans la table en haut"
                : `Fournisseur : ${selectedId.split("|")[1]} `
            }
          />
          <CardContent>
            {selectedId == null ? (
              "Pressez une ligne dans la table en haut"
            ) : (
              <DetailFactureFournisseur id={selectedId} />
            )}
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={5}>
        <Card>
          <CardHeader
            title={
              selectedIdFAFN == null
                ? "Pressez une ligne dans la table en haut"
                : `Facture Sans FN du Mois ${formatDateToFrench(
                    selectedIdFAFN
                  )} `
            }
          />
          <CardContent>
            {selectedIdFAFN == null ? (
              "Pressez une ligne dans la table en haut"
            ) : (
              <DetailFaSansFnByMonth id={selectedIdFAFN} />
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};
