import React, { useState, useEffect } from "react";
import "../../../global/customTable.css";
import apiUrl from "../../../../config";
import { useTableThemeClass } from "../../../global/SyncThemeClass";

// SortableTable component
const DataFournisseur = ({ nom }) => {
  const tableClass = useTableThemeClass("my-custom-table-small");
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
          `${apiUrl}/datafournisseur?fournisseur=${encodeURIComponent(
            JSON.stringify({ nom })
          )}`
        );
        const result1 = await response1.json();
        const formattedData1 = result1.map((four) => ({
          id: four.ICE,
          catFournisseur: four.catFournisseur,
          exonorer: four.exonorer,
          ICE: four.ICE,
          Identifiantfiscal: four.Identifiantfiscal,
          mail: four.mail,
        }));
        setDataTable1(formattedData1);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (nom) {
      // Only fetch if id is not null
      fetchData();
    }
  }, [nom]);

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
              <th onClick={() => requestSort1("catFournisseur")}>Categorie</th>
              <th onClick={() => requestSort1("exonorer")}>Exonorer</th>
              <th onClick={() => requestSort1("ICE")}>ICE</th>
              <th onClick={() => requestSort1("Identifiantfiscal")}>
                Id fiscal
              </th>
              <th onClick={() => requestSort1("mail")}>E-mail</th>
            </tr>
          </thead>
          <tbody>
            {sortedData1.map((item) => (
              <tr key={item.id}>
                <td>{item.catFournisseur}</td>
                <td>{item.exonorer}</td>
                <td>{item.ICE}</td>
                <td>{item.Identifiantfiscal}</td>
                <td>{item.mail}</td>
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

export default DataFournisseur;
