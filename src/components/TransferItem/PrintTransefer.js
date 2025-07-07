import { useEffect, useState } from "react";
import PdfViewer from "../printModule/PDFViewer";
import apiUrl from "../../config";
import Swal from "sweetalert2";
import { Title } from "react-admin";
import { Box, Card, CardContent, CardHeader, Grid } from "@mui/material";
const formatNumber = (num) => {
  // Handle undefined/null/empty cases
  if (num === undefined || num === null || num === "") return "0.00";

  // Convert to number
  const number = Number(num);
  if (isNaN(number)) return "0.00";

  // Format with spaces as thousand separators and 2 decimal places
  return number.toLocaleString("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    useGrouping: true, // This enables thousand separators
  });
};

/**
 * Pad a string with spaces to the left or right.
 *
 * @param {str} str - The original string.
 * @param {numSpaces} numSpaces - The number of spaces to add.
 * @param {'l'|'r'} side - 'l' for left, 'r' for right.
 * @returns {string} - The padded string.
 */
function padString(str, numSpaces, side) {
  const stringValue = String(str).trim();
  const spacesToAdd = Math.max(0, numSpaces - stringValue.length);
  const spaces = "\u00A0".repeat(spacesToAdd); // non-breaking space

  if (side === "l") {
    return spaces + stringValue;
  } else if (side === "r") {
    return stringValue + spaces;
  } else {
    throw new Error("Invalid side value. Use 'l' for left or 'r' for right.");
  }
}

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
    fetch(`${apiUrl}/transfersprint`)
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
      <Title title="Impression des Transferts (MAD MASSE)" />
      <Grid item xs={12} sm={3}></Grid>

      <Grid item xs={12} sm={6} sx={{ marginTop: 2 }}>
        <Card>
          <CardHeader title="Imprimer : Transfert (MAD MASSE)" />
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
                    choisir un Masse
                  </option>
                  {transfers.map((order, index) => (
                    <option key={index} value={order.id}>
                      {`${padString(order.Reference, 20, "r")} | ${padString(
                        String(order.BeneficiaryCount).trim(),
                        5,
                        "l"
                      )} | ${padString(
                        formatNumber(order.TotalAmount) + " MAD",
                        24,
                        "l"
                      )}| ${padString("(" + order.Status, 12, "l")}) `}
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
                            // Store the title in a local variable to use later
                            const currentPdfTitle = json.title;
                            setPdfTitle(currentPdfTitle);

                            // Reset select
                            const selectElement =
                              document.getElementById("sl1");
                            selectElement.selectedIndex = 0;
                            setSelctov(null);

                            // Now fetch the text file
                            return Promise.all([
                              currentPdfTitle, // Pass the title along
                              fetch(`${apiUrl}/transfers/${selctov}/generate`),
                            ]);
                          })
                          .then(([currentPdfTitle, textResponse]) => {
                            if (!textResponse.ok) {
                              throw new Error(
                                "Erreur lors de la récupération du fichier texte"
                              );
                            }
                            return Promise.all([
                              currentPdfTitle,
                              textResponse.text(),
                            ]);
                          })
                          .then(([currentPdfTitle, textData]) => {
                            // Create a download link for the text file
                            const blob = new Blob([textData], {
                              type: "text/plain",
                            });
                            const url = URL.createObjectURL(blob);
                            const link = document.createElement("a");
                            link.href = url;
                            // alert(
                            //   `Le fichier ${currentPdfTitle} est prêt à être téléchargé`
                            // );
                            link.download = `${currentPdfTitle}.txt`;
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
                          text: "Veuillez choisir un Masse à imprimer",
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
      <Grid item xs={12} sm={3}></Grid>
      <PdfViewer base64={buffredPdf} title={pdfTitle} fileName={pdfTitle} />
    </Grid>
  );
};

export default PrintTransfer;
