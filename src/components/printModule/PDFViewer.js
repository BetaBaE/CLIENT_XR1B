import Card from "@mui/material/Card";
import { CardContent, CardHeader, Grid } from "@material-ui/core";

const PdfViewer = ({ base64, title }) => {
  // Create a Data URL from the Base64 string
  const pdfDataUrl = `data:application/pdf;base64,${base64}`;

  return (
    <Grid item xs={12} sm={8}>
      <Card>
        <CardHeader
          title={
            title //Le document : OV378-06-12-2024 est prêt.
              ? `Le document ${title} est prêt`
              : "Merci de selection le document"
          }
        />
        <CardContent>
          {base64 ? (
            <iframe
              toolbar="0"
              src={pdfDataUrl}
              width="100%"
              zoom="129%"
              height="550px"
              title={
                title
                  ? `Le document ${title} est prêt`
                  : "Merci de selection le document"
              }
              style={{ border: "none" }}
            />
          ) : (
            ""
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default PdfViewer;
