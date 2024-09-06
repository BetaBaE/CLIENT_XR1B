import React, { useState, useEffect } from "react";
import "./styles.css"; // Import the CSS for styling
import apiUrl from "../../../../config";

// SortableTable component
const SortableTable = () => {
  const [data, setData] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: "id",
    direction: "ascending",
  });
  const [loading, setLoading] = useState(true);

  // Fetch data from JSONPlaceholder
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/sumfournisseur`);
        const result = await response.json();
        // Map the data to include only the fields we want
        const formattedData = result.map((four) => ({
          id: four.id,
          nom: four.nom,
          total: four.total,
          Echu: four.Echu,
          UnMois: four.UnMois,
          deuxMois: four.UnMois,
        }));
        setData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Sorting logic
  const sortedData = React.useMemo(() => {
    let sortableItems = [...data];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [data, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="my-custom-table">
      <table>
        <thead>
          <tr>
            <th onClick={() => requestSort("nom")}>Nom</th>
            <th onClick={() => requestSort("total")}>Total</th>
            <th onClick={() => requestSort("Echu")}>Echu</th>
            <th onClick={() => requestSort("UnMois")}>Un Mois</th>
            <th onClick={() => requestSort("deuxMois")}>Deux Mois</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item) => (
            <tr key={item.id}>
              <td>{item.nom}</td>
              <td>{item.total}</td>
              <td>{item.Echu}</td>
              <td>{item.UnMois}</td>
              <td>{item.deuxMois}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SortableTable;
