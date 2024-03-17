import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Box } from "@material-ui/core";
import "./styles.css";
import apiUrl from "../../config";

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


  const [selctov, setSelctov] = useState();


  
  const [selctovFond, setSelctovFond] = useState();

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




  const showLoadingPdf = (json) => {
    let jsonPath = "file:" + json.path.replaceAll("\\", "/");
    Swal.fire({
      title: "Pdf est prêt",
      html: `${jsonPath}`,
      icon: "success",
      allowOutsideClick: false,
      allowEscapeKey: false,
    });
  };

  return (
   
   
   <>
      <Box component="span" display="flex" justifyContent="center" m={1}>
        <form>
          <select
            className="select-css"
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

                  fetch(`${apiUrl}/oneordervirement?ordervirment={"id":"${selctov}"}`)
                    .then((response) => {
                      if (!response.ok) {
                        throw new Error("Réponse réseau non valide");
                      }
                      return response.json();
                    })
                    .then((json) => {
                      console.log(json);
                      showLoadingPdf(json);
                    })
                    .catch((error) => {
                      console.error("Erreur lors de la requête fetch :", error);
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
              Submit
            </button>
          </div>
        </form>
      </Box>
 <Box component="span" display="flex" justifyContent="center" m={1}>
        <form>
          <select
            className="select-css"
            required
            onChange={(e) => {
              setSelctovFond(e.target.value);
              console.log("e.target.value",e.target.value)
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
                console.log("selctovFond",selctovFond)
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

                  fetch(`${apiUrl}/oneordervirementFond?ordervirment={"id":"${selctovFond}"}`)
                    .then((response) => {
                      if (!response.ok) {
                        throw new Error("Réponse réseau non valide");
                      }
                      return response.json();
                    })
                    .then((json) => {
                      console.log(json);
                      showLoadingPdf(json);
                    })
                    .catch((error) => {
                      console.error("Erreur lors de la requête fetch :", error);
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
              Submit
            </button>
          </div>
        </form>
      </Box> 


    </>
  );
};

export default PrintModule;
