import React, { useEffect, useState } from "react";
import { Box } from "@material-ui/core";
import Swal from "sweetalert2";

import apiUrl from "../../config";

// Styles pour les éléments du formulaire et le tableau
const styles = {
  myForm: {
    display: "flex",
    flexDirection: "column",
    width: "400px",
    margin: "auto",
  },
  customDropdown: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    fontSize: "14px",
    cursor: "pointer",
  },
  myInput: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "5px",
  },
  myButton: {
    backgroundColor: "#3498db",
    color: "#fff",
    border: "none",
    padding: "10px 20px",
    cursor: "pointer",
    borderRadius: "5px",
    fontSize: "16px",
  },
  myButtonHover: {
    backgroundColor: "#2980b9",
  },
  customers: {
    fontFamily: "Arial, Helvetica, sans-serif",
    borderCollapse: "collapse",
    width: "100%",
    paddingTop: "10%",
  },
  customersTdTh: {
    border: "1px solid #ddd",
    padding: "20px",
  },
  customersTrEven: {
    backgroundColor: "#f2f2f2",
  },
  customersTrHover: {
    backgroundColor: "#ddd",
  },
  customersTh: {
    paddingTop: "12px",
    paddingBottom: "12px",
    textAlign: "left",
    backgroundColor: "#04AA6D",
    color: "white",
  },
};

const SuivieFactureExerciceList = () => {
  const [afficherTableau, setAfficherTableau] = useState(false); // Etat pour afficher ou cacher le tableau
  const [Annee, setAnnee] = useState([]); // Etat pour stocker les années disponibles
  const [selectedYear, setSelectedYear] = useState(""); // Etat pour l'année sélectionnée
  const [selectedFournisseur, setSelectedFournisseur] = useState(""); // Etat pour le fournisseur sélectionné
  const [suivieFacture, setSuivieFacture] = useState([]); // Etat pour stocker les données des factures suivies

  // Récupérer les années disponibles lors du montage du composant
  useEffect(() => {
    fetch(`${apiUrl}/getAnneeSuivieFacture`)
      .then((response) => response.json())
      .then((json) => setAnnee(json));
  }, []);

  // Fonction pour récupérer les données de suivi des factures par fournisseur et exercice
  const getSuivieFactureByFournisseurExercie = (nom, annee) => {
    const url = `${apiUrl}/SuivieFactureByFournisseurExercice/${nom}/${annee}`;
    fetch(url)
      .then((response) => response.json())
      .then((json) => setSuivieFacture(json))
      .catch((error) => {
        console.error("Error fetching sumfacture:", error);
      });
  };

  // Fonction pour gérer la soumission du formulaire
  const handleClickSubmit = async (e) => {
    e.preventDefault(); // Empêcher le comportement par défaut du formulaire
    if (!selectedYear || !selectedFournisseur) {
      await Swal.fire({
        title: "Veuillez remplir tous les champs!",
        icon: "error",
      });
      return;
    }
    getSuivieFactureByFournisseurExercie(selectedFournisseur, selectedYear);
    setAfficherTableau(true); // Afficher le tableau après la soumission
  };

  return (
    <Box>
      <form style={styles.myForm} onSubmit={handleClickSubmit}>
        <select
          required
          style={styles.customDropdown}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option disabled selected value="">
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
        <button type="submit" style={styles.myButton}>
          Submit
        </button>
      </form>
      <br />
      <br />
      <br />
      {afficherTableau && (
        <table style={styles.customers}>
          <thead>
            <tr>
              <th style={styles.customersTh}>Fournisseur</th>
              <th style={styles.customersTh}>Montant Factures</th>
              <th style={styles.customersTh}>Montant Réglements</th>
              <th style={styles.customersTh}>Reste</th>
            </tr>
          </thead>
          <tbody>
            {suivieFacture.map((Factures, index) => (
              <tr
                key={index}
                style={index % 2 === 0 ? styles.customersTrEven : {}}
              >
                <td style={styles.customersTdTh}>{Factures.nom}</td>
                <td style={styles.customersTdTh}>{Factures.sumFacture}</td>
                <td style={styles.customersTdTh}>{Factures.sumReglement}</td>
                <td style={styles.customersTdTh}>{Factures.Reste}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Box>
  );
};

export default SuivieFactureExerciceList;
