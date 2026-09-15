import React, { useState, useEffect } from "react";
import "../../../global/customTable.css";
import apiUrl from "../../../../config";
import { formatNumber } from "../../globalFunction";
import { useTableThemeClass } from "../../../global/SyncThemeClass";

const PaiementByMonth = ({ nom, onRowClick }) => {
  const tableClass = useTableThemeClass("my-custom-table");
  const [dataTable1, setDataTable1] = useState([]);
  const [sortConfig1, setSortConfig1] = useState({
    key: "Mois",
    direction: "descending",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const fournisseur = encodeURIComponent(JSON.stringify({ nom }));
        const response = await fetch(
          `${apiUrl}/paiementbymonthfournisseur?fournisseur=${fournisseur}`
        );
        const result = await response.json();
        setDataTable1(
          result.map((row) => ({
            id: row.id || row.Mois,
            Mois: row.Mois,
            MontantPaiement: row["Montant Paiement"],
          }))
        );
      } catch (error) {
        console.error("Error fetching paiement by month:", error);
      } finally {
        setLoading(false);
      }
    };

    if (nom) {
      fetchData();
    }
  }, [nom]);

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

  return dataTable1.length > 0 ? (
    <div className={tableClass}>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th onClick={() => requestSort1("Mois")}>Mois</th>
              <th onClick={() => requestSort1("MontantPaiement")}>
                Montant Paiement
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData1.map((item) => (
              <tr
                key={item.id}
                onClick={() => onRowClick(item.Mois)}
                style={{ cursor: "pointer" }}
              >
                <td>{item.Mois}</td>
                <td className="my-custom-right-align">
                  {formatNumber(item.MontantPaiement)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <div>Aucune Données disponible</div>
  );
};

export default PaiementByMonth;
