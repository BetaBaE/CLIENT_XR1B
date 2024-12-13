import { useEffect, useState } from "react";
import "./autoCompletStyle.css";
import apiUrl from "../../../config";
import Card from "@mui/material/Card";
import { CardContent, CardHeader, Grid } from "@material-ui/core";
import { Title } from "react-admin";
import * as React from "react";
import ChartChefferDaffaire from "./ChartChefferDaffaire/Chart";
import BarsSumFA from "./ChartChefferDaffaire/BarsSumFA";
import AvanceNoRestit from "./DataGrid/restitiBtFournisseur";
import RibFournisseur from "./DataGrid/RibFournisseur";
import DataFournisseur from "./DataGrid/dataFournisseur";
import AttsFiscal from "./DataGrid/attsFiscal";

const StFournisseur = () => {
  const [inputValue, setInputValue] = useState("");
  const [dataToSend, setDataToSend] = useState(null);
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [currentFocus, setCurrentFocus] = useState(-1);

  // Fetch fournisseur data from the API
  useEffect(() => {
    const fetchFourniseur = async () => {
      try {
        const response = await fetch(`${apiUrl}/getfourfaav`);
        const data = await response.json();
        const fourniseurNames = data.map((fournisseur) => fournisseur.nom);
        setCountries(fourniseurNames);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchFourniseur();
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (!value) {
      setFilteredCountries([]);
      return;
    }

    // Use includes to filter countries based on the input value
    const filtered = countries.filter((fournisseur) =>
      fournisseur.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCountries(filtered);
    setCurrentFocus(-1);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 40) {
      setCurrentFocus((prev) =>
        Math.min(filteredCountries.length - 1, prev + 1)
      );
    } else if (e.keyCode === 38) {
      setCurrentFocus((prev) => Math.max(0, prev - 1));
    } else if (e.keyCode === 13) {
      if (currentFocus >= 0) {
        setInputValue(filteredCountries[currentFocus]);
        setFilteredCountries([]);
      }
    }
  };

  const handleItemClick = (country) => {
    setInputValue(country);
    setFilteredCountries([]);
  };

  const handleSubmit = () => {
    if (inputValue.trim()) {
      setDataToSend(inputValue.trim());
    }
  };

  return (
    <Grid container spacing={2} justifyContent="space-around">
      <Title title="Situation Fournisseur" />
      <Grid item xs={12} sm={12}>
        <div className="autocomplete" style={{ width: "300px" }}>
          <input
            id="myInput"
            type="text"
            name="myCountry"
            placeholder="Fournisseur"
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          {filteredCountries.length > 0 && (
            <div className="autocomplete-items">
              {filteredCountries.map((country, index) => {
                const matchIndex = country
                  .toLowerCase()
                  .indexOf(inputValue.toLowerCase());

                if (matchIndex === -1) {
                  return null; // If no match, return null
                }

                const beforeMatch = country.slice(0, matchIndex);
                const match = country.slice(
                  matchIndex,
                  matchIndex + inputValue.length
                );
                const afterMatch = country.slice(
                  matchIndex + inputValue.length
                );

                return (
                  <div
                    key={country}
                    className={
                      currentFocus === index ? "autocomplete-active" : ""
                    }
                    onClick={() => handleItemClick(country)}
                  >
                    {beforeMatch}
                    <strong>{match}</strong>
                    {afterMatch}
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <input onClick={handleSubmit} type="submit" value="Recherche" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Card>
          <CardHeader
            title={
              dataToSend == null
                ? "Saisir le nom du fournisseur"
                : `Informations sur les Fournisseur : ${dataToSend} `
            }
          />
          <CardContent>
            {dataToSend == null ? (
              "Saisir le nom du fournisseur"
            ) : (
              <DataFournisseur nom={dataToSend} />
            )}
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Card>
          <CardHeader
            title={
              dataToSend == null
                ? "Saisir le nom du fournisseur"
                : `Données d'Attestation Fiscale pour : ${dataToSend} `
            }
          />
          <CardContent>
            {dataToSend == null ? (
              "Saisir le nom du fournisseur"
            ) : (
              <AttsFiscal nom={dataToSend} />
            )}
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Card>
          <CardHeader
            title={
              dataToSend == null
                ? "Saisir le nom du fournisseur"
                : `Chiffre d'affaires réalisé pour : ${dataToSend} `
            }
          />
          <CardContent>
            {dataToSend == null ? (
              "Saisir le nom du fournisseur"
            ) : (
              <ChartChefferDaffaire nom={dataToSend} />
            )}
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Card>
          <CardHeader
            title={
              dataToSend == null
                ? "Saisir le nom du fournisseur"
                : `Aperçu des Paiements Pour : ${dataToSend} `
            }
          />
          <CardContent>
            {dataToSend == null ? (
              "Saisir le nom du fournisseur"
            ) : (
              <BarsSumFA nom={dataToSend} />
            )}
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Card>
          <CardHeader
            title={
              dataToSend == null
                ? "Saisir le nom du fournisseur"
                : `Avance no restituée : ${dataToSend} `
            }
          />
          <CardContent>
            {dataToSend == null ? (
              "Saisir le nom du fournisseur"
            ) : (
              <AvanceNoRestit nom={dataToSend} />
            )}
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Card>
          <CardHeader
            title={
              dataToSend == null
                ? "Saisir le nom du fournisseur"
                : `Détails du RIB pour : ${dataToSend} `
            }
          />
          <CardContent>
            {dataToSend == null ? (
              "Saisir le nom du fournisseur"
            ) : (
              <RibFournisseur nom={dataToSend} />
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default StFournisseur;
