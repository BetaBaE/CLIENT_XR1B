import { useState, useEffect } from "react";

const useFetchChantier = (apiUrl) => {
  const [fournisseur, setFournisseur] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFournisseur = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const response = await fetch(`${apiUrl}/fourniseur?range=[0,2000]`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const json = await response.json();
        setFournisseur(json);
      } catch (error) {
        setError(error);
        console.error("Erreur lors de la récupération des chantiers :", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchFournisseur();
  }, [apiUrl]); // Dependency array includes apiUrl

  return { fournisseur, loading, error };
};

export default useFetchChantier;
