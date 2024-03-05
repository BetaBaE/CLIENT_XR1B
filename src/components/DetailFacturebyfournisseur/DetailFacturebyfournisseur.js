import React, { useEffect, useState } from "react";
import { Box } from "@material-ui/core";
import Swal from "sweetalert2";

import apiUrl from "../../config";

const styles = {
  myForm: {
    display: "flex",
    flexDirection: "column",
    width: "400px",
    margin: "auto"
  },
  customDropdown: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    fontSize: "14px",
    cursor: "pointer"
  },
  myInput: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "5px"
  },
  myButton: {
    backgroundColor: "#3498db",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    cursor: "pointer",
    borderRadius: "5px",
    fontSize: "16px"
  },
  myButtonHover: {
    backgroundColor: "#2980b9"
  },
  "#customers": {
    fontFamily: "Arial, Helvetica, sans-serif",
    borderCollapse: "collapse",
    width: "100%",
    height:"100%",
    paddingTop:"10%"
  },
  "#customers td, #customers th": {
    border: "1px solid #ddd",
    padding: "20px",
  },
  "#customers tr:nth-child(even)": {
    backgroundColor: "#f2f2f2",
  },
  "#customers tr:hover": {
    backgroundColor: "#ddd",
  },
  "#customers th": {
    paddingTop: "12px",
    paddingBottom: "12px",
    textAlign: "left",
    backgroundColor: "#04AA6D",
    color: "white",
  },
};

const DetailFacturebyfournisseur = () => {
  const [afficherTableau, setAfficherTableau] = useState(false);
  const [Annee, setAnnee] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedFournisseur, setSelectedFournisseur] = useState('');
  const [suivieFacture, setSuivieFacture] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}/getAnneeSuivieFacture`)
      .then((response) => response.json())
      .then((json) => setAnnee(json));
  }, []);

  const getSuivieFactureByFournisseurExercie = (nom, annee) => {
    let url = `${apiUrl}/SuivieFactureByFournisseurExercice/` + nom + '/' + annee;
    console.log(url);
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setSuivieFacture(json);
      })
      .catch((error) => {
        console.error("Error fetching sumfacture:", error);
      });
  };

  const handleClickSubmit = async (e) => {
    getSuivieFactureByFournisseurExercie(selectedFournisseur, selectedYear);
    e.preventDefault();

    if (!selectedYear || !selectedFournisseur) {
      await Swal.fire({
        title: 'Veuillez remplir tous les champs!',
        icon: 'error',
      });
      return;
    }

    setAfficherTableau(true);
  };

  return (
    <Box >
      <form style={styles.myForm}>
        <select
          className="custom-dropdown"
          required="required"
          style={styles.customDropdown}
          onChange={(e) => {
            setSelectedYear(e.target.value);
          }}
        >
          <option disabled={true} selected={true} value="">
            Choisir la date de l'exercice
          </option>
          {Annee.map((Annees) => (
            <option value={Annees.year} key={Annees.year}>
              {Annees.year}
            </option>
          ))}
        </select>
        <input
          type="text"
          id="nom"
          name="nom"
          style={styles.myInput}
          placeholder="Saisir un fournisseur"
          onChange={(e) => setSelectedFournisseur(e.target.value)}
        />

        <div>
          <div>
            <button
              className="my-button"
              type="submit"
              style={styles.myButton}
              onClick={handleClickSubmit}
            >
              Submit
            </button>

          </div>
        </div>
      </form>
              <br/>           <br/>           <br/>
      {afficherTableau && (
              <table style={styles["#customers"]}>
                <thead>
                  <tr>
                  <th style={styles["#customers th"]}>fournisseur</th>
                    <th style={styles["#customers th"]}>Montant Factures</th>
                    <th style={styles["#customers th"]}>Montant Reglements</th>
                    <th style={styles["#customers th"]}>Reste</th>
                  
                  </tr>
                </thead>
                <tbody>
                  {suivieFacture.map((Factures, index) => (
                    <tr key={index} style={(index % 2 === 0) ? styles["#customers tr:nth-child(even)"] : {}}>
                         <td style={styles["#customers td"]}>{Factures.nom}</td>
                      <td style={styles["#customers td"]}>{Factures.sumFacture}</td>
                      <td style={styles["#customers td"]}>{Factures.sumReglement}</td>
                      <td style={styles["#customers td"]}>{Factures.Reste}</td>
             
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

    </Box>
  );
};

export default DetailFacturebyfournisseur;
