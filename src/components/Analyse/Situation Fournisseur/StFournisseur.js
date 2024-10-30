import React, { useState, useRef, useEffect } from "react";

const countries = [
  "Taiwan",
  "Tajikistan",
  "Tanzania",
  "Thailand",
  "Timor L'Este",
  "Togo",
  "Tonga",
  "Trinidad & Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks & Caicos",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "City",
  "Venezuela",
  "Vietnam",
  "Virgin Islands (US)",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

const StFournisseur = () => {
  const [inputValue, setInputValue] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [currentFocus, setCurrentFocus] = useState(-1);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setFilteredCountries([]);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    if (!value) {
      setFilteredCountries([]);
      return;
    }
    const filtered = countries.filter((country) =>
      country.toLowerCase().startsWith(value.toLowerCase())
    );
    setFilteredCountries(filtered);
    setCurrentFocus(-1);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 40) {
      // Down arrow
      setCurrentFocus((prev) =>
        prev < filteredCountries.length - 1 ? prev + 1 : prev
      );
    } else if (e.keyCode === 38) {
      // Up arrow
      setCurrentFocus((prev) => (prev > 0 ? prev - 1 : prev));
    } else if (e.keyCode === 13) {
      // Enter
      e.preventDefault();
      if (currentFocus > -1) {
        setInputValue(filteredCountries[currentFocus]);
        setFilteredCountries([]);
      }
    }
  };

  const handleItemClick = (country) => {
    setInputValue(country);
    setFilteredCountries([]);
  };

  return (
    <form autocomplete="off" action="/action_page.php">
      <div className="autocomplete" style={{ width: "300px" }} ref={inputRef}>
        <input
          id="myInput"
          type="text"
          name="myCountry"
          placeholder="Country"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        {filteredCountries.length > 0 && (
          <div className="autocomplete-items">
            {filteredCountries.map((country, index) => (
              <div
                key={country}
                className={`autocomplete-item ${
                  currentFocus === index ? "autocomplete-active" : ""
                }`}
                onClick={() => handleItemClick(country)}
              >
                <strong>{country.substr(0, inputValue.length)}</strong>
                {country.substr(inputValue.length)}
              </div>
            ))}
          </div>
        )}
      </div>
      <input type="submit" />
    </form>
  );
};

export default StFournisseur;
