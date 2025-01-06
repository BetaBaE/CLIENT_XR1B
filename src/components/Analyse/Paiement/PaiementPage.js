import { CardContent, CardHeader, Grid } from "@material-ui/core";
import Card from "@mui/material/Card";
import { Title } from "react-admin";
const PaiementPage = () => {
  return (
    <Grid container spacing={2} justifyContent="space-around">
      <Title title="ATNER Paiements" />
      <Grid item xs={12} sm={6}>
        <Card>
          <CardHeader title="###### #### #######" />
          <CardContent>{/* <ChartOverDueInvoices /> */}</CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Card>
          <CardHeader title="###### #### #######" />
          <CardContent>{/* <ChartOverDueInvoices /> */}</CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Card>
          <CardHeader title="###### #### #######" />
          <CardContent>{/* <ChartOverDueInvoices /> */}</CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Card>
          <CardHeader title="###### #### #######" />
          <CardContent>{/* <ChartOverDueInvoices /> */}</CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default PaiementPage;
