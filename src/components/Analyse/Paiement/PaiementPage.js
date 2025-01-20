import { CardContent, CardHeader, Grid } from "@material-ui/core";
import Card from "@mui/material/Card";
import { Title } from "react-admin";
import PaimentByMonth from "./chart/PaiemenetByMonth";
import PaiementByMonthGrid from "./dataGrid/PaiementByMonthGrid";
import { useState } from "react";
import MonthDetailFournisseur from "./dataGrid/MonthDetailFournisseur";
import MonthDetailBank from "./dataGrid/MonthDetailBank";
const PaiementPage = () => {
  const [selectedId, setSelectedId] = useState(null);
  const handleRowClick = (id) => {
    setSelectedId(id); // Set the selected ID when a row is clicked
  };

  function formatDateToFrench(dateString) {
    // Create a Date object from the input string
    const date = new Date(dateString);

    // Options for formatting in French
    const options = { year: "numeric", month: "long" };

    // Format the date to "décembre 2024"
    return date.toLocaleString("fr-FR", options);
  }
  return (
    <Grid container spacing={2} justifyContent="space-around">
      <Title title="ATNER Paiements" />
      <Grid item xs={12} sm={6}>
        <Card>
          <CardHeader title="graphique : Évolution Mensuelle des Paiements" />
          <CardContent>
            <PaimentByMonth />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Card>
          <CardHeader title="tableau : Évolution Mensuelle des Paiements" />
          <CardContent>
            <PaiementByMonthGrid onRowClick={handleRowClick} />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Card>
          {/* Les paiements fournisseurs pour le mois 2024-12. */}

          <CardHeader
            title={
              selectedId == null ? (
                "Sélectionnez une date dans la table supérieure"
              ) : (
                <span
                  dangerouslySetInnerHTML={{
                    __html: `Les paiements des fournisseurs pour <strong>${formatDateToFrench(
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
      <Grid item xs={12} sm={6}>
        <Card>
          {/* Paiements par banque pour le mois de décembre 2024 */}
          <CardHeader
            title={
              selectedId == null ? (
                "Sélectionnez une date dans la table supérieure"
              ) : (
                <span
                  dangerouslySetInnerHTML={{
                    __html: `Paiements par banque pour le mois de <strong>${formatDateToFrench(
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
