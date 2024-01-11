import { Box } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "./styles.css";
import apiUrl from "../../config";
import { TextInput } from "react-admin";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
const DetailFacturebyfournisseur = () => {
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

    fetch(`${apiUrl}/getAnneeSuivieFacture`)

      .then((response) => response.json())
      .then((json) => setOrderVirement(json));
  }, []);



  return (
    <Box component="span" display="flex" justifyContent="center" m={1}>
    <form className="my-form">
  
    <select
  className="custom-dropdown"
  required="required"
  onChange={(e) => {
    setSelctov(e.target.value);
  }}
>
  <option disabled="disabled" selected={true} value="">
    choisir la date de l'exercice
  </option>
  {orderVirement.map((order) => (
    <option value={order.year} key={order.year}>
      {order.year}
    </option>
  ))}
</select>

 

  <input type="text" id="nom" name="nom" className="my-input" placeholder="saisir un fournisseur" />

  <div className="my-button-container">
    <button

      className="my-button"
      type="submit"
    >
      Submit
    </button>
  </div>
</form>

    </Box>
  );
};

export default DetailFacturebyfournisseur;
