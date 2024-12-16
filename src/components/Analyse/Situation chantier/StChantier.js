import React, { useEffect, useState } from "react";
import { Title } from "react-admin";
import apiUrl from "../../../config";
import "./autoCompletStyleCht.css";
import ClotureChantier from "./DataGrid/ClotureChantier";
import Card from "@mui/material/Card";
import { CardContent, CardHeader, Grid } from "@material-ui/core";
import SummaryMonthChnatier from "./DataGrid/SummaryMonthChnatier";

const StChantier = () => {
  const [inputValue, setInputValue] = useState("");
  const [dataToSend, setDataToSend] = useState(null);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [currentFocus, setCurrentFocus] = useState(-1);
  const [countries, setCountries] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const handleRowClick = (id) => {
    setSelectedId(id); // Set the selected ID when a row is clicked
  };

  useEffect(() => {
    const fetchFourniseur = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/chantier?range=%5B0%2C2999%5D&sort=%5B"LIBELLE"%2C"ASC"%5D`
        );
        const data = await response.json();
        const chantierNames = data.map(
          (chantier) => `${chantier.id} | ${chantier.LIBELLE}`
        );
        setCountries(chantierNames);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchFourniseur();
  }, []);
  const handleItemClick = (country) => {
    setInputValue(country);
    setFilteredCountries([]);
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
  const handleSubmit = () => {
    if (inputValue.trim()) {
      setDataToSend(inputValue.trim());
      setSelectedId(null);
    }
  };

  return (
    <Grid container spacing={2} justifyContent="space-around">
      <Title title="Situation Chantier" />
      <Grid item xs={12} sm={12}>
        <div className="autocomplete" style={{ width: "300px" }}>
          <input
            id="myInput"
            type="text"
            name="myCountry"
            placeholder="Chantier"
            autocomplete="off"
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
                ? "Saisir le Chantier"
                : `${dataToSend.split(" | ")[1]} : Détails de Clôture`
            }
          />
          <CardContent>
            {dataToSend == null ? (
              "Saisir le Chantier"
            ) : (
              <ClotureChantier
                onRowClick={handleRowClick}
                chantier={dataToSend.split(" | ")[0]}
              />
            )}
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Card>
          {/* Détails STEP Azemmour - Trx - 2024-09 */}
          <CardHeader
            title={
              dataToSend == null || selectedId == null
                ? "Saisir le Chantier"
                : ` Détails  ${dataToSend.split(" | ")[1]} | ${selectedId}`
            }
          />
          <CardContent>
            {dataToSend == null || selectedId == null ? (
              "Saisir le Chantier"
            ) : (
              <SummaryMonthChnatier
                mois={selectedId}
                chantier={dataToSend.split(" | ")[0]}
              />
            )}
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6}></Grid>
    </Grid>
  );
};

export default StChantier;
