import { Box } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
const PrintModule = () => {
  const [orderVirement, setOrderVirement] = useState([
    {
      id: "null",
      ribAtner: 0,
      datecreation: "",
      etat: "",
    },
  ]);
  const [selctov, setSelctov] = useState();
  // const MySwal = withReactContent(Swal);
  useEffect(() => {
    fetch("http://10.111.1.95:8080/ordervirementetat")
      .then((response) => response.json())
      .then((json) => setOrderVirement(json));
  }, []);

  const showLoadingPdf = (json) => {
    Swal.fire({
      title: "Pdf est prêt",
      html: `Path: <a href=${json.path}" target="\\_blank">${json.path}</a>`,
      icon: "success",
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then(function () {
      window.open(json.path, "_blank");
    });
  };

  return (
    <Box component="span" display="flex" justifyContent="center" m={1}>
      <form>
        <select
          required="required"
          onChange={(e) => {
            console.log(e.target.value);
            setSelctov(e.target.value);
          }}
        >
          <option disabled="disabled" selected={true} value="">
            choix order de virement{" "}
          </option>
          {orderVirement.map((order) => {
            return (
              <option value={order.id}>
                {order.id} - {order.etat}
              </option>
            );
          })}
        </select>
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();

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
              /* Read more about handling dismissals below */
              if (result.dismiss === Swal.DismissReason.timer) {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Quelque chose s'est mal passé!",
                  allowOutsideClick: false,
                  allowEscapeKey: false,
                  // footer: '<a href="">Why do I have this issue?</a>',
                });
              }
            });

            console.log(selctov);
            fetch(
              `http://10.111.1.95:8080/oneordervirement?ordervirment={"id":"${selctov}"}`
            )
              .then((response) => response.json())
              .then((json) => {
                console.log(json);
                showLoadingPdf(json);
              });
          }}
        >
          Submit
        </button>
      </form>
    </Box>
  );
};

export default PrintModule;
