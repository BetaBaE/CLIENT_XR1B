import { useState, useEffect } from "react";

const useFetchChantier = (apiUrl) => {
  const [chantier, setChantier] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChantier = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const response = await fetch(`${apiUrl}/chantier?range=[0,200]`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const json = await response.json();
        setChantier(json);
      } catch (error) {
        setError(error);
        console.error("Erreur lors de la récupération des chantiers :", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchChantier();
  }, [apiUrl]); // Dependency array includes apiUrl

  return { chantier, loading, error };
};

export default useFetchChantier;
