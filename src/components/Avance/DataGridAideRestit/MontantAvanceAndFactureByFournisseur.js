import React, { useState, useEffect } from "react";
import "./styles.css"; // Import the CSS for styling
// import { formatNumber } from "../../globalFunction";
import apiUrl from "../../../config";
import { formatNumber, truncateString } from "../../Analyse/globalFunction";

// SortableTable component
const MontantAvanceAndFactureByFournisseur = () => {
  const [dataTable1, setDataTable1] = useState([]);

  const [sortConfig1, setSortConfig1] = useState({
    key: "id",
    direction: "ascending",
  });

  const [loading, setLoading] = useState(true);

  // Fetch data from two different endpoints
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await fetch(
          `${apiUrl}/montantavanceandfacturebyfournisseur`
        );
        const result1 = await response1.json();
        const formattedData1 = result1.map((four) => ({
          id: four.nom,
          nom: four.nom,
          TotalTTCFactureDisponible: four.TotalTTCFactureDisponible,
          MontantTotalNonRestitue: four.MontantTotalNonRestitue,
        }));
        setDataTable1(formattedData1);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Sorting logic for table 1
  const sortedData1 = React.useMemo(() => {
    let sortableItems = [...dataTable1];
    if (sortConfig1 !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig1.key] < b[sortConfig1.key]) {
          return sortConfig1.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig1.key] > b[sortConfig1.key]) {
          return sortConfig1.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [dataTable1, sortConfig1]);

  // Sorting logic for table 2

  const requestSort1 = (key) => {
    let direction = "ascending";
    if (
      sortConfig1 &&
      sortConfig1.key === key &&
      sortConfig1.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig1({ key, direction });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="my-custom-table">
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th onClick={() => requestSort1("nom")}>nom</th>
              <th onClick={() => requestSort1("TotalTTCFactureDisponible")}>
                TTC Facture
              </th>
              <th onClick={() => requestSort1("MontantTotalNonRestitue")}>
                Tot A Restituer
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData1.map((item) => (
              <tr key={item.id}>
                <td>{truncateString(item.nom, 20)}</td>

                <td style={{ textAlign: "right" }}>
                  {formatNumber(item.TotalTTCFactureDisponible)}
                </td>
                <td style={{ textAlign: "right" }}>
                  {formatNumber(item.MontantTotalNonRestitue)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MontantAvanceAndFactureByFournisseur;
