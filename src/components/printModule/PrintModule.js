import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Box } from "@mui/material";
import "./styles.css";
import apiUrl from "../../config";
import Card from "@mui/material/Card";
import { CardContent, CardHeader, Grid } from "@mui/material";
import { Title } from "react-admin";
import PDFViewer from "./PDFViewer";

const PrintModule = () => {
  const [orderVirement, setOrderVirement] = useState([
    {
      id: "null",
      ribAtner: 0,
      datecreation: "",
      etat: "",
    },
  ]);

  const [orderVirementFond, setOrderVirementFond] = useState([
    {
      id: "null",
      ribAtner: 0,
      datecreation: "",
      etat: "",
    },
  ]);
  const [chequeEncours, setOrderChequeEncours] = useState([
    {
      id: 0,
      value: "",
    },
  ]);

  const [selctov, setSelctov] = useState();
  const [selctovFond, setSelctovFond] = useState();
  const [idcheque, setIdcheque] = useState();
  const [buffredPdf, setBuffredPdf] = useState();
  const [pdfTitle, setPdfTitle] = useState("");

  useEffect(() => {
    fetch(`${apiUrl}/ordervirementetat`)
      .then((response) => response.json())
      .then((json) => setOrderVirement(json));
  }, []);

  useEffect(() => {
    fetch(`${apiUrl}/ordervirementFondetat`)
      .then((response) => response.json())
      .then((json) => setOrderVirementFond(json));
  }, []);

  useEffect(() => {
    fetch(`${apiUrl}/chequeencours`)
      .then((response) => response.json())
      .then((json) => setOrderChequeEncours(json));
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
      <Title title="Impression des Documents" />
      <Grid item xs={12} sm={4}>
        <Card>
          <CardHeader title="Imprimer : Order Virement" />
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
                    choisir un order de virement
                  </option>
                  {orderVirement.map((order, index) => (
                    <option key={index} value={order.id}>
                      {order.id} - {order.etat}
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
                          title: "Preparation du pdf en cours",
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

                        fetch(
                          `${apiUrl}/oneordervirement?ordervirment={"id":"${selctov}"}`
                        )
                          .then((response) => {
                            if (!response.ok) {
                              throw new Error("Réponse réseau non valide");
                            }
                            return response.json();
                          })
                          .then((json) => {
                            // console.log(json);
                            showLoadingPdf(json);
                            console.log(json);
                            setBuffredPdf(json.base64);
                            setPdfTitle(json.header[0].id);
                            let selectElement = document.getElementById("sl1");
                            selectElement.selectedIndex = 0;
                            setSelctov(null);
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
                          text: "Veuillez choisir un order de virement",
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

      <Grid item xs={12} sm={4}>
        <Card>
          <CardHeader title="Imprimer : Order Virement Fond" />
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
                  id="sl2"
                  required
                  onChange={(e) => {
                    setSelctovFond(e.target.value);
                    console.log("e.target.value", e.target.value);
                  }}
                >
                  <option disabled selected value="">
                    choisir un order de virement de fond
                  </option>
                  {orderVirementFond.map((order, index) => (
                    <option key={index} value={order.id}>
                      {order.id} - {order.etat}
                    </option>
                  ))}
                </select>
                <div className="button-container">
                  <button
                    className="button-6"
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      // console.log("selctovFond", selctovFond);
                      if (selctovFond) {
                        Swal.fire({
                          title: "Preparation du pdf en cours",
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

                        fetch(
                          `${apiUrl}/oneordervirementFond?ordervirment={"id":"${selctovFond}"}`
                        )
                          .then((response) => {
                            if (!response.ok) {
                              throw new Error("Réponse réseau non valide");
                            }
                            return response.json();
                          })
                          .then((json) => {
                            console.log(json);
                            showLoadingPdf(json);
                            setBuffredPdf(json.base64);
                            setPdfTitle(json.header[0].id);
                            let selectElement = document.getElementById("sl2");
                            selectElement.selectedIndex = 0;
                            setSelctovFond(null);
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
                          text: "Veuillez choisir un order de virement",
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

      <Grid item xs={12} sm={4}>
        <Card>
          <CardHeader title="Imprimer : Cheque ou Effet" />
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
                  id="sl3"
                  required
                  onChange={(e) => {
                    setIdcheque(e.target.value);
                    console.log("e.target.value", e.target.value);
                  }}
                >
                  <option disabled selected value="">
                    choisir un chaque or effet
                  </option>
                  {chequeEncours.map((chaque, index) => (
                    <option key={index} value={chaque.id}>
                      {chaque.value}
                    </option>
                  ))}
                </select>
                <div className="button-container">
                  <button
                    className="button-6"
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      console.log("idcheque", idcheque);
                      if (idcheque) {
                        Swal.fire({
                          title: "Preparation du pdf en cours",
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

                        fetch(
                          `${apiUrl}/chequeprint?idcheque={"id":"${idcheque}"}`
                        )
                          .then((response) => {
                            if (!response.ok) {
                              throw new Error("Réponse réseau non valide");
                            }
                            return response.json();
                          })
                          .then((json) => {
                            console.log(json);
                            showLoadingPdf(json);
                            setBuffredPdf(json.base64);
                            setPdfTitle(
                              `${json.header[0].type} : ${json.header[0].numerocheque} - ${json.header[0].bank}`
                            );
                            let selectElement = document.getElementById("sl3");
                            selectElement.selectedIndex = 0;
                            setIdcheque(null);
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
                          text: "Veuillez choisir un cheque ou effet",
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
      <PDFViewer base64={buffredPdf} title={pdfTitle} />
    </Grid>
  );
};

export default PrintModule;
