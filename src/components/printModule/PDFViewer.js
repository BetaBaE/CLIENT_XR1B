import Card from "@mui/material/Card";
import {
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Tooltip,
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { useRef } from "react";
import { useTheme } from "@mui/material/styles";

const PdfViewer = ({ base64, title, fileName }) => {
  const pdfDataUrl = `data:application/pdf;base64,${base64}#toolbar=0`;
  const iframeRef = useRef(null);
  const theme = useTheme();
  const handleDownload = () => {
    if (!base64) return;

    fetch(pdfDataUrl)
      .then((res) => res.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = fileName || "document.pdf";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      });
  };

  return (
    <Grid item xs={12} sm={8}>
      <Card>
        <CardHeader
          title={
            title
              ? `Le document ${title} est prêt`
              : fileName
              ? `Fichier: ${fileName}`
              : " "
          }
          action={
            base64 && (
              <div>
                <Tooltip title="Télécharger">
                  <IconButton
                    onClick={handleDownload}
                    color="primary"
                    sx={{ m: 0.5 }}
                  >
                    <DownloadIcon />
                  </IconButton>
                </Tooltip>
              </div>
            )
          }
        />
        <CardContent>
          {base64 ? (
            <iframe
              ref={iframeRef}
              src={pdfDataUrl}
              width="100%"
              height="550px"
              title={title || fileName || "Document PDF"}
              style={{ border: "none" }}
            />
          ) : (
            // Inside your component:

            // Then update your div to:
            <div
              style={{
                height: 550,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: theme.palette.text.secondary,
                backgroundColor: theme.palette.background.default,
              }}
            >
              Aucun document sélectionné
            </div>
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default PdfViewer;
