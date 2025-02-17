import { CardContent, CardHeader, Grid } from "@material-ui/core";
import Card from "@mui/material/Card";
import { Title } from "react-admin";
import PaimentByMonth from "./chart/PaiemenetByMonth";
import PaiementByMonthGrid from "./dataGrid/PaiementByMonthGrid";
import { useState } from "react";
import MonthDetailFournisseur from "./dataGrid/MonthDetailFournisseur";
import MonthDetailBank from "./dataGrid/MonthDetailBank";
import DetailCheque from "./dataGrid/DetailCheque";
import { formatDateToFrench, formatNumber } from "../globalFunction";
const PaiementPage = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [sommeEffet, setSommeEffet] = useState(0);
  const handleRowClick = (id) => {
    setSelectedId(id); // Set the selected ID when a row is clicked
  };

  // function formatDateToFrench(dateString) {
  //   // Create a Date object from the input string
  //   const date = new Date(dateString);

  //   // Options for formatting in French
  //   const options = { year: "numeric", month: "long" };

  //   // Format the date to "décembre 2024"
  //   return date.toLocaleString("fr-FR", options);
  // }
  return (
    <Grid container spacing={2} justifyContent="space-around">
      <Title title="ATNER Paiements" />
      <Grid item xs={12} sm={7}>
        <Card>
          <CardHeader title="Graphe : Évolution Mensuelle des Paiements" />
          <CardContent>
            <PaimentByMonth />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={5}>
        <Card>
          <CardHeader
            title={`Situation des cheques en cours : ${formatNumber(
              sommeEffet
            )}`}
          />
          <CardContent>
            <DetailCheque sommeCheque={setSommeEffet} />
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={4}>
        <Card>
          {/* Les paiements fournisseurs pour le mois 2024-12. */}

          <CardHeader
            title={
              selectedId == null ? (
                "Cliquez sur une date dans la table située au milieu"
              ) : (
                <span
                  dangerouslySetInnerHTML={{
                    __html: `Règlements fournisseurs <strong>${formatDateToFrench(
                      selectedId
                    )}</strong>`,
                  }}
                />
              )
            }
          />
          <CardContent>
            {selectedId == null ? (
              "..."
            ) : (
              <MonthDetailFournisseur id={selectedId} />
            )}
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Card>
          <CardHeader title="Évolution Mensuelle des Paiements" />
          <CardContent>
            <PaiementByMonthGrid onRowClick={handleRowClick} />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Card>
          {/* Paiements par banque pour le mois de décembre 2024 */}
          <CardHeader
            title={
              selectedId == null ? (
                "Cliquez sur une date dans la table située au milieu"
              ) : (
                <span
                  dangerouslySetInnerHTML={{
                    __html: `Opérations bancaires pour <strong>${formatDateToFrench(
                      selectedId
                    )}</strong>`,
                  }}
                />
              )
            }
          />
          <CardContent>
            {selectedId == null ? "..." : <MonthDetailBank id={selectedId} />}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default PaiementPage;
