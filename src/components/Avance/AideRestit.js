import { CardContent, Grid } from "@material-ui/core";
import Card from "@mui/material/Card";
import RestitFactureMontantExcte from "./DataGridAideRestit/RestitFactureMontantExcte";
import MontantAvanceAndFactureByFournisseur from "./DataGridAideRestit/MontantAvanceAndFactureByFournisseur";
import MontantAvanceNonRestitueByFournisseur from "./DataGridAideRestit/MontantAvanceNonRestitueByFournisseur";

const AideRestit = () => {
  return (
    <Grid container spacing={2} justifyContent="space-around">
      <Grid item xs={12} sm={5}>
        <Card>
          {/* <CardHeader title="Title 1" /> */}
          <CardContent>
            <RestitFactureMontantExcte />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={4}>
        <Card>
          <CardContent>
            <MontantAvanceAndFactureByFournisseur />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={3}>
        <Card>
          {/* <CardHeader title="Title 3" /> */}
          <CardContent>
            <MontantAvanceNonRestitueByFournisseur />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default AideRestit;
