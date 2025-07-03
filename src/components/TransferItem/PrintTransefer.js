import { useEffect, useState } from "react";
import PdfViewer from "../printModule/PDFViewer";
import apiUrl from "../../config";
import Swal from "sweetalert2";
import { Title } from "react-admin";
import { Box, Card, CardContent, CardHeader, Grid } from "@mui/material";

const PrintTransfer = () => {
  const [transfers, setTransfers] = useState([
    {
      id: "null",
      ribAtner: 0,
      datecreation: "",
      etat: "",
    },
  ]);

  const [selctov, setSelctov] = useState();
  const [buffredPdf, setBuffredPdf] = useState();
  const [pdfTitle, setPdfTitle] = useState("");

  useEffect(() => {
    fetch(`${apiUrl}/transfers`)
      .then((response) => response.json())
      .then((json) => setTransfers(json));
  }, []);

  const showLoadingPdf = (json) => {
    // let jsonPath = "file:" + json.path.replaceAll("\\", "/");
    Swal.fire({
      title: "Pdf est prêt",
      // html: `${jsonPath}`,
      icon: "success",
      allowOutsideClick: false,
      allowEscapeKey: false,
    });
  };

  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      documentstifyContent="space-around"
    >
      <Title title="Impression des Transferts (MAD MASS)" />
      <Grid item xs={12} sm={4}></Grid>

      <Grid item xs={12} sm={4} sx={{ marginTop: 2 }}>
        <Card>
          <CardHeader title="Imprimer : Transfert (MAD MASS)" />
          <CardContent>
            <form>
              <Box
                component="span"
                display="flex"
                justifyContent="center"
                flexDirection="row"
                m={1}
              >
                <select
                  className="select-css"
                  id="sl1"
                  required
                  onChange={(e) => {
                    setSelctov(e.target.value);
                  }}
                >
                  <option disabled selected value="">
                    choisir un Mass
                  </option>
                  {transfers.map((order, index) => (
                    <option key={index} value={order.id}>
                      {`${order.Reference} - ${order.BeneficiaryCount} - ${order.TotalAmount} MAD `}
                    </option>
                  ))}
                </select>
                <div className="button-container">
                  <button
                    className="button-6"
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();

                      if (selctov) {
                        Swal.fire({
                          title: "Préparation du pdf en cours",
                          html: "Merci de patienter",
                          allowOutsideClick: false,
                          allowEscapeKey: false,
                          timer: 600000,
                          timerProgressBar: true,
                          didOpen: () => {
                            Swal.showLoading();
                          },
                        }).then((result) => {
                          if (result.dismiss === Swal.DismissReason.timer) {
                            Swal.fire({
                              icon: "error",
                              title: "Oops...",
                              text: "Quelque chose s'est mal passé!",
                              allowOutsideClick: false,
                              allowEscapeKey: false,
                            });
                          }
                        });

                        // First: PDF fetch
                        fetch(`${apiUrl}/transfers/${selctov}/generate-pdf`)
                          .then((response) => {
                            if (!response.ok) {
                              throw new Error("Réponse réseau non valide");
                            }
                            return response.json();
                          })
                          .then((json) => {
                            showLoadingPdf(json);
                            setBuffredPdf(json.base64);
                            setPdfTitle(json.title);

                            // Reset select
                            const selectElement =
                              document.getElementById("sl1");
                            selectElement.selectedIndex = 0;
                            setSelctov(null);

                            // Now fetch the text file
                            return fetch(
                              `${apiUrl}/transfers/${selctov}/generate`
                            );
                          })
                          .then((response) => {
                            if (!response.ok) {
                              throw new Error(
                                "Erreur lors de la récupération du fichier texte"
                              );
                            }
                            return response.text();
                          })
                          .then((textData) => {
                            // Create a download link for the text file
                            const blob = new Blob([textData], {
                              type: "text/plain",
                            });
                            const url = URL.createObjectURL(blob);
                            const link = document.createElement("a");
                            link.href = url;
                            link.download = "textfile.txt";
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                            URL.revokeObjectURL(url);
                          })
                          .catch((error) => {
                            console.error(
                              "Erreur lors de la requête fetch :",
                              error
                            );
                            Swal.fire({
                              icon: "error",
                              title: "Erreur",
                              text: "Une erreur s'est produite lors de la récupération des données.",
                              allowOutsideClick: false,
                              allowEscapeKey: false,
                            });
                          });
                      } else {
                        Swal.fire({
                          icon: "error",
                          title: "Error",
                          text: "Veuillez choisir un Mass à imprimer",
                          allowOutsideClick: false,
                          allowEscapeKey: false,
                        });
                      }
                    }}
                  >
                    Envoyer
                  </button>
                </div>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={4}></Grid>
      <PdfViewer base64={buffredPdf} title={pdfTitle} />
    </Grid>
  );
};

export default PrintTransfer;
