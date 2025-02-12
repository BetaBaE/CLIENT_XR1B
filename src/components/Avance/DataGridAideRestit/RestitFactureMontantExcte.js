import React, { useState, useEffect, useMemo, useCallback } from "react";
import "./styles.css"; // Import the CSS for styling
import apiUrl from "../../../config";
import { formatNumber, truncateString } from "../../Analyse/globalFunction";

const RestitFactureMontantExcte = () => {
  const [dataTable1, setDataTable1] = useState([]);
  const [sortConfig1, setSortConfig1] = useState({
    key: "id",
    direction: "ascending",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const response1 = await fetch(`${apiUrl}/restitfacturemontantrxcte`, {
          signal: controller.signal,
        });
        if (!response1.ok) throw new Error("Failed to fetch data");

        const result1 = await response1.json();
        setDataTable1(
          result1.map((four) => ({
            id: four.numeroFacture,
            nom: four.nom,
            numeroFacture: four.numeroFacture,
            DateFacture: four.DateFacture,
            ttc: four.ttc,
            MontantAvance: four.MontantAvance,
            EtatAvance: four.EtatAvance,
          }))
        );
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching data:", error);
          setError("An error occurred while fetching data.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    return () => controller.abort(); // Cleanup function to abort fetch
  }, []);

  // Memoized Sorting Function
  const sortedData1 = useMemo(() => {
    if (!sortConfig1) return dataTable1;

    return [...dataTable1].sort((a, b) => {
      if (a[sortConfig1.key] < b[sortConfig1.key])
        return sortConfig1.direction === "ascending" ? -1 : 1;
      if (a[sortConfig1.key] > b[sortConfig1.key])
        return sortConfig1.direction === "ascending" ? 1 : -1;
      return 0;
    });
  }, [dataTable1, sortConfig1]);

  // Memoized Sorting Request Function
  const requestSort1 = useCallback((key) => {
    setSortConfig1((prev) => ({
      key,
      direction:
        prev.key === key && prev.direction === "ascending"
          ? "descending"
          : "ascending",
    }));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="my-custom-table">
      <div className="table-container">
        <table>
          <thead>
            <tr>
              {/* {[
                "nom",
                "numeroFacture",
                "DateFacture",
                "ttc",
                "MontantAvance",
                "EtatAvance",
              ].map((header) => (
                <th key={header} onClick={() => requestSort1(header)}>
                  {header}
                </th>
              ))} */}

              <th onClick={() => requestSort1("nom")}>nom</th>
              <th onClick={() => requestSort1("numeroFacture")}>N° FA</th>
              <th onClick={() => requestSort1("DateFacture")}>Date FA</th>
              <th onClick={() => requestSort1("ttc")}>TTC</th>
              <th onClick={() => requestSort1("MontantAvance")}>Montant AV</th>
              <th onClick={() => requestSort1("EtatAvance")}>Etat Av </th>
            </tr>
          </thead>
          <tbody>
            {sortedData1.map((item) => (
              <tr key={item.id}>
                <td>{truncateString(item.nom, 20)}</td>
                <td>{item.numeroFacture}</td>
                <td>{item.DateFacture.split("T")[0]}</td>
                <td style={{ textAlign: "right" }}>{formatNumber(item.ttc)}</td>
                <td style={{ textAlign: "right" }}>
                  {formatNumber(item.MontantAvance)}
                </td>
                <td>{item.EtatAvance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RestitFactureMontantExcte;
