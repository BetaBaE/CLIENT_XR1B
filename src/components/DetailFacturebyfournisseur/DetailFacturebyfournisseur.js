import React, { useEffect, useState } from "react";
import { Box } from "@material-ui/core";
import Swal from "sweetalert2";
import "./styles.css";
import apiUrl from "../../config";

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
  
    // Mettez à jour l'état pour afficher le tableau
    setAfficherTableau(true);
    // Autres traitements ou appels de fonction peuvent être ajoutés ici
  };
 
  


  return (
    <Box component="span" display="flex" justifyContent="center" m={1}>
      <form className="my-form">
        <select
          className="custom-dropdown"
          required="required"
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
          className="my-input"
          placeholder="Saisir un fournisseur"
          onChange={(e) => setSelectedFournisseur(e.target.value)}
        />

        <div className="my-button-container">
          <div>
            <button
              className="my-button"
              type="submit"
              onClick={handleClickSubmit}
            >
              Submit
            </button>
      
            {afficherTableau && (
              <table>
           
                <thead>
                  <tr>
                    <th>Fournisseur</th>
                    <th>Somme TTC</th>
                    <th>Etat des Fiches Navette</th>
                    <th>AnneeExercice</th>
                    <th>Etat de paiement </th>
                  </tr>
                </thead>
                <tbody>
  {suivieFacture.map((Factures) => (
    <tr key={Factures.id}>
       <td>{Factures.nom}</td>
      <td>{Factures.MontantTTC}</td>
      <td>{Factures.ficheNavette}</td>
      <td>{Factures.AnneeExercice}</td>
      <td>{Factures.etat}</td>
    </tr>
  ))}
</tbody>

              </table>
            )}
          </div>
        </div>
      </form>
    </Box>
  );
};

export default DetailFacturebyfournisseur;
