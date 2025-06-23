import { useState, useEffect } from "react";

const useFetchFournisseurInternational = (apiUrl) => {
  const [fournisseurs, setFournisseurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFournisseurs = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${apiUrl}/fournisseurinternational?range=[0,2000]`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const json = await response.json();
        const transformed = json.map((f) => ({
          id: f.id,
          name: f.nom, // map `nom` to `name`
        }));
        setFournisseurs(transformed);
      } catch (error) {
        setError(error);
        console.error(
          "Erreur lors de la récupération des fournisseurs internationaux :",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFournisseurs();
  }, [apiUrl]);

  return { fournisseurs, loading, error };
};

export default useFetchFournisseurInternational;
