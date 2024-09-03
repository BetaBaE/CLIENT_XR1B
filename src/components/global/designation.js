import { useState, useEffect } from "react";

const useFetchDesignation = (apiUrl) => {
  const [designation, setDesignation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDesignation = async () => {
      setLoading(true); // Set loading to true before fetching
      try {
        const response = await fetch(`${apiUrl}/designation?range=[0,1000]`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const json = await response.json();
        setDesignation(json);
      } catch (error) {
        setError(error);
        console.error(
          "Erreur lors de la récupération des designations :",
          error
        );
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchDesignation();
  }, [apiUrl]); // Dependency array includes apiUrl

  return { designation, loading, error };
};

export default useFetchDesignation;
